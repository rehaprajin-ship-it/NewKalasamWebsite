'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '@/components/ui/PageHero';
import { seedProducts } from '@/data/products';
import { COMPANY } from '@/lib/constants';
import { getProducts } from '@/lib/firestore';
import { useInquiry } from '@/context/InquiryContext';

const CATEGORIES = ['All', 'Industrial Chemicals', 'Pooja Products'];
const MATERIAL_TYPES = ['All', 'Powder', 'Liquid', 'Flakes', 'Round Tablets', 'Tablet-shaped'];

export default function ProductsPage({ categoryFilter }: { categoryFilter?: string }) {
  const searchParams = useSearchParams();
  const { addItem } = useInquiry();
  const [products, setProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeMaterial, setActiveMaterial] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data.length > 0 ? data : seedProducts);
      })
      .catch(() => setProducts(seedProducts));
  }, []);

  // Sync search query from URL (e.g. from navbar search)
  useEffect(() => {
    const q = searchParams.get('search');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Filters & Sorting logic
  const filteredAndSorted = useMemo(() => {
    let result = products.filter((p) => {
      // Subcategory check from clean routes
      if (categoryFilter) {
        const cat = categoryFilter.toLowerCase();
        if (cat === 'industrial-chemicals') {
          return p.category === 'Industrial Chemicals';
        }
        if (cat === 'pooja-products') {
          return p.category === 'Pooja Products';
        }
        if (cat === 'camphor') {
          return p.name?.toLowerCase().includes('camphor') || p.slug?.toLowerCase().includes('camphor') || p.name?.toLowerCase().includes('karpooram');
        }
        if (cat === 'agarbathi') {
          return p.name?.toLowerCase().includes('agarbathi') || p.name?.toLowerCase().includes('incense');
        }
        if (cat === 'sambrani') {
          return p.name?.toLowerCase().includes('sambrani');
        }
        if (cat === 'lamp-oil') {
          return p.name?.toLowerCase().includes('lamp oil') || p.name?.toLowerCase().includes('deepam') || p.slug?.toLowerCase().includes('oil');
        }
        if (cat === 'rose-water') {
          return p.name?.toLowerCase().includes('rose water') || p.slug?.toLowerCase().includes('rose-water');
        }
      }

      const matchCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.variants?.some((v: any) => v.sku?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.sku?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchMaterial =
        activeMaterial === 'All' ||
        p.appearance?.toLowerCase().includes(activeMaterial.toLowerCase()) ||
        p.variants?.some((v: any) => v.materialType?.toLowerCase().includes(activeMaterial.toLowerCase()));

      return matchCategory && matchSearch && matchMaterial;
    });

    // Apply Sorting
    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'newest') {
      // Assuming higher ID or sortOrder means newer/different order
      result.sort((a, b) => (b.order || 0) - (a.order || 0));
    } else {
      // Default: sortOrder
      result.sort((a, b) => (a.order || 0) - (b.order || 0));
    }

    return result;
  }, [products, activeCategory, activeMaterial, searchQuery, sortBy]);

  const handleQuickAdd = (product: any) => {
    // If product has variants, add the first variant
    if (product.variants && product.variants.length > 0) {
      const firstVariant = product.variants[0];
      const attrVal = Object.values(firstVariant.attributes)[0] as string;
      addItem({
        id: `${product.slug}-${firstVariant.sku}`,
        productId: product.id || product.slug,
        productName: product.name,
        variantId: firstVariant.id,
        variantName: attrVal,
        sku: firstVariant.sku,
        packingType: firstVariant.packingType,
        materialType: firstVariant.materialType,
        image: product.images?.[0]
      });
    } else {
      // No variants, add main product info
      addItem({
        id: product.slug,
        productId: product.id || product.slug,
        productName: product.name,
        sku: product.sku || product.id || 'N/A',
        packingType: product.packaging?.[0]?.size ? `${product.packaging[0].size} ${product.packaging[0].unit}` : 'Custom',
        materialType: product.appearance || 'Standard',
        image: product.images?.[0]
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <PageHero
        title="B2B Product Catalog"
        overline="Our Products"
        description="Explore our complete catalog of industrial chemicals, premium camphor, isoborneol flakes, and organic intermediates."
        backgroundImage="/images/hero/factory-campus.png"
      />

      <div className="container-custom py-10">
        {/* Search and Sort controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="relative w-full md:w-96">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product name or SKU..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-950 placeholder-gray-400 focus:outline-hidden focus:border-primary transition-all shadow-xs"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-700 text-gray-700 flex items-center gap-2 cursor-pointer"
            >
              <span>⚙️</span> Filters
            </button>

            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500 font-500 whitespace-nowrap">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-700 text-gray-700 focus:outline-hidden"
              >
                <option value="default">Default Order</option>
                <option value="name">Name (A-Z)</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar - Desktop only */}
          <aside className="hidden lg:block space-y-6">
            {/* Category Filter */}
            <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-800 text-gray-900 uppercase tracking-wider">Categories</h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-700 transition-colors cursor-pointer ${
                      activeCategory === cat ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Type Filter */}
            <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-800 text-gray-900 uppercase tracking-wider">Material Form</h3>
              <div className="space-y-1">
                {MATERIAL_TYPES.map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setActiveMaterial(mat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-700 transition-colors cursor-pointer ${
                      activeMaterial === mat ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            {/* B2B Trust Info Card */}
            <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-800 uppercase tracking-wider text-green-200">B2B Trade Center</h4>
              <p className="text-[11px] leading-relaxed text-white/80">
                Jaikrishna Industries is a certified exporter supporting commercial buyers with customized packing, OEM/Private labeling, and certified logistics.
              </p>
              <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-green-200 space-y-1">
                <p>✓ ISO 9001:2015 Registered</p>
                <p>✓ Export consignments welcome</p>
                <p>✓ Strict quality lab analysis</p>
              </div>
            </div>
          </aside>

          {/* Product Cards Grid */}
          <div className="lg:col-span-3 space-y-6">
            <p className="text-xs text-gray-500 font-500">
              Showing {filteredAndSorted.length} matching products
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filteredAndSorted.map((product) => {
                  const hasVariants = product.variants && product.variants.length > 0;
                  const variantsCount = product.variants?.length || 0;
                  // Deduplicate attributes for variant display count
                  const variantAttrKey = hasVariants ? Object.keys(product.variants[0].attributes)[0] : '';
                  const attrLabel = variantAttrKey === 'shape' ? 'shapes' : 'pack sizes';
                  
                  return (
                    <motion.div
                      key={product.id || product.slug}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-primary/50 transition-all duration-300 relative"
                    >
                      {/* Product Thumbnail Box */}
                      <Link href={`/products/${product.slug}`} className="block relative w-full aspect-square bg-gray-50 flex items-center justify-center p-6 border-b border-gray-100">
                        <img
                          src={product.images?.[0] || '/images/products/synthetic-camphor.png'}
                          alt={product.name}
                          className="object-contain max-h-[140px] w-auto transition-transform duration-300 group-hover:scale-105"
                        />
                        {hasVariants && (
                          <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 bg-[#DCF8C6]/80 text-gray-900 border border-[#DCF8C6] rounded-md text-[9px] font-800">
                            {variantsCount} {attrLabel} available
                          </span>
                        )}
                      </Link>

                      {/* Info & CTA Actions */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1">
                          <span className="text-[9px] font-800 uppercase tracking-wider text-gray-400 block">
                            {product.category}
                          </span>
                          <Link href={`/products/${product.slug}`}>
                            <h3 className="font-800 text-sm text-gray-900 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-[11px] text-gray-500 line-clamp-1">
                            {product.shortDescription || 'Refined industrial & pooja camphor products.'}
                          </p>
                        </div>

                        <div className="pt-2 flex items-center gap-2 border-t border-gray-50">
                          {/* Details CTA */}
                          <Link
                            href={`/products/${product.slug}`}
                            className="flex-1 py-1.5 bg-gray-50 border border-gray-200 text-center hover:bg-gray-100 text-gray-700 text-[11px] font-700 rounded-lg transition-colors"
                          >
                            Details
                          </Link>

                          {/* Quick Add To Inquiry List Drawer Button */}
                          <button
                            onClick={() => handleQuickAdd(product)}
                            className="p-1.5 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-lg transition-colors cursor-pointer"
                            aria-label="Add to inquiry basket"
                            title="Add to Inquiry List"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {filteredAndSorted.length === 0 && (
              <div className="text-center py-20 bg-white border border-gray-200 rounded-2xl">
                <p className="text-gray-400 text-base">No products match your selected criteria.</p>
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setActiveMaterial('All');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-primary text-white text-xs font-700 rounded-lg cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer Slideout */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-55 max-h-[80vh] overflow-y-auto p-5 space-y-5 border-t border-gray-200"
            >
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <h3 className="font-800 text-gray-900 text-sm">Filter Products</h3>
                <button onClick={() => setShowMobileFilters(false)} className="text-gray-400 font-700 text-xs cursor-pointer">Done</button>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-800 text-gray-400 uppercase tracking-wider">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-700 border transition-all ${
                        activeCategory === cat ? 'bg-primary text-white border-primary' : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-800 text-gray-400 uppercase tracking-wider">Material Form</h4>
                <div className="flex flex-wrap gap-2">
                  {MATERIAL_TYPES.map((mat) => (
                    <button
                      key={mat}
                      onClick={() => setActiveMaterial(mat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-700 border transition-all ${
                        activeMaterial === mat ? 'bg-primary text-white border-primary' : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
