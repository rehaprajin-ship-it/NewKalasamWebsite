'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/firestore';

interface CategoryClientProps {
  initialProducts: any[];
  categoryName: string;
  categorySlug: string;
}

export default function CategoryClient({
  initialProducts,
  categoryName,
  categorySlug,
}: CategoryClientProps) {
  const [products, setProducts] = useState<any[]>(initialProducts);

  // Sync with Firestore in real-time on client side so admin image updates show immediately
  useEffect(() => {
    getProducts()
      .then((data) => {
        if (data && data.length > 0) {
          const filtered = data
            .filter((p) => p.category === categoryName && p.status !== 'archived')
            .sort((a, b) => (a.order || 0) - (b.order || 0));
          setProducts(filtered);
        }
      })
      .catch((err) => console.error('Failed to client-sync category products:', err));
  }, [categoryName]);

  return (
    <div>
      {products.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-800 text-gray-900">
              Available Products ({products.length})
            </h2>
            <Link href="/products" className="text-xs font-700 text-primary hover:underline">
              View All Categories →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
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
            New {categoryName} Products Coming Soon
          </h3>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed max-w-md mx-auto">
            Our {categoryName.toLowerCase()} production line is currently being prepared for catalog publication. If you require bulk trade or wholesale pricing for this line, please get in touch with our team.
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
  );
}
