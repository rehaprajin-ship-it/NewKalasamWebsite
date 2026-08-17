/* ═══════════════════════════════════════════════════════════════
   Category Archive Page — Lists articles belonging to a specific cluster
   ═══════════════════════════════════════════════════════════════ */

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BLOG_CATEGORIES, getCategoryBySlug, getCategoryImage } from '@/data/blog-categories';
import { getPostsByCategory } from '@/data/blog-posts';
import ShareButton from '@/components/ui/ShareButton';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import { SITE_URL } from '@/lib/constants';

type PageProps = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryData = getCategoryBySlug(category);

  if (!categoryData) {
    return {
      title: 'Category Not Found',
    };
  }

  const canonicalUrl = `${SITE_URL}/blog/category/${category}`;

  return {
    title: `${categoryData.metaTitle} — Kalasam Jaikrishna Industries`,
    description: categoryData.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${categoryData.metaTitle} — Kalasam Jaikrishna Industries`,
      description: categoryData.metaDescription,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

// Generate static params for category pages
export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({
    category: c.slug,
  }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const categoryData = getCategoryBySlug(category);

  if (!categoryData) {
    notFound();
  }

  const posts = getPostsByCategory(category);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Category Header */}
      <section className="relative bg-primary-dark py-16 lg:py-24 text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-25" style={{ backgroundImage: "url('/images/hero/factory-campus.png')" }} />
        <div className="container-custom relative z-10 max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white/80 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-accent-light font-500">{categoryData.name}</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{categoryData.icon}</span>
            <h1 className="heading-display text-white text-3xl sm:text-4xl lg:text-5xl font-700">
              {categoryData.name}
            </h1>
          </div>
          <p className="text-white/70 mt-4 text-[17px] leading-relaxed max-w-2xl">
            {categoryData.description}
          </p>
        </div>
      </section>

      {/* Grid List of Posts */}
      <section className="section-padding">
        <div className="container-custom">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="block group h-full">
                    <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden hover:shadow-medium hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
                      <div className="aspect-[16/9] relative bg-gray-100 border-b border-gray-100 overflow-hidden">
                        <Image
                          src={post.featuredImage || getCategoryImage(post.category)}
                          alt={post.featuredImageAlt || post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-2.5 py-1 bg-primary/5 text-primary text-xs font-600 rounded uppercase tracking-wider">
                            {categoryData.name}
                          </span>
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
              <span className="text-5xl">📚</span>
              <h3 className="text-lg font-600 text-gray-900 mt-4">No Publications Yet</h3>
              <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
                We are currently preparing technical articles and research insights for the {categoryData.name} category. Check back soon.
              </p>
              <Link href="/blog" className="btn btn-primary mt-6 text-sm">
                Back to Blog
              </Link>
            </div>
          )}
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
};
