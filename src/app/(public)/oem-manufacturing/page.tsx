import PageHero from '@/components/ui/PageHero';
/* ═══════════════════════════════════════════════════════════════
   OEM Manufacturing Page
   ═══════════════════════════════════════════════════════════════ */

import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import Link from 'next/link';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  alternates: { canonical: `/oem-manufacturing` },
  title: 'OEM Manufacturing — Contract Manufacturing & Custom Formulations',
  description: 'OEM contract manufacturing services for camphor, industrial chemicals, and pooja products. Custom formulations, flexible MOQs, and private formulation development.',
};

const oemSteps = [
  { step: '01', title: 'Requirement Analysis', desc: 'Share your product specifications — purity, grade, particle size, packaging, and volume requirements.' },
  { step: '02', title: 'Feasibility Study', desc: 'Our R&D team evaluates manufacturing feasibility, costing, and lead time for your custom product.' },
  { step: '03', title: 'Sample Development', desc: 'We produce samples matching your exact specifications for testing and approval.' },
  { step: '04', title: 'Trial Production', desc: 'Small batch production run to validate quality, consistency, and packaging.' },
  { step: '05', title: 'Bulk Manufacturing', desc: 'Full-scale production with batch-wise quality control and COA documentation.' },
  { step: '06', title: 'Logistics & Delivery', desc: 'Domestic or export delivery with complete documentation and tracking.' },
];

const oemProducts = [
  'Synthetic Camphor (custom purity grades)',
  'D-Camphor (pharmacopoeia grade)',
  'Isoborneol (powder/flakes)',
  'Camphor Oil (various fractions)',
  'Camphor Tablets (custom weights)',
  'Sambrani Products (cup/block)',
  'Agarbathi (custom fragrances)',
  'Specialty Chemical Intermediates',
];

export default function OEMManufacturingPage() {
  return (
    <div>
      <PageHero
        title="OEM Manufacturing Services"
        overline="B2B Contract Manufacturing"
        description="Custom formulation and bulk contract manufacturing for chemical and FMCG brands globally."
        backgroundImage="/images/hero/manufacturing-line.png"
      />

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader overline="Process" title="How OEM Partnership Works" />
          <div className="max-w-3xl mx-auto mt-4">
            {oemSteps.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.05}>
                <div className="flex gap-6 items-start mb-8 last:mb-0">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-700 text-sm">{item.step}</div>
                  <div>
                    <h3 className="text-base font-600 text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* OEM Products */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <span className="overline">Capabilities</span>
                <h2 className="heading-section text-3xl text-gray-900 mt-4">Products We Manufacture on OEM Basis</h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <ul className="mt-6 space-y-3">
                  {oemProducts.map((prod) => (
                    <li key={prod} className="flex items-center gap-3 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {prod}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
            <ScrollReveal direction="right">
              <div className="bg-primary rounded-2xl p-10 text-center">
                <h3 className="text-2xl font-700 text-white mb-4">Why Choose Us for OEM?</h3>
                <ul className="space-y-3 text-left">
                  {['ISO 9001:2015 certified facility', 'In-house R&D for custom formulations', 'Flexible MOQ from 100 kg', 'Batch-wise COA & MSDS', '25+ years manufacturing experience', 'Export-ready documentation'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="heading-section text-3xl text-white">Start Your OEM Project</h2>
            <p className="mt-3 text-white/60 max-w-xl mx-auto">Share your requirements and our team will provide a detailed proposal within 48 hours.</p>
            <Link href="/contact" className="btn btn-gold btn-lg mt-8">Get Started</Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
