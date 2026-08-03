import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/firestore';
import { seedProducts } from '@/data/products';
import ProductClientPage from '@/components/common/ProductClientPage';

type PageProps = {
  params: Promise<{ slug: string }>;
};

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
      title: 'Product Not Found | Kalasam Jaikrishna Industries',
      description: 'The requested chemical product specifications sheet is unavailable.'
    };
  }

  const productName = product.name || (product as any).title || '';
  const category = product.category || 'Industrial Chemical';
  const customTitle = product.seo?.metaTitle || `${productName} Manufacturer, Exporter & Bulk Supplier | Kalasam Industries`;
  const customDesc = product.seo?.metaDescription || `High purity ${productName} (CAS ${product.casNumber || 'N/A'}) manufactured by Kalasam Jaikrishna Industries in Theni, Tamil Nadu. Premium grade chemical supply to Chennai, Madurai, Coimbatore, Mumbai, Gujarat, Delhi, and all districts & states across India.`;
  const customKeywords = product.seo?.keywords || `${productName}, buy ${productName}, ${productName} manufacturer India, ${productName} supplier Tamil Nadu, ${productName} bulk distributor, camphor manufacturing Theni, chemical supply districts India`;

  return {
    title: customTitle,
    description: customDesc,
    keywords: customKeywords,
    alternates: {
      canonical: `https://www.kalasam.com/products/${slug}`
    }
  };
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

  const serializedProduct = JSON.parse(JSON.stringify(product));

  return <ProductClientPage initialProduct={serializedProduct} slug={slug} />;
}
