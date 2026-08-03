'use client';

/* ═══════════════════════════════════════════════════════════════
   Products Page — Green-Bordered Card Grid (Reference Design)
   WhatsApp + Email icons, product image, name below card
   ═══════════════════════════════════════════════════════════════ */

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { seedProducts } from '@/data/products';

const categories = ['All', 'Industrial Chemicals', 'Camphor', 'Sambrani', 'Agarbathi', 'Lamp Oil', 'Rose Water', 'Temple Products'];

const whatsappNumber = '919876543210';

/* ── WhatsApp Icon ────────────────────────────────────────────── */
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ── Email Icon ───────────────────────────────────────────────── */
function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13L2 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ITEMS_PER_PAGE = 20;

import { getProducts } from '@/lib/firestore';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data.length > 0 ? data : seedProducts);
      })
      .catch(() => setProducts(seedProducts));
  }, []);

  // Sync search query from URL (from navbar search)
  useEffect(() => {
    const q = searchParams.get('search');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = !searchQuery || p.name?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-primary-dark py-20 lg:py-28">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1920 400">
            <pattern id="prodGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#prodGrid)" />
          </svg>
        </div>
        <div className="container-custom relative z-10 text-center">
          <span className="overline text-accent-light">Product Range</span>
          <h1 className="heading-display text-white text-4xl sm:text-5xl lg:text-6xl mt-4">Our Products</h1>
          <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
            From pharmaceutical-grade synthetic camphor to sacred pooja products — discover our complete portfolio.
          </p>
          <div className="accent-line accent-line-center mt-6" />
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-10">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-500 transition-all ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-primary/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-500 mb-6">
            Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)} of{' '}
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' && ` in ${activeCategory}`}
          </p>

          {/* Product Cards Grid — Green-Bordered Design */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {paginatedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col"
                >
                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -6, boxShadow: '0 12px 32px rgba(37, 211, 102, 0.15)' }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative bg-white rounded-2xl border-2 border-primary/30 overflow-hidden
                               transition-colors duration-300 group-hover:border-primary/60"
                  >
                    {/* Top Action Icons */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between z-10">
                      <a
                        href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in ${product.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp enquiry for ${product.name}`}
                        className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center
                                   shadow-md hover:bg-primary-light hover:scale-110 transition-all duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <WhatsAppIcon />
                      </a>
                      <a
                        href={`mailto:info@kalasam.com?subject=Enquiry about ${product.name}`}
                        aria-label={`Email enquiry for ${product.name}`}
                        className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center
                                   shadow-md hover:bg-primary-light hover:scale-110 transition-all duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <EmailIcon />
                      </a>
                    </div>

                    {/* Product Image */}
                    <Link href={`/products/${product.slug}`} className="block">
                      <div className="relative w-full aspect-square p-6 pt-14 flex items-center justify-center bg-white">
                        {product.images && product.images.length > 0 ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name || ''}
                            fill
                            className="object-contain p-6 pt-12 group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                              </svg>
                            </div>
                            <span className="text-xs text-primary/60 font-500">{product.category}</span>
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>

                  {/* Product Name — Below Card */}
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="mt-4 text-center text-sm sm:text-base font-semibold text-gray-800
                                   group-hover:text-primary transition-colors duration-300 leading-tight">
                      {product.name}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No products found.</p>
              <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className="mt-4 btn btn-outline btn-sm">
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </section>
    </div>
  );
}

/* ── Pagination Component ─────────────────────────────────────── */

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  // Build page numbers: 1..10, ..., lastTwo
  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= 12) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [];

    // Always show first 10 pages
    const firstBatch = Math.min(10, totalPages);
    for (let i = 1; i <= firstBatch; i++) {
      pages.push(i);
    }

    // If current page is beyond 10 and before the last 2, show it
    if (currentPage > 10 && currentPage <= totalPages - 2) {
      pages.push('...');
      pages.push(currentPage);
    }

    // Ellipsis before last 2
    if (totalPages > 12) {
      pages.push('...');
    }

    // Last 2 pages
    pages.push(totalPages - 1);
    pages.push(totalPages);

    // Remove duplicates
    const unique: (number | '...')[] = [];
    for (const p of pages) {
      if (p === '...') {
        if (unique[unique.length - 1] !== '...') unique.push(p);
      } else if (!unique.includes(p)) {
        unique.push(p);
      }
    }
    return unique;
  };

  const pages = getPageNumbers();

  return (
    <nav className="mt-12 flex items-center justify-center" aria-label="Pagination">
      <ul className="flex items-center gap-1.5">
        {/* Previous */}
        <li>
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className={`w-10 h-10 flex items-center justify-center rounded border text-sm font-600 transition-all duration-200
              ${currentPage === 1
                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                : 'border-gray-300 text-gray-600 hover:border-primary hover:text-primary'
              }`}
          >
            ‹
          </button>
        </li>

        {/* Page Numbers */}
        {pages.map((page, idx) =>
          page === '...' ? (
            <li key={`dots-${idx}`}>
              <span className="w-10 h-10 flex items-center justify-center text-sm text-gray-400 select-none">
                ...
              </span>
            </li>
          ) : (
            <li key={page}>
              <button
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
                className={`w-10 h-10 flex items-center justify-center rounded border text-sm font-600 transition-all duration-200
                  ${currentPage === page
                    ? 'bg-primary border-primary text-white shadow-md'
                    : 'border-gray-300 text-gray-700 hover:border-primary hover:text-primary bg-white'
                  }`}
              >
                {page}
              </button>
            </li>
          )
        )}

        {/* Next */}
        <li>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className={`w-10 h-10 flex items-center justify-center rounded border text-sm font-600 transition-all duration-200
              ${currentPage === totalPages
                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                : 'border-gray-300 text-gray-600 hover:border-primary hover:text-primary'
              }`}
          >
            ›
          </button>
        </li>
      </ul>
    </nav>
  );
}
