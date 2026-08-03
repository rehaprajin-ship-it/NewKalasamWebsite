'use client';

/* ═══════════════════════════════════════════════════════════════
   Export Division — World Map with Country Pins (Home Section)
   ═══════════════════════════════════════════════════════════════ */

import Link from 'next/link';
import ScrollReveal from '@/components/common/ScrollReveal';
import GlobalPresenceMap from '@/components/common/GlobalPresenceMap';
import { EXPORT_COUNTRIES } from '@/lib/constants';

const continents = ['Asia', 'Middle East', 'Africa', 'North America'] as const;

export default function ExportDivision() {
  return (
    <section className="section-padding bg-gray-50 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Interactive Map Visual */}
          <ScrollReveal direction="left">
            <GlobalPresenceMap height="400px" initialZoom={2} center={[20, 50]} showTitleBar={false} />
          </ScrollReveal>

          {/* Right: Content */}
          <div>
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-px bg-accent" />
                <span className="overline">Global Presence</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="heading-section text-3xl sm:text-4xl text-gray-900 text-balance">
                Exporting Excellence Across 17+ Nations
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-4 text-gray-500 leading-relaxed">
                Our export division handles complete documentation, customs clearance, containerized FCL/LCL shipping, 
                and international quality certifications — ensuring seamless delivery to buyers worldwide.
              </p>
            </ScrollReveal>

            {/* Countries by continent */}
            <div className="mt-6 space-y-4">
              {continents.map((continent) => {
                const countries = EXPORT_COUNTRIES.filter((c) => c.continent === continent);
                if (countries.length === 0) return null;
                return (
                  <ScrollReveal key={continent} delay={0.3}>
                    <div>
                      <h4 className="text-xs font-600 uppercase tracking-widest text-accent mb-2">{continent}</h4>
                      <div className="flex flex-wrap gap-2">
                        {countries.map((country) => (
                          <span
                            key={country.code}
                            className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-500 text-gray-700 hover:border-primary/30 hover:text-primary transition-colors"
                          >
                            {country.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal delay={0.5}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/export" className="btn btn-primary">
                  Export Division
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/contact" className="btn btn-outline">
                  Export Inquiry
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
