/* ═══════════════════════════════════════════════════════════════
   Blog Detail Page — Dynamic Route with full SEO, FAQs, and Schema
   ═══════════════════════════════════════════════════════════════ */

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, getPostBySlug } from '@/data/blog-posts';
import { getCategoryName, getCategoryImage } from '@/data/blog-categories';
import ScrollReveal from '@/components/common/ScrollReveal';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { BreadcrumbSchema } from '@/components/seo/SchemaMarkup';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  const canonicalUrl = post.canonicalUrl || `${SITE_URL}/blog/${post.slug}`;
  const ogImage = `${SITE_URL}/opengraph-image.png`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords, ...post.tags],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.publishDate,
      modifiedTime: post.modifiedDate,
      authors: [post.author || SITE_NAME],
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [ogImage],
    },
  };
}

// Generate static params for static site generation
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const categoryName = getCategoryName(post.category);

  // Generate structured data schema (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': post.schemaType === 'HowTo' ? 'HowTo' : 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}/opengraph-image.png`,
    datePublished: post.publishDate,
    dateModified: post.modifiedDate,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
  };

  // Find related articles (matching category or tag, up to 3)
  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && (p.category === post.category || p.tags.some(t => post.tags.includes(t)))
  ).slice(0, 3);

  return (
    <article className="min-h-screen bg-gray-50">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Blog', url: `${SITE_URL}/blog` },
        { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
      ]} />

      {/* Header Banner */}
      <section className="relative bg-primary-dark py-16 lg:py-24 text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20" style={{ backgroundImage: "url('/images/hero/factory-campus.png')" }} />
        <div className="container-custom relative z-10 max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white/80 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-accent-light font-500">{categoryName}</span>
          </div>

          <h1 className="heading-display text-white text-3xl sm:text-4xl lg:text-5xl leading-tight font-700">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/60">
            <span className="px-3 py-1 bg-primary text-white text-xs font-600 rounded border border-white/10 uppercase tracking-wider">
              {categoryName}
            </span>
            <span>•</span>
            <span>{post.readTime} read</span>
            <span>•</span>
            <span>Published: {post.publishDate}</span>
          </div>
        </div>
      </section>

      {/* Content Container */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-sm">
            {/* Featured Image */}
            <ScrollReveal>
              <div className="aspect-[16/9] relative bg-gray-100 rounded-2xl overflow-hidden border border-gray-200/80 mb-10">
                <Image
                  src={post.featuredImage || getCategoryImage(post.category)}
                  alt={post.featuredImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                  priority
                />
              </div>
            </ScrollReveal>

            {/* Main Content Render */}
            <ScrollReveal delay={0.1}>
              <div className="prose max-w-none text-gray-700 leading-relaxed text-[16px] space-y-6">
                {post.sections.map((section, idx) => {
                  switch (section.type) {
                    case 'h2':
                      return (
                        <h2 key={idx} className="text-2xl sm:text-3xl font-700 text-gray-900 pt-6 border-b border-gray-100 pb-2">
                          {section.text}
                        </h2>
                      );
                    case 'h3':
                      return (
                        <h3 key={idx} className="text-xl sm:text-2xl font-600 text-gray-900 pt-4">
                          {section.text}
                        </h3>
                      );
                    case 'p':
                      return <p key={idx} className="leading-relaxed">{section.text}</p>;
                    case 'ul':
                      return (
                        <ul key={idx} className="list-disc pl-6 space-y-2 my-4">
                          {section.items?.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      );
                    case 'table':
                      return (
                        <div key={idx} className="overflow-x-auto my-6 border border-gray-200 rounded-xl">
                          <table className="w-full text-left text-sm border-collapse">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200 text-gray-900 font-600">
                                {section.table?.headers.map((h, i) => (
                                  <th key={i} className="px-4 py-3">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {section.table?.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                  {row.cells.map((c, cIdx) => (
                                    <td key={cIdx} className="px-4 py-3 text-gray-600">{c}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </ScrollReveal>

            {/* Dynamic FAQs Section */}
            {post.faqs && post.faqs.length > 0 && (
              <ScrollReveal delay={0.2}>
                <div className="mt-16 pt-10 border-t border-gray-200">
                  <h2 className="text-2xl font-700 text-gray-900 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {post.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-200/60">
                        <h4 className="text-md font-600 text-gray-900">{faq.question}</h4>
                        <p className="text-gray-600 mt-2 text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Internal Links/Anchor Links CTA */}
            {post.internalLinks && post.internalLinks.length > 0 && (
              <ScrollReveal delay={0.25}>
                <div className="mt-12 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                  <h4 className="text-sm font-700 text-primary uppercase tracking-wider mb-3">Useful Resources</h4>
                  <div className="flex flex-wrap gap-3">
                    {post.internalLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.href}
                        className="text-sm text-gray-800 bg-white px-4 py-2 rounded-xl border border-gray-200 hover:text-primary hover:border-primary transition-all shadow-sm"
                      >
                        {link.text}
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Footer / Author section */}
            <ScrollReveal delay={0.3}>
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-700">K</span>
                    </div>
                    <div>
                      <p className="text-sm font-600 text-gray-900">{post.author}</p>
                      <p className="text-xs text-gray-500">Quality, Manufacturing & Export Divisions</p>
                    </div>
                  </div>
                  <Link href="/blog" className="text-sm font-600 text-primary hover:underline">
                    ← Back to all Publications
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Related Articles Grid */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-xl font-700 text-gray-900 mb-6">Related Publications</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rPost) => (
                  <Link href={`/blog/${rPost.slug}`} key={rPost.slug} className="block group">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-medium hover:border-primary/20 transition-all h-full flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-600 tracking-wider text-primary bg-primary/5 px-2 py-1 rounded">
                          {getCategoryName(rPost.category)}
                        </span>
                        <h4 className="text-sm font-600 text-gray-900 mt-3 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                          {rPost.title}
                        </h4>
                      </div>
                      <span className="text-xs text-gray-400 mt-4 block">{rPost.publishDate}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
