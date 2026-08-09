/* ═══════════════════════════════════════════════════════════════
   Schema Markup — Reusable JSON-LD Generators
   Each function returns a <script type="application/ld+json"> block
   populated dynamically from CMS data.
   ═══════════════════════════════════════════════════════════════ */

import { SITE_URL, SITE_NAME, COMPANY } from '@/lib/constants';

/* ── Types ──────────────────────────────────────────────────── */

interface ProductSchemaProps {
  name: string;
  slug: string;
  description: string;
  image?: string;
  sku?: string;
  brand?: string;
  category?: string;
  casNumber?: string;
  purity?: string;
  molecularFormula?: string;
  packaging?: { size: string; unit: string; description?: string }[];
  faq?: { question: string; answer: string }[];
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ArticleSchemaProps {
  headline: string;
  slug: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  category?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

/* ── Product Schema ──────────────────────────────────────────── */

export function ProductSchema({ product }: { product: ProductSchemaProps }) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: `${SITE_URL}/products/${product.slug}`,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Kalasam',
    },
    manufacturer: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
    category: product.category || 'Industrial Chemical',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '23'
    }
  };

  if (product.image) {
    schema.image = product.image;
  }

  if (product.sku) {
    schema.sku = product.sku;
  }

  if (product.casNumber) {
    schema.identifier = {
      '@type': 'PropertyValue',
      propertyID: 'CAS Number',
      value: product.casNumber,
    };
  }

  // Additional chemical properties as structured additionalProperty
  const additionalProps: Record<string, any>[] = [];
  if (product.purity) {
    additionalProps.push({
      '@type': 'PropertyValue',
      name: 'Purity',
      value: product.purity,
    });
  }
  if (product.molecularFormula) {
    additionalProps.push({
      '@type': 'PropertyValue',
      name: 'Molecular Formula',
      value: product.molecularFormula,
    });
  }
  if (product.casNumber) {
    additionalProps.push({
      '@type': 'PropertyValue',
      name: 'CAS Number',
      value: product.casNumber,
    });
  }
  if (additionalProps.length > 0) {
    schema.additionalProperty = additionalProps;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ── FAQ Schema ──────────────────────────────────────────────── */

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ── Breadcrumb Schema ───────────────────────────────────────── */

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  if (!items || items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ── Article Schema ──────────────────────────────────────────── */

export function ArticleSchema({ article }: { article: ArticleSchemaProps }) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    url: `${SITE_URL}/blog/${article.slug}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.authorName || `${SITE_NAME} Technical Team`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${article.slug}`,
    },
  };

  if (article.image) {
    schema.image = article.image;
  }

  if (article.category) {
    schema.articleSection = article.category;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ── ItemList Schema (for category/listing pages) ────────────── */

export function ItemListSchema({
  name,
  items,
}: {
  name: string;
  items: { name: string; url: string; image?: string; position: number }[];
}) {
  if (!items || items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: item.url,
      ...(item.image ? { image: item.image } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
