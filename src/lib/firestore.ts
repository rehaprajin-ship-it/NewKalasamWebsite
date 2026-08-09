/* ═══════════════════════════════════════════════════════════════
   Firestore Data Access Layer
   Uses lazy Firebase initialization to avoid SSR errors
   ═══════════════════════════════════════════════════════════════ */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  setDoc,
  type DocumentData,
  type QueryConstraint,
} from 'firebase/firestore';
import { getFirebaseDb } from './firebase';
import type { Product, BlogPost, PopupConfig, NewsletterSubscriber } from '@/types';

// ── Collections ────────────────────────────────────────────────

const COLLECTIONS = {
  products: 'products',
  blogs: 'blogs',
  contacts: 'contacts',
  newsletter: 'newsletter',
  distributors: 'distributors',
  exports: 'exports',
  gallery: 'gallery',
  popups: 'popups',
  seo: 'seo',
  users: 'users',
  settings: 'settings',
} as const;

// ── Generic Helpers ────────────────────────────────────────────

/** Convert Firestore Timestamp objects ({seconds, nanoseconds}) to ISO strings recursively */
function sanitizeFirestoreData(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  // Firestore Timestamp: has seconds & nanoseconds and a toDate method
  if (typeof obj === 'object' && 'seconds' in obj && 'nanoseconds' in obj && typeof obj.toDate === 'function') {
    return obj.toDate().toISOString();
  }
  // Plain {seconds, nanoseconds} without toDate (already serialized once)
  if (typeof obj === 'object' && 'seconds' in obj && 'nanoseconds' in obj && Object.keys(obj).length === 2) {
    return new Date(obj.seconds * 1000).toISOString();
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeFirestoreData);
  }
  if (typeof obj === 'object' && obj.constructor === Object) {
    const result: any = {};
    for (const key of Object.keys(obj)) {
      result[key] = sanitizeFirestoreData(obj[key]);
    }
    return result;
  }
  return obj;
}

async function getCollectionData<T>(
  collectionName: string,
  ...constraints: QueryConstraint[]
): Promise<T[]> {
  const db = getFirebaseDb();
  const ref = collection(db, collectionName);
  const q = constraints.length > 0 ? query(ref, ...constraints) : ref;
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => sanitizeFirestoreData({
    id: d.id,
    ...d.data(),
  })) as T[];
}

async function getDocument<T>(
  collectionName: string,
  docId: string
): Promise<T | null> {
  const db = getFirebaseDb();
  const ref = doc(db, collectionName, docId);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return sanitizeFirestoreData({ id: snapshot.id, ...snapshot.data() }) as T;
}

async function addDocument(
  collectionName: string,
  data: DocumentData
): Promise<string> {
  const db = getFirebaseDb();
  const ref = collection(db, collectionName);
  const docRef = await addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

async function updateDocument(
  collectionName: string,
  docId: string,
  data: DocumentData
): Promise<void> {
  const db = getFirebaseDb();
  const ref = doc(db, collectionName, docId);
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

async function deleteDocument(
  collectionName: string,
  docId: string
): Promise<void> {
  const db = getFirebaseDb();
  const ref = doc(db, collectionName, docId);
  await deleteDoc(ref);
}

// ── Products ───────────────────────────────────────────────────

export async function getProducts(
  category?: string,
  featuredOnly?: boolean
): Promise<Product[]> {
  const constraints: QueryConstraint[] = [];
  if (category) constraints.push(where('category', '==', category));
  if (featuredOnly) constraints.push(where('featured', '==', true));
  constraints.push(orderBy('sortOrder', 'asc'));
  constraints.push(orderBy('name', 'asc'));

  try {
    return await getCollectionData<Product>(COLLECTIONS.products, ...constraints);
  } catch (err) {
    // Graceful fallback for missing indexes or unmigrated products
    const fallbackConstraints: QueryConstraint[] = [];
    if (category) fallbackConstraints.push(where('category', '==', category));
    if (featuredOnly) fallbackConstraints.push(where('featured', '==', true));
    
    const raw = await getCollectionData<Product>(COLLECTIONS.products, ...fallbackConstraints);
    return raw.sort((a, b) => {
      const sA = a.sortOrder !== undefined ? a.sortOrder : (a.order !== undefined ? a.order : 9999);
      const sB = b.sortOrder !== undefined ? b.sortOrder : (b.order !== undefined ? b.order : 9999);
      if (sA !== sB) return sA - sB;
      return (a.name || '').localeCompare(b.name || '');
    });
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getCollectionData<Product>(
    COLLECTIONS.products,
    where('slug', '==', slug),
    limit(1)
  );
  return products[0] || null;
}

export async function getAllProductSlugs(): Promise<string[]> {
  const products = await getCollectionData<Product>(COLLECTIONS.products);
  return products.map((p) => p.slug);
}

export async function saveProduct(
  product: Partial<Product>,
  id?: string
): Promise<string> {
  if (id) {
    await updateDocument(COLLECTIONS.products, id, product);
    return id;
  }

  // Sensible default for new products: (max sortOrder in category) + 10
  if (product.sortOrder === undefined && product.category) {
    try {
      const categoryProducts = await getProducts(product.category);
      const maxSortOrder = categoryProducts.reduce(
        (max, p) => (p.sortOrder !== undefined && p.sortOrder > max ? p.sortOrder : max),
        0
      );
      product.sortOrder = maxSortOrder + 10;
    } catch (e) {
      product.sortOrder = 10;
    }
  }

  return addDocument(COLLECTIONS.products, product);
}

export async function removeProduct(id: string): Promise<void> {
  return deleteDocument(COLLECTIONS.products, id);
}

// ── Blog Posts ──────────────────────────────────────────────────

export async function getBlogPosts(
  category?: string,
  featuredOnly?: boolean
): Promise<BlogPost[]> {
  const constraints: QueryConstraint[] = [
    where('status', '==', 'published'),
  ];
  if (category) constraints.push(where('category', '==', category));
  if (featuredOnly) constraints.push(where('featured', '==', true));
  constraints.push(orderBy('publishedAt', 'desc'));
  return getCollectionData<BlogPost>(COLLECTIONS.blogs, ...constraints);
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getCollectionData<BlogPost>(
    COLLECTIONS.blogs,
    where('slug', '==', slug),
    limit(1)
  );
  return posts[0] || null;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getCollectionData<BlogPost>(COLLECTIONS.blogs);
  return posts.map((p) => p.slug);
}

export async function saveBlogPost(
  post: Partial<BlogPost>,
  id?: string
): Promise<string> {
  if (id) {
    await updateDocument(COLLECTIONS.blogs, id, post);
    return id;
  }
  return addDocument(COLLECTIONS.blogs, post);
}

export async function removeBlogPost(id: string): Promise<void> {
  return deleteDocument(COLLECTIONS.blogs, id);
}

// ── Contacts ───────────────────────────────────────────────────

export async function saveContact(data: DocumentData): Promise<string> {
  return addDocument(COLLECTIONS.contacts, data);
}

export async function getContacts(): Promise<DocumentData[]> {
  return getCollectionData(COLLECTIONS.contacts, orderBy('createdAt', 'desc'));
}

export async function removeContact(id: string): Promise<void> {
  return deleteDocument(COLLECTIONS.contacts, id);
}

// ── Newsletter ─────────────────────────────────────────────────

export async function subscribeNewsletter(
  email: string,
  source?: string
): Promise<string> {
  const db = getFirebaseDb();
  await setDoc(doc(db, COLLECTIONS.newsletter, email), {
    email,
    source: source || 'website',
    subscribedAt: serverTimestamp(),
  });
  return email;
}

export async function getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  return getCollectionData<NewsletterSubscriber>(
    COLLECTIONS.newsletter,
    orderBy('subscribedAt', 'desc')
  );
}

// ── Distributors ───────────────────────────────────────────────

export async function saveDistributorApplication(
  data: DocumentData
): Promise<string> {
  return addDocument(COLLECTIONS.distributors, data);
}

export async function getDistributorApplications(): Promise<DocumentData[]> {
  return getCollectionData(COLLECTIONS.distributors, orderBy('createdAt', 'desc'));
}

export async function removeDistributorApplication(id: string): Promise<void> {
  return deleteDocument(COLLECTIONS.distributors, id);
}

// ── Export Inquiries ───────────────────────────────────────────

export async function saveExportInquiry(
  data: DocumentData
): Promise<string> {
  return addDocument(COLLECTIONS.exports, data);
}

export async function getExportInquiries(): Promise<DocumentData[]> {
  return getCollectionData(COLLECTIONS.exports, orderBy('createdAt', 'desc'));
}

export async function removeExportInquiry(id: string): Promise<void> {
  return deleteDocument(COLLECTIONS.exports, id);
}

// ── Gallery ────────────────────────────────────────────────────

export async function getGalleryImages(
  category?: string
): Promise<DocumentData[]> {
  const constraints: QueryConstraint[] = [];
  if (category) constraints.push(where('category', '==', category));
  constraints.push(orderBy('order', 'asc'));
  return getCollectionData(COLLECTIONS.gallery, ...constraints);
}

export async function saveGalleryImage(
  data: DocumentData,
  id?: string
): Promise<string> {
  if (id) {
    await updateDocument(COLLECTIONS.gallery, id, data);
    return id;
  }
  return addDocument(COLLECTIONS.gallery, data);
}

export async function removeGalleryImage(id: string): Promise<void> {
  return deleteDocument(COLLECTIONS.gallery, id);
}

// ── Popups ─────────────────────────────────────────────────────

export async function getActivePopup(): Promise<PopupConfig | null> {
  const popups = await getCollectionData<PopupConfig>(
    COLLECTIONS.popups,
    where('enabled', '==', true),
    limit(1)
  );
  return popups[0] || null;
}

export async function savePopup(
  data: Partial<PopupConfig>,
  id?: string
): Promise<string> {
  if (id) {
    await updateDocument(COLLECTIONS.popups, id, data);
    return id;
  }
  return addDocument(COLLECTIONS.popups, data);
}

// ── SEO ────────────────────────────────────────────────────────

export async function getSEOData(pageSlug: string): Promise<DocumentData | null> {
  return getDocument(COLLECTIONS.seo, pageSlug);
}

export async function saveSEOData(
  pageSlug: string,
  data: DocumentData
): Promise<void> {
  const db = getFirebaseDb();
  await setDoc(doc(db, COLLECTIONS.seo, pageSlug), {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

// ── Users ──────────────────────────────────────────────────────

export async function saveUser(
  uid: string,
  data: DocumentData
): Promise<void> {
  const db = getFirebaseDb();
  await setDoc(doc(db, COLLECTIONS.users, uid), {
    ...data,
    lastLogin: serverTimestamp(),
  }, { merge: true });
}

export { COLLECTIONS };
