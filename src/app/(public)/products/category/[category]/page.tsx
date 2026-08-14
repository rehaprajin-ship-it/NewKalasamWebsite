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
              <Link
                key={c.slug}
                href={`/products/category/${c.slug}`}
                className={`text-xs px-3 py-1 rounded-full font-600 transition-colors ${
                  c.slug === currentCat.slug
                    ? 'bg-primary text-white font-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {categoryProducts.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-800 text-gray-900">
                Available Products ({categoryProducts.length})
              </h2>
              <Link href="/products" className="text-xs font-700 text-primary hover:underline">
                View All Categories →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map((product) => {
                const hasVariants = product.variants && product.variants.length > 0;
                const variantsCount = product.variants?.length || 0;

                return (
                  <Link
                    key={product.id || product.slug}
                    href={`/products/${product.slug}`}
                    className="bg-white rounded-2xl border border-gray-200/80 hover:border-primary/40 hover:shadow-medium transition-all group flex flex-col justify-between overflow-hidden"
                  >
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="relative aspect-4/3 bg-gray-50 rounded-xl overflow-hidden mb-4 p-4 flex items-center justify-center border border-gray-100 group-hover:scale-[1.02] transition-transform">
                        <img
                          src={product.images?.[0] || '/images/products/lamp-oil-placeholder.png'}
                          alt={product.name}
                          className="object-contain w-full h-full max-h-40"
                        />
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-800 uppercase px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                          {product.category}
                        </span>
                        {hasVariants && variantsCount > 1 && (
                          <span className="text-[10px] font-700 text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                            {variantsCount} Options
                          </span>
                        )}
                      </div>

                      <h3 className="font-800 text-gray-900 group-hover:text-primary transition-colors text-sm leading-snug">
                        {product.name}
                      </h3>

                      <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                        {product.shortDescription || product.description}
                      </p>
                    </div>

                    <div className="px-5 py-3.5 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="font-700 text-primary">View Specifications</span>
                      <span className="text-primary font-bold group-hover:translate-x-0.5 transition-transform">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-2xl mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-primary text-3xl flex items-center justify-center mx-auto mb-4">
              🌸
            </div>
            <h3 className="text-lg font-800 text-gray-900">
              New {currentCat.name} Products Coming Soon
            </h3>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed max-w-md mx-auto">
              Our {currentCat.name.toLowerCase()} production line is currently being prepared for catalog publication. If you require bulk trade or wholesale pricing for this line, please get in touch with our team.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn btn-primary btn-sm">
                Request Trade Information
              </Link>
              <Link href="/products" className="btn btn-sm bg-gray-100 hover:bg-gray-200 text-gray-700">
                Browse All Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
