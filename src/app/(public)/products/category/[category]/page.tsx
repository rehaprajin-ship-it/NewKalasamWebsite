import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE_URL, PRODUCT_CATEGORIES } from '@/lib/constants';
import { getProducts } from '@/lib/firestore';
import { seedProducts } from '@/data/products';
import PageHero from '@/components/ui/PageHero';
import { BreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import SectionHeader from '@/components/ui/SectionHeader';
import CategoryClient from '@/components/common/CategoryClient';

export const dynamic = 'force-static';
export const revalidate = 60; // Revalidate every 60 seconds

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((c) => ({
    category: c.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = PRODUCT_CATEGORIES.find((c) => c.slug === category);

  if (!cat) {
    return {
      title: 'Category Not Found | Kalasam',
      description: 'The requested product category does not exist.',
    };
  }

  const canonicalUrl = `${SITE_URL}/products/category/${cat.slug}`;

  return {
    title: cat.metaTitle,
    description: cat.metaDescription,
    keywords: cat.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: cat.metaTitle,
      description: cat.metaDescription,
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: cat.metaTitle,
      description: cat.metaDescription,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const currentCat = PRODUCT_CATEGORIES.find((c) => c.slug === category);

  if (!currentCat) {
    notFound();
  }

  // Load products
  let allProducts: any[] = [];
  try {
    allProducts = await getProducts();
  } catch (e) {}

  if (!allProducts || allProducts.length === 0) {
    allProducts = seedProducts as any[];
  }

  // Filter products by matching category name
  const categoryProducts = allProducts
    .filter((p) => p.category === currentCat.name && p.status !== 'archived')
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Products', url: `${SITE_URL}/products` },
    { name: currentCat.name, url: `${SITE_URL}/products/category/${currentCat.slug}` },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <BreadcrumbSchema items={breadcrumbs} />

      <PageHero
        title={currentCat.name}
        overline="Product Category"
        description={currentCat.description}
        backgroundImage="/images/hero/factory-campus.png"
      />

      <div className="container-custom py-12">
        {/* Category Description / SEO Rich Content */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-8 shadow-xs mb-10 max-w-4xl">
          <SectionHeader
            overline="About This Category"
            title={`${currentCat.name} Catalog & Specifications`}
          />
          <p className="text-sm text-gray-600 leading-relaxed mt-4">
            {currentCat.description} Kalasam Jaikrishna Industries manufactures and supplies all products to strict ISO 9001:2015 quality standards with complete batch traceability, COA/MSDS documentation, and direct factory-to-business logistics across India and 17+ international export markets.
          </p>
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            <span className="text-xs font-700 text-gray-500 uppercase tracking-wider mr-2">Quick Navigation:</span>
            {PRODUCT_CATEGORIES.map((c) => (
              <a
                key={c.slug}
                href={`/products/category/${c.slug}`}
                className={`text-xs px-3 py-1 rounded-full font-600 transition-colors ${
                  c.slug === currentCat.slug
                    ? 'bg-primary text-white font-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {c.name}
              </a>
            ))}
          </div>
        </div>

        {/* Dynamic Category Client Products Grid */}
        <CategoryClient
          initialProducts={categoryProducts}
          categoryName={currentCat.name}
          categorySlug={currentCat.slug}
        />
      </div>
    </div>
  );
}
