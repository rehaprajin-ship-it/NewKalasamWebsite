/* ═══════════════════════════════════════════════════════════════
   Kalasam Jaikrishna Industries — Core Type Definitions
   ═══════════════════════════════════════════════════════════════ */

// ── Product Types ──────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subcategory?: string;
  description: string;
  shortDescription: string;
  images: string[];
  thumbnail?: string;
  specifications: ProductSpecification[];
  applications: string[];
  benefits: string[];
  packaging: PackagingInfo[];
  storage?: string;
  shelfLife?: string;
  casNumber?: string;
  molecularFormula?: string;
  molecularWeight?: string;
  purity?: string;
  appearance?: string;
  odor?: string;
  meltingPoint?: string;
  boilingPoint?: string;
  density?: string;
  solubility?: string;
  downloads: ProductDownload[];
  faq: FAQItem[];
  price?: string;
  mrp?: string;
  sizes?: string[];
  featured?: boolean;
  bestseller?: boolean;
  exportAvailable?: boolean;
  oemAvailable?: boolean;
  privateLabelAvailable?: boolean;
  status: 'active' | 'draft' | 'archived';
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type ProductCategory =
  | 'Industrial Chemicals'
  | 'Camphor'
  | 'Sambrani'
  | 'Agarbathi'
  | 'Lamp Oil'
  | 'Rose Water'
  | 'Temple Products'
  | 'Pooja Accessories';

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface PackagingInfo {
  size: string;
  unit: string;
  moq?: string;
  description?: string;
}

export interface ProductDownload {
  type: 'MSDS' | 'COA' | 'TDS' | 'Brochure' | 'Catalog';
  label: string;
  url: string;
  fileSize?: string;
}

// ── Blog Types ─────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: BlogCategory;
  tags: string[];
  author: Author;
  readTime: string;
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  status: 'published' | 'draft';
}

export type BlogCategory =
  | 'Industry'
  | 'Traditions'
  | 'Guide'
  | 'Wellness'
  | 'Manufacturing'
  | 'Export'
  | 'News';

export interface Author {
  name: string;
  avatar?: string;
  designation?: string;
}

// ── Company Types ──────────────────────────────────────────────

export interface CompanyStat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  designation: string;
  content: string;
  avatar?: string;
  rating?: number;
  location?: string;
}

export interface TeamMember {
  name: string;
  designation: string;
  image?: string;
  bio?: string;
}

export interface Certificate {
  name: string;
  issuedBy: string;
  image: string;
  validUntil?: string;
  description?: string;
}

// ── Industry & Export Types ─────────────────────────────────────

export interface Industry {
  name: string;
  icon: string;
  description: string;
  products: string[];
  image?: string;
}

export interface ExportCountry {
  name: string;
  code: string;
  continent: string;
  flag?: string;
  coordinates?: [number, number];
}

// ── Form Types ─────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  department?: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  productInterest: string;
  quantity?: string;
  message: string;
  inquiryType: 'general' | 'export' | 'oem' | 'private-label' | 'wholesale';
}

export interface DistributorFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  gstNumber?: string;
  city: string;
  state: string;
  territory: string;
  experience: string;
  currentBusiness: string;
  investmentCapacity: string;
  message?: string;
}

export interface CareerFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  resumeUrl?: string;
  coverLetter?: string;
}

// ── FAQ Types ──────────────────────────────────────────────────

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  name: string;
  items: FAQItem[];
}

// ── Gallery Types ──────────────────────────────────────────────

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  caption?: string;
  order?: number;
}

export type GalleryCategory =
  | 'Factory'
  | 'Products'
  | 'Packaging'
  | 'Exports'
  | 'Laboratory'
  | 'Warehouse'
  | 'Office'
  | 'Events';

// ── Navigation Types ───────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  children?: NavGroup[];
  featured?: boolean;
}

export interface NavGroup {
  title: string;
  items: NavLink[];
  image?: string;
}

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  badge?: string;
}

// ── SEO Types ──────────────────────────────────────────────────

export interface PageSEO {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}

// ── Admin Types ────────────────────────────────────────────────

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'user';
  lastLogin?: string;
}

export interface PopupConfig {
  id: string;
  title: string;
  message: string;
  type: 'newsletter' | 'offer' | 'announcement' | 'inquiry';
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  enabled: boolean;
  delay: number;
  showOnce?: boolean;
  pages?: string[];
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
  source?: string;
}
