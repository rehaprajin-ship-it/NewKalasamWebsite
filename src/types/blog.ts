/* ═══════════════════════════════════════════════════════════════
   Blog Types — TypeScript definitions for the blog system
   ═══════════════════════════════════════════════════════════════ */

export type SearchIntent = 'informational' | 'commercial' | 'transactional' | 'navigational';
export type SchemaType = 'Article' | 'HowTo' | 'FAQPage' | 'Guide';
export type SectionType = 'h2' | 'h3' | 'h4' | 'p' | 'ul' | 'ol' | 'table' | 'callout' | 'code';

export interface TableRow {
  cells: string[];
}

export interface ContentTable {
  headers: string[];
  rows: TableRow[];
}

export interface ContentSection {
  type: SectionType;
  text?: string;
  items?: string[];
  table?: ContentTable;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface InternalLink {
  text: string;
  href: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  tags: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  lsiKeywords: string[];
  searchIntent: SearchIntent;
  readTime: string;
  wordCount: number;
  publishDate: string;
  modifiedDate: string;
  author: string;
  excerpt: string;
  sections: ContentSection[];
  faqs: FAQ[];
  relatedSlugs: string[];
  internalLinks: InternalLink[];
  schemaType: SchemaType;
  featuredImageAlt: string;
  featuredImagePrompt: string;
  featuredImage?: string;
  canonicalUrl?: string;
}

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  color: string;
  icon: string;
  count?: number;
}
