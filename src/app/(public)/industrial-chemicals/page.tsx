import PageHero from '@/components/ui/PageHero';
/* ═══════════════════════════════════════════════════════════════
   Industrial Chemicals Page
   ═══════════════════════════════════════════════════════════════ */

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'Industrial Chemicals Manufacturer | Camphor & Isoborneol Flakes | Kalasam',
  description: 'ISO-certified manufacturer of synthetic camphor, D-camphor, isoborneol powder, and camphor oil in Theni, Tamil Nadu. Shipping bulk chemical intermediates to chemical factories in Mumbai, Gujarat, Delhi, Chennai, and globally.',
  keywords: [
    'synthetic camphor manufacturer India',
    'isoborneol flakes supplier Tamil Nadu',
    'D-camphor chemical formulation Mumbai Gujarat',
    'camphor oil bulk distributor',
    'industrial chemicals manufacturing factory Theni'
  ]
};

const chemicals = [
  { name: 'Synthetic Camphor', cas: '76-22-2', formula: 'C₁₀H₁₆O', purity: '≥99.0%', slug: 'synthetic-camphor', desc: 'Pharmaceutical & industrial grade camphor for chemical synthesis, plasticizers, and fragrance.' },
  { name: 'D-Camphor', cas: '464-49-3', formula: 'C₁₀H₁₆O', purity: '≥97.0%', slug: 'd-camphor', desc: 'Dextrorotatory natural camphor for pharmaceutical formulations and chiral synthesis.' },
  { name: 'Isoborneol Powder', cas: '10385-78-1', formula: 'C₁₀H₁₈O', purity: '≥95.0%', slug: 'isoborneol-powder', desc: 'Key intermediate for camphor synthesis, available in fine powder form.' },
  { name: 'Isoborneol Flakes', cas: '10385-78-1', formula: 'C₁₀H₁₈O', purity: '≥95.0%', slug: 'isoborneol-flakes', desc: 'Flake form for easier handling in bulk manufacturing processes.' },
  { name: 'Camphor Oil', cas: '8008-51-3', formula: 'Complex mixture', purity: 'Natural grade', slug: 'camphor-oil', desc: 'Steam-distilled essential oil for pharma, fragrance, and cosmetics.' },
];

export default function IndustrialChemicalsPage() {
  return (
    <div>
      <PageHero
        title="Industrial Chemicals"
        overline="B2B Intermediates"
        description="Refined synthetic camphor, D-camphor, isoborneol flakes, and organic compounds for chemical plants."
        backgroundImage="/images/hero/manufacturing-line.png"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader overline="Portfolio" title="Our Chemical Range" />
          <div className="space-y-6 mt-4">
            {chemicals.map((chem, i) => (
              <ScrollReveal key={chem.cas + chem.name} delay={i * 0.05}>
                <Link href={`/products/${chem.slug}`} className="block group">
                  <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 hover:shadow-medium hover:bg-white border border-transparent hover:border-gray-200 transition-all">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      <div className="flex-1">
                        <h3 className="text-xl font-700 text-gray-900 group-hover:text-primary transition-colors">{chem.name}</h3>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">{chem.desc}</p>
                      </div>
                      <div className="flex flex-wrap gap-4 lg:gap-6 text-sm">
                        <div><span className="text-xs text-gray-400 block">CAS</span><span className="font-600 text-gray-700">{chem.cas}</span></div>
                        <div><span className="text-xs text-gray-400 block">Formula</span><span className="font-600 text-gray-700">{chem.formula}</span></div>
                        <div><span className="text-xs text-gray-400 block">Purity</span><span className="font-600 text-primary">{chem.purity}</span></div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="heading-section text-3xl text-white">Need a Custom Specification?</h2>
            <p className="mt-3 text-white/60 max-w-xl mx-auto">Our R&D team can develop custom formulations and purity grades to meet your specific requirements.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn btn-gold btn-lg">Request a Quote</Link>
              <Link href="/export" className="btn btn-lg bg-white/10 text-white border border-white/20 hover:bg-white/20">Export Inquiry</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
