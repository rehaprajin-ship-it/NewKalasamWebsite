import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/firestore';
import { seedProducts } from '@/data/products';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import ProductClientPage from '@/components/common/ProductClientPage';
import { ProductSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup';

type PageProps = {
  params: Promise<{ slug: string }>;
};

/* ── Helper: build ≤60-char title with key attribute ───────── */
function buildTitle(name: string, purity?: string): string {
  const base = purity
    ? `${name} ${purity} | Kalasam`
    : `${name} | Kalasam`;

  // Trim to ≤60 chars if needed
  if (base.length <= 60) return base;

  // Fallback: shorter pattern
  const short = `${name} | Kalasam`;
  if (short.length <= 60) return short;

  return name.substring(0, 56) + '...';
}

/* ── Helper: build 120-160 char meta description ───────────── */
function buildDescription(product: any): string {
  const name = product.name || product.title || '';
  const purity = product.purity || '';
  const cas = product.casNumber ? `CAS ${product.casNumber}` : '';
  const category = product.category || 'Industrial Chemical';

  // Build segments
  const parts = [
    `${name}${purity ? ` (${purity} purity)` : ''}`,
    cas,
    `manufactured by ${SITE_NAME}, Theni, Tamil Nadu`,
    'ISO 9001:2015 certified',
    'Export-ready to 17+ countries',
    `Buy ${category.toLowerCase()} in bulk`,
  ].filter(Boolean);

  let desc = parts.join('. ') + '.';

  // Enforce 120-160 char range
  if (desc.length > 160) {
    desc = desc.substring(0, 157) + '...';
  }

  return desc;
}

// Generate dynamic B2B SEO metadata with regional keyword mappings
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Try loading from Firestore first
  let product: any = null;
  try {
    product = await getProductBySlug(slug);
  } catch (e) {}

  // Fallback to static seed data
  if (!product) {
    product = seedProducts.find((p) => p.slug === slug);
  }

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested chemical product specifications sheet is unavailable.',
    };
  }

  const productName = product.name || product.title || '';
  const customTitle = product.seo?.metaTitle || buildTitle(productName, product.purity);
  const customDesc = product.seo?.metaDescription || buildDescription(product);

  const canonicalUrl = `${SITE_URL}/products/${slug}`;
  const ogImage = product.images?.[0] || `${SITE_URL}/opengraph-image.png`;

  return {
    title: customTitle,
    description: customDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: customTitle,
      description: customDesc,
      url: canonicalUrl,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${productName} — ${SITE_NAME}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: customTitle,
      description: customDesc,
      images: [ogImage],
    },
  };
}

/* ── Static params for pre-rendering ──────────────────────── */
export async function generateStaticParams() {
  let products: any[] = [];
  try {
    products = await getProducts();
  } catch (e) {}

  if (!products || products.length === 0) {
    products = seedProducts as any[];
  }

  return products
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Try loading from Firestore first
  let product: any = null;
  try {
    product = await getProductBySlug(slug);
  } catch (e) {}

  // Fallback to static seed data
  if (!product) {
    product = seedProducts.find((p) => p.slug === slug);
  }

  if (!product) {
    notFound();
  }

  let allProducts: any[] = [];
  try {
    allProducts = await getProducts();
  } catch (e) {}

  if (!allProducts || allProducts.length === 0) {
    allProducts = seedProducts as any[];
  }

  const serializedProduct = JSON.parse(JSON.stringify(product));
  const serializedAllProducts = JSON.parse(JSON.stringify(allProducts));

  // Build breadcrumb items
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Products', url: `${SITE_URL}/products` },
    { name: product.name || product.title || slug, url: `${SITE_URL}/products/${slug}` },
  ];

  return (
    <>
      {/* Structured Data — Product schema */}
      <ProductSchema
        product={{
          name: product.name || product.title || '',
          slug,
          description: product.shortDescription || product.description || '',
          image: product.images?.[0],
          sku: product.sku || product.id,
          brand: 'Kalasam',
          category: product.category,
          casNumber: product.casNumber,
          purity: product.purity,
          molecularFormula: product.molecularFormula,
          packaging: product.packaging,
          faq: product.faq,
        }}
      />

      {/* Structured Data — FAQ schema (if product has FAQ) */}
      {product.faq && product.faq.length > 0 && (
        <FAQSchema faqs={product.faq} />
      )}

      {/* Structured Data — Breadcrumb schema */}
      <BreadcrumbSchema items={breadcrumbItems} />

      <ProductClientPage initialProduct={serializedProduct} allProducts={serializedAllProducts} slug={slug} />
    </>
  );
}
