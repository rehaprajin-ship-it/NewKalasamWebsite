'use client';

/* ═══════════════════════════════════════════════════════════════
   Quality Section — Certification Badge Wall
   ═══════════════════════════════════════════════════════════════ */

import ScrollReveal from '@/components/common/ScrollReveal';
import { CERTIFICATIONS } from '@/lib/constants';

export default function QualitySection() {
  return (
    <section className="relative section-padding bg-cream overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1200 600">
          <pattern id="qualPattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0 L60 30 L30 60 L0 30Z" fill="none" stroke="#D4AF37" strokeWidth="0.3" opacity="0.3" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#qualPattern)" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Content */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-px bg-accent" />
                <span className="overline">Quality Assurance</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="heading-section text-3xl sm:text-4xl text-gray-900 text-balance">
                Certified Quality at Every Stage
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-4 text-gray-500 leading-relaxed">
                You get consistent, verified quality with every order. Our multi-stage quality control process covers raw material intake through final dispatch. As a result, every batch ships with full documentation and traceability — meeting the requirements of <a href="https://www.iso.org/standard/62085.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ISO 9001:2015</a> quality management standards.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <h3 className="mt-6 text-sm font-700 text-gray-900 uppercase tracking-wider">Our 5-Step QC Process</h3>
              <ol className="mt-3 space-y-3 list-decimal list-inside">
                {[
                  'Incoming raw material inspection and supplier verification',
                  'In-process monitoring during synthesis and tableting',
                  'Laboratory purity testing (sublimation rate, moisture, melting point)',
                  'Batch-wise Certificate of Analysis (COA) generation',
                  'Final dispatch audit with MSDS documentation',
                ].map((item) => (
                  <li key={item} className="text-sm text-gray-600 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ol>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <ul className="mt-5 space-y-2">
                {[
                  'Regular third-party audits',
                  'Complete batch traceability system',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Certification Grid */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" delay={0.2}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {CERTIFICATIONS.map((cert, i) => (
                  <div
                    key={cert}
                    className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 flex flex-col items-center justify-center text-center hover:shadow-medium hover:border-primary/20 transition-all duration-300 group sm:aspect-square"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-50 group-hover:bg-primary flex items-center justify-center mb-3 transition-colors">
                      <svg className="w-6 h-6 text-primary group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                    </div>
                    <span className="text-xs font-600 text-gray-700 group-hover:text-primary transition-colors leading-tight">{cert}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
