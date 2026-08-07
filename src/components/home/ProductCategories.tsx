'use client';

/* ═══════════════════════════════════════════════════════════════
   Product Categories — Card Grid (Reference Design)
   Green-bordered cards with product images, action icons & names
   ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';

import { getProducts } from '@/lib/firestore';
import { COMPANY } from '@/lib/constants';

const seedProducts = [
  {
    title: 'Synthetic Camphor',
    href: '/products/synthetic-camphor',
    image: '/images/products/synthetic-camphor.png',
  },
  {
    title: 'D-Camphor',
    href: '/products/d-camphor',
    image: '/images/products/synthetic-camphor.png',
  },
  {
    title: 'Isoborneol Powder',
    href: '/products/isoborneol-powder',
    image: '/images/products/isoborneol.png',
  },
  {
    title: 'Isoborneol Flakes',
    href: '/products/isoborneol-flakes',
    image: '/images/products/isoborneol-flakes.jpg',
  },
  {
    title: 'Camphor Oil',
    href: '/products/camphor-oil',
    image: '/images/products/synthetic-camphor.png',
  },
  {
    title: 'Pooja Products',
    href: '/pooja-products',
    image: '/images/products/synthetic-camphor.png',
  },
];

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

/* Optimize Cloudinary URLs: request 300px wide, auto format/quality */
function optimizeImageUrl(url: string): string {
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', '/upload/w_300,q_auto,f_auto/');
  }
  return url;
}

export default function ProductCategories() {
  const whatsappNumber = COMPANY.contact.whatsapp;
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (data) {
          const topSelling = data.filter((p) => p.featured === true);
          const mapped = topSelling.map((p) => ({
            id: p.id,
            title: p.name,
            href: `/products/${p.slug}`,
            image: optimizeImageUrl(p.images?.[0] || '/images/products/synthetic-camphor.png'),
          }));
          setProducts(mapped);
        } else {
          setProducts([]);
        }
      })
      .catch(() => setProducts([]));
  }, []);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <SectionHeader
          overline="Our Portfolio"
          title="Our Top-Selling Products"
          subtitle="Premium quality chemicals and camphor products manufactured to international standards for global markets."
        />

        {/* Product Cards Grid */}
        {/* Infinite Moving Marquee Wrapper */}
        <div className="relative flex overflow-x-hidden w-full py-10 mask-gradient animate-marquee-hover-pause">
          <div className="flex gap-6 animate-marquee whitespace-nowrap">
            {products.map((product) => (
              <div key={`marquee-1-${product.id}`} className="w-[180px] sm:w-[220px] flex-shrink-0 group flex flex-col whitespace-normal">
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
                      href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in ${product.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`WhatsApp enquiry for ${product.title}`}
                      className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center
                                 shadow-md hover:bg-primary-light hover:scale-110 transition-all duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <WhatsAppIcon />
                    </a>
                    <a
                      href={`mailto:${COMPANY.contact.email}?subject=Enquiry about ${product.title}`}
                      aria-label={`Email enquiry for ${product.title}`}
                      className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center
                                 shadow-md hover:bg-primary-light hover:scale-110 transition-all duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EmailIcon />
                    </a>
                  </div>

                  {/* Product Image */}
                  <Link href={product.href} className="block">
                    <div className="w-full aspect-square p-3 sm:p-4 flex items-center justify-center bg-gray-50/30 relative">
                      <Image
                        src={product.image}
                        alt={`${product.title} — Jaikrishna Industries product`}
                        width={210}
                        height={210}
                        className="object-contain max-h-[120px] w-auto group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
                      />
                    </div>
                  </Link>
                </motion.div>

                {/* Product Name — Below Card */}
                <Link href={product.href}>
                  <h3 className="mt-4 text-center text-sm sm:text-base font-semibold text-gray-800
                                 group-hover:text-primary transition-colors duration-300 leading-tight">
                    {product.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>

          <div className="flex gap-6 animate-marquee whitespace-nowrap" aria-hidden="true">
            {products.map((product) => (
              <div key={`marquee-2-${product.id}`} className="w-[180px] sm:w-[220px] flex-shrink-0 group flex flex-col whitespace-normal">
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
                      href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in ${product.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`WhatsApp enquiry for ${product.title}`}
                      className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center
                                 shadow-md hover:bg-primary-light hover:scale-110 transition-all duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <WhatsAppIcon />
                    </a>
                    <a
                      href={`mailto:${COMPANY.contact.email}?subject=Enquiry about ${product.title}`}
                      aria-label={`Email enquiry for ${product.title}`}
                      className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center
                                 shadow-md hover:bg-primary-light hover:scale-110 transition-all duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EmailIcon />
                    </a>
                  </div>

                  {/* Product Image */}
                  <Link href={product.href} className="block">
                    <div className="w-full aspect-square p-3 sm:p-4 flex items-center justify-center bg-gray-50/30 relative">
                      <Image
                        src={product.image}
                        alt={`${product.title} — Jaikrishna Industries product`}
                        width={210}
                        height={210}
                        className="object-contain max-h-[120px] w-auto group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
                      />
                    </div>
                  </Link>
                </motion.div>

                {/* Product Name — Below Card */}
                <Link href={product.href}>
                  <h3 className="mt-4 text-center text-sm sm:text-base font-semibold text-gray-800
                                 group-hover:text-primary transition-colors duration-300 leading-tight">
                    {product.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Browse All CTA */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <Link href="/products" className="btn btn-outline">
              View All Products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
