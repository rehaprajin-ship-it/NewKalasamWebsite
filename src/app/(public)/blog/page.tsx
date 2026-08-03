/* ═══════════════════════════════════════════════════════════════
   Blog Page — Revamped Article Listing with Search, Categories & Pagination
   ═══════════════════════════════════════════════════════════════ */

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { BLOG_POSTS } from '@/data/blog-posts';
import { BLOG_CATEGORIES, getCategoryImage } from '@/data/blog-categories';
import BlogFilters from '@/components/ui/BlogFilters';
import ShareButton from '@/components/ui/ShareButton';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';

export const metadata: Metadata = {
  title: 'Insights & Technical Blog — Kalasam Jaikrishna Industries',
  description: 'Technical articles, manufacturing guides, export market trends, and spiritual insights about camphor, isoborneol, and pooja products.',
};

type SearchParams = Promise<{
  page?: string;
  category?: string;
  search?: string;
}>;

interface PageProps {
  searchParams: SearchParams;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const activeCategory = params.category || '';
  const searchQuery = params.search || '';

  const POSTS_PER_PAGE = 9;

  // Filter posts
  let filteredPosts = BLOG_POSTS;
  if (activeCategory) {
    filteredPosts = filteredPosts.filter(
      (post) => post.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query))
    );
  }

  // Pagination calculations
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const offset = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(offset, offset + POSTS_PER_PAGE);

  // Featured Post (first post on page 1 when no filter is active)
  const featuredPost =
    currentPage === 1 && !activeCategory && !searchQuery ? BLOG_POSTS[0] : null;
  const regularPosts = featuredPost
    ? paginatedPosts.filter((p) => p.slug !== featuredPost.slug)
    : paginatedPosts;

  return (
    <div>
      {/* Hero Banner with Background Image overlay */}
      <section className="relative bg-primary-dark py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-25" style={{ backgroundImage: "url('/images/hero/factory-campus.png')" }} />
        <div className="container-custom relative z-10 text-center">
          <span className="overline text-accent-light tracking-widest text-xs uppercase font-600">Enterprise Resource & Insights</span>
          <h1 className="heading-display text-white text-4xl sm:text-5xl lg:text-6xl mt-4 font-700">Knowledge Hub</h1>
          <p className="mt-4 text-white/70 text-lg max-w-2xl mx-auto">
            Deep dive into technical reports, market intelligence, manufacturing chemistry, and cultural traditions from India&apos;s premier chemical manufacturer.
          </p>
          <div className="accent-line accent-line-center mt-6" />
        </div>
      </section>

      {/* Main Blog Container */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Search & Category Filter Section */}
          <Suspense fallback={<div className="h-20 bg-white rounded-2xl animate-pulse mb-12 border" />}>
            <BlogFilters
              categories={BLOG_CATEGORIES}
              activeCategory={activeCategory}
              searchQuery={searchQuery}
            />
          </Suspense>

          {/* Featured Highlight Image */}
          {featuredPost && (
            <ScrollReveal>
              <div className="mb-12 bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-medium transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-7 aspect-[16/10] relative bg-gray-100 border-r border-gray-100">
                    <Image
                      src={featuredPost.featuredImage || getCategoryImage(featuredPost.category)}
                      alt={featuredPost.featuredImageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-600 rounded-full uppercase tracking-wider">
                        Featured Publication
                      </span>
                      <span className="text-xs text-gray-400 font-500">{featuredPost.readTime} read</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-700 text-gray-900 leading-tight hover:text-primary transition-colors">
                      <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                    </h2>
                    <p className="text-gray-500 mt-4 text-[15px] leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex flex-col">
                        <Link href={`/blog/${featuredPost.slug}`} className="text-sm font-700 text-gray-900 hover:text-primary transition-colors flex items-center gap-1.5">
                          Read More
                          <svg className="w-3 h-3 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <span className="text-sm text-gray-500 mt-1.5 flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {getPostViews(featuredPost.slug)}
                        </span>
                      </div>
                      <ShareButton slug={featuredPost.slug} title={featuredPost.title} />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Regular Posts Grid */}
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <div key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="block group h-full">
                    <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden hover:shadow-medium hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
                      <div className="aspect-[16/9] relative bg-gray-100 border-b border-gray-100 overflow-hidden">
                        <Image
                          src={post.featuredImage || getCategoryImage(post.category)}
                          alt={post.featuredImageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-2.5 py-1 bg-primary/5 text-primary text-xs font-600 rounded uppercase tracking-wider">
                            {post.category.replace('-', ' ')}
                          </span>
                          <span className="text-xs text-gray-400">{post.readTime} read</span>
                        </div>
                        <h3 className="text-lg font-600 text-gray-900 group-hover:text-primary transition-colors leading-snug flex-1">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-3 leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-sm font-700 text-gray-900 group-hover:text-primary transition-colors flex items-center gap-1.5">
                              Read More
                              <svg className="w-3 h-3 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                            <span className="text-sm text-gray-500 mt-1.5 flex items-center gap-1.5">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              {getPostViews(post.slug)}
                            </span>
                          </div>
                          <ShareButton slug={post.slug} title={post.title} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <span className="text-5xl">🔍</span>
              <h3 className="text-lg font-600 text-gray-900 mt-4">No Publications Found</h3>
              <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
                No matching articles were found for your search query. Try broadening your keywords or selecting another category.
              </p>
              <Link href="/blog" className="btn btn-primary mt-6 text-sm">
                Reset Filters
              </Link>
            </div>
          )}

          {/* Pagination Navigation */}
          {totalPages > 1 && (() => {
            const getPaginationRange = () => {
              if (totalPages <= 12) {
                return Array.from({ length: totalPages }, (_, i) => i + 1);
              }
              const range: (number | string)[] = [];
              if (currentPage <= 7) {
                for (let i = 1; i <= 10; i++) {
                  range.push(i);
                }
                range.push('...');
                range.push(totalPages - 1);
                range.push(totalPages);
              } else if (currentPage >= totalPages - 6) {
                range.push(1);
                range.push(2);
                range.push('...');
                for (let i = totalPages - 9; i <= totalPages; i++) {
                  range.push(i);
                }
              } else {
                range.push(1);
                range.push(2);
                range.push('...');
                for (let i = currentPage - 3; i <= currentPage + 3; i++) {
                  range.push(i);
                }
                range.push('...');
                range.push(totalPages - 1);
                range.push(totalPages);
              }
              return range;
            };

            const paginationRange = getPaginationRange();

            return (
              <div className="mt-12 flex justify-center items-center gap-2">
                {/* Previous Button */}
                <Link
                  href={`/blog?page=${Math.max(1, currentPage - 1)}${activeCategory ? `&category=${activeCategory}` : ''}${searchQuery ? `&search=${searchQuery}` : ''}`}
                  className={`w-10 h-10 flex items-center justify-center rounded border border-gray-200 bg-white text-sm font-600 transition-colors ${
                    currentPage === 1 ? 'pointer-events-none opacity-40 text-gray-300' : 'text-primary hover:bg-gray-50'
                  }`}
                >
                  ‹
                </Link>

                {/* Page Numbers */}
                {paginationRange.map((page, idx) => {
                  if (page === '...') {
                    return (
                      <div
                        key={`ellipsis-${idx}`}
                        className="w-10 h-10 flex items-center justify-center rounded border border-gray-200 bg-white text-sm font-600 text-primary select-none"
                      >
                        ...
                      </div>
                    );
                  }

                  const isCurrent = page === currentPage;
                  return (
                    <Link
                      key={`page-${page}`}
                      href={`/blog?page=${page}${activeCategory ? `&category=${activeCategory}` : ''}${searchQuery ? `&search=${searchQuery}` : ''}`}
                      className={`w-10 h-10 flex items-center justify-center rounded text-sm font-600 transition-colors border ${
                        isCurrent
                          ? 'bg-primary border-primary text-white'
                          : 'bg-white border-gray-200 text-primary hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </Link>
                  );
                })}

                {/* Next Button */}
                <Link
                  href={`/blog?page=${Math.min(totalPages, currentPage + 1)}${activeCategory ? `&category=${activeCategory}` : ''}${searchQuery ? `&search=${searchQuery}` : ''}`}
                  className={`w-10 h-10 flex items-center justify-center rounded border border-gray-200 bg-white text-sm font-600 transition-colors ${
                    currentPage === totalPages ? 'pointer-events-none opacity-40 text-gray-300' : 'text-primary hover:bg-gray-50'
                  }`}
                >
                  ›
                </Link>
              </div>
            );
          })()}
        </div>
      </section>
    </div>
  );
}

const getPostViews = (slug: string): number => {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs((hash % 180) + 20); // stable view count between 20 and 200
}
