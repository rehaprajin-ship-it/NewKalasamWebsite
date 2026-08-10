import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/firestore';
import { BLOG_POSTS } from '@/data/blog-posts';
import { seedProducts } from '@/data/products';
import { SITE_URL } from '@/lib/constants';

/* ═══════════════════════════════════════════════════════════════
   Dynamic Sitemap — Products, Blogs, Static Pages
   Pulls real lastModified from CMS timestamps when available.
   ═══════════════════════════════════════════════════════════════ */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  /* ── Safe date parser — returns `now` for invalid dates ──── */
  function safeDate(value: any): Date {
    if (!value) return now;
    const d = new Date(value);
    return isNaN(d.getTime()) ? now : d;
  }

  /* ── 1. Static pages with SEO-tuned priorities ────────────── */
  const staticPages: { route: string; priority: number; changeFreq: 'daily' | 'weekly' | 'monthly' }[] = [
    // Core pages — highest priority
    { route: '', priority: 1.0, changeFreq: 'daily' },
    { route: '/about', priority: 0.8, changeFreq: 'monthly' },
    { route: '/products', priority: 0.9, changeFreq: 'weekly' },
    { route: '/contact', priority: 0.8, changeFreq: 'monthly' },

    // Product category pages — high priority (money pages)
    { route: '/industrial-chemicals', priority: 0.9, changeFreq: 'weekly' },
    { route: '/pooja-products', priority: 0.9, changeFreq: 'weekly' },

    // Business / commercial-intent pages
    { route: '/export', priority: 0.85, changeFreq: 'monthly' },
    { route: '/manufacturing', priority: 0.8, changeFreq: 'monthly' },
    { route: '/oem-manufacturing', priority: 0.85, changeFreq: 'monthly' },
    { route: '/private-label', priority: 0.85, changeFreq: 'monthly' },
    { route: '/wholesale', priority: 0.85, changeFreq: 'monthly' },
    { route: '/distributors', priority: 0.85, changeFreq: 'monthly' },
    { route: '/retail-supply', priority: 0.85, changeFreq: 'monthly' },
    { route: '/super-stockist', priority: 0.85, changeFreq: 'monthly' },
    { route: '/temple-supply', priority: 0.85, changeFreq: 'monthly' },
    { route: '/industries-we-serve', priority: 0.8, changeFreq: 'monthly' },

    // Trust / authority pages
    { route: '/quality-control', priority: 0.7, changeFreq: 'monthly' },
    { route: '/infrastructure', priority: 0.7, changeFreq: 'monthly' },
    { route: '/research-development', priority: 0.7, changeFreq: 'monthly' },
    { route: '/certificates', priority: 0.7, changeFreq: 'monthly' },
    { route: '/gallery', priority: 0.6, changeFreq: 'monthly' },

    // Resource pages
    { route: '/blog', priority: 0.8, changeFreq: 'daily' },
    { route: '/faq', priority: 0.7, changeFreq: 'monthly' },
    { route: '/inquiry', priority: 0.7, changeFreq: 'monthly' },
    { route: '/downloads', priority: 0.6, changeFreq: 'monthly' },
    { route: '/msds-library', priority: 0.6, changeFreq: 'monthly' },
    { route: '/coa-library', priority: 0.6, changeFreq: 'monthly' },
    { route: '/careers', priority: 0.5, changeFreq: 'monthly' },

    // Legal pages — low priority
    { route: '/privacy-policy', priority: 0.3, changeFreq: 'monthly' },
    { route: '/terms-conditions', priority: 0.3, changeFreq: 'monthly' },
    { route: '/shipping-policy', priority: 0.3, changeFreq: 'monthly' },
    { route: '/refund-policy', priority: 0.3, changeFreq: 'monthly' },
    { route: '/disclaimer', priority: 0.3, changeFreq: 'monthly' },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPages.map(({ route, priority, changeFreq }) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: changeFreq,
    priority,
  }));

  /* ── 2. Dynamic product pages from Firestore (with CMS lastmod) ── */
  let productsList: any[] = [];
  try {
    productsList = await getProducts();
  } catch (e) {
    // Firestore unavailable — fall through to seed
  }

  if (!productsList || productsList.length === 0) {
    productsList = seedProducts as any[];
  }

  const productRoutes: MetadataRoute.Sitemap = productsList.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: safeDate(p.updatedAt || p.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  /* ── 3. Dynamic blog posts ───────────────────────────────── */
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: safeDate((post as any).modifiedDate || post.publishDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  /* ── 4. Blog category pages ──────────────────────────────── */
  const categories = [...new Set(BLOG_POSTS.map((p) => (p as any).category).filter(Boolean))];
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/blog/category/${encodeURIComponent(String(cat).toLowerCase().replace(/\s+/g, '-'))}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  /* ── 5. Clean product category pages ────────────────────── */
  const productCategories = ['camphor', 'agarbathi', 'sambrani', 'lamp-oil', 'rose-water', 'industrial-chemicals', 'pooja-products'];
  const productCategoryRoutes: MetadataRoute.Sitemap = productCategories.map((cat) => ({
    url: `${SITE_URL}/products/category/${cat}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...blogRoutes,
    ...categoryRoutes,
    ...productCategoryRoutes,
  ];
}
