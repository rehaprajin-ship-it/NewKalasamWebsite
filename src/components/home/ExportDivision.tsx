'use client';

/* ═══════════════════════════════════════════════════════════════
   Export Division — World Map with Country Pins (Home Section)
   Mobile: accordion continents + tap-to-activate map overlay
   ═══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/common/ScrollReveal';
import dynamic from 'next/dynamic';
import { EXPORT_COUNTRIES } from '@/lib/constants';

const GlobalPresenceMap = dynamic(
  () => import('@/components/common/GlobalPresenceMap'),
  { ssr: false, loading: () => <div className="w-full h-[400px] bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center text-gray-400 text-sm">Loading map…</div> }
);

const continents = ['Asia', 'Middle East', 'Africa', 'North America'] as const;

export default function ExportDivision() {
  const [mapActive, setMapActive] = useState(false);
  const [openContinent, setOpenContinent] = useState<string | null>(null);

  const toggleContinent = (c: string) => {
    setOpenContinent(openContinent === c ? null : c);
  };

  return (
    <section className="section-padding bg-gray-50 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Interactive Map Visual */}
          <ScrollReveal direction="left">
            <div className="relative">
              <GlobalPresenceMap height="400px" initialZoom={2} center={[20, 50]} showTitleBar={false} />
              
              {/* Mobile tap-to-activate overlay — prevents scroll trapping */}
              {!mapActive && (
                <button
                  onClick={() => setMapActive(true)}
                  className="absolute inset-0 z-10 bg-gray-900/30 backdrop-blur-[1px] rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer lg:hidden transition-opacity"
                  aria-label="Tap to interact with map"
                >
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="text-white text-sm font-600">Tap to explore map</span>
                </button>
              )}
            </div>
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
                When you order for export, our dedicated division handles everything — from customs documentation to containerized FCL/LCL shipping. We currently export to <strong className="text-gray-700">17+ countries</strong> across Asia, the Middle East, Africa, and North America. Furthermore, all shipments comply with <a href="https://www.ippc.int/en/core-activities/standards-setting/ispms/ispm-15/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ISPM-15</a> packaging standards and include COA, MSDS, and phytosanitary certificates.
              </p>
            </ScrollReveal>

            {/* Countries by continent — accordion on mobile, flat on desktop */}
            <div className="mt-6 space-y-4">
              {continents.map((continent) => {
                const countries = EXPORT_COUNTRIES.filter((c) => c.continent === continent);
                if (countries.length === 0) return null;
                const isOpen = openContinent === continent;
                return (
                  <ScrollReveal key={continent} delay={0.3}>
                    <div>
                      {/* Desktop: flat heading */}
                      <h4 className="hidden lg:block text-xs font-600 uppercase tracking-widest text-accent mb-2">
                        {continent}
                      </h4>

                      {/* Mobile: accordion button */}
                      <button
                        onClick={() => toggleContinent(continent)}
                        className="lg:hidden w-full flex items-center justify-between py-2 text-xs font-600 uppercase tracking-widest text-accent cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        {continent} ({countries.length})
                        <svg
                          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Country chips — always visible on desktop, toggle on mobile */}
                      <div className={`flex flex-wrap gap-2 ${isOpen ? 'block' : 'hidden lg:flex'}`}>
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
