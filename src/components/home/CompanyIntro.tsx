'use client';

/* ═══════════════════════════════════════════════════════════════
   Company Introduction — Asymmetric Editorial Layout
   ═══════════════════════════════════════════════════════════════ */

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/common/ScrollReveal';

export default function CompanyIntro() {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Column — 7 cols */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-px bg-accent" />
                <span className="overline">About Kalasam</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl text-gray-900 text-balance">
                Three Decades of Manufacturing Excellence
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                <strong className="text-gray-800">Kalasam Jaikrishna Industries</strong> is a certified manufacturer and exporter of synthetic camphor, industrial chemicals, and premium pooja products. Founded in <time dateTime="1995">1995</time> in Theni, Tamil Nadu, our <strong className="text-gray-800">30,000 sq ft facility</strong> processes over <strong className="text-gray-800">500 metric tons</strong> of camphor-based chemicals annually.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="mt-4 text-gray-500 leading-relaxed">
                <dfn>Synthetic camphor</dfn> is a manufactured alternative to natural camphor, produced from alpha-pinene through catalytic isomerization. You can use it across pharmaceutical, fragrance, plasticizer, and religious applications. Additionally, we produce D-camphor, isoborneol flakes, camphor oil, and a full range of ceremonial products — all tested in our in-house laboratory per <a href="https://www.iso.org/standard/62085.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ISO 9001:2015</a> standards.
              </p>
            </ScrollReveal>

            {/* Key highlights — editorial inline stats */}
            <ScrollReveal delay={0.4}>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-gray-200 pt-8">
                <div>
                  <div className="text-3xl font-800 text-primary tracking-tight">25<span className="text-accent">+</span></div>
                  <div className="text-sm text-gray-500 mt-1">Years of Trust</div>
                </div>
                <div>
                  <div className="text-3xl font-800 text-primary tracking-tight">17<span className="text-accent">+</span></div>
                  <div className="text-sm text-gray-500 mt-1">Export Countries</div>
                </div>
                <div>
                  <div className="text-3xl font-800 text-primary tracking-tight">500<span className="text-accent">+</span></div>
                  <div className="text-sm text-gray-500 mt-1">Global Clients</div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/about" className="btn btn-primary">
                  Our Story
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/manufacturing" className="btn btn-outline">
                  Manufacturing
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Visual Column — 5 cols */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <ScrollReveal direction="right" delay={0.2}>
              <figure className="relative">
                {/* Main factory image */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/hero/factory-campus.png"
                    alt="Kalasam Jaikrishna Industries 30,000 sq ft manufacturing facility in Theni, Tamil Nadu"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-gray-400 text-center">
                  Our ISO 9001:2015 certified manufacturing campus in Theni, Tamil Nadu — operational since 1995.
                </figcaption>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-elevated p-5 border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-700 text-gray-900">ISO 9001:2015</div>
                      <div className="text-xs text-gray-500">Certified Manufacturer</div>
                    </div>
                  </div>
                </motion.div>
              </figure>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
