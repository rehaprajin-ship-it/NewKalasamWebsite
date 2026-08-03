'use client';

/* ═══════════════════════════════════════════════════════════════
   Export Division Page — Global Reach with Interactive Map
   ═══════════════════════════════════════════════════════════════ */

import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import GlobalPresenceMap from '@/components/common/GlobalPresenceMap';
import { COMPANY, EXPORT_COUNTRIES } from '@/lib/constants';

const exportServices = [
  { title: 'FCL & LCL Shipping', description: 'Full container load and less-than-container load options for all order sizes.', icon: '🚢' },
  { title: 'Complete Documentation', description: 'Commercial invoice, packing list, COA, MSDS, fumigation certificate, and origin certificate.', icon: '📋' },
  { title: 'Custom Packaging', description: 'Export-grade packaging with palletization, shrink wrap, and containerization.', icon: '📦' },
  { title: 'Quality Certificates', description: 'Batch-wise COA, MSDS, TDS, and third-party lab reports as required by destination country.', icon: '✅' },
  { title: 'Payment Flexibility', description: 'LC, TT, DA/DP terms available. Competitive pricing for repeat orders.', icon: '💰' },
  { title: 'Regulatory Compliance', description: 'Products comply with REACH, RoHS, and destination-country import regulations.', icon: '🛡️' },
];

export default function ExportPage() {
  const continents = ['Asia', 'Middle East', 'Africa', 'North America'] as const;

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-primary-dark py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/export-port.png"
            alt="Global Export Port"
            fill
            priority
            className="object-cover opacity-25"
            sizes="100vw"
          />
        </div>
        <div className="container-custom relative z-10 text-center">
          <span className="overline text-accent-light">Global Division</span>
          <h1 className="heading-display text-white text-4xl sm:text-5xl lg:text-6xl mt-4">Export Division</h1>
          <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
            Serving chemical importers, distributors, and OEM clients across 17+ countries with reliable supply and international quality standards.
          </p>
          <div className="accent-line accent-line-center mt-6" />
        </div>
      </section>

      {/* Export Services */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader overline="Capabilities" title="End-to-End Export Services" subtitle="From order confirmation to port delivery — we handle every aspect of international trade." />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {exportServices.map((svc) => (
              <StaggerItem key={svc.title}>
                <div className="bg-gray-50 rounded-2xl p-7 h-full hover:shadow-medium hover:bg-white transition-all border border-transparent hover:border-gray-200">
                  <span className="text-3xl mb-4 block">{svc.icon}</span>
                  <h3 className="text-lg font-600 text-gray-900 mb-2">{svc.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{svc.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ Global Presence — Interactive Precise Map ═══ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            overline="Global Reach"
            title="Our Global Presence"
            subtitle="Exporting premium quality products across 17+ countries worldwide."
          />

          <ScrollReveal>
            <div className="mt-8">
              <GlobalPresenceMap height="480px" initialZoom={2} center={[20, 50]} showTitleBar={true} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Countries List */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader overline="Markets" title="Countries We Serve" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
            {continents.map((continent) => {
              const countries = EXPORT_COUNTRIES.filter((c) => c.continent === continent);
              return (
                <ScrollReveal key={continent}>
                  <div>
                    <h3 className="text-sm font-600 uppercase tracking-widest text-accent mb-4">{continent}</h3>
                    <ul className="space-y-2.5">
                      {countries.map((c) => (
                        <li key={c.code} className="flex items-center gap-2.5 text-sm text-gray-700">
                          <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                          {c.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Export Products */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader overline="Portfolio" title="Export Product Range" />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {[
              { name: 'Synthetic Camphor', cas: '76-22-2', desc: 'Pharma & industrial grade, 99%+ purity' },
              { name: 'D-Camphor', cas: '464-49-3', desc: 'Dextrorotatory, pharmacopoeia grade' },
              { name: 'Isoborneol Powder', cas: '10385-78-1', desc: 'Camphor synthesis intermediate' },
              { name: 'Isoborneol Flakes', cas: '10385-78-1', desc: 'Bulk form for industrial processing' },
              { name: 'Camphor Oil', cas: '8008-51-3', desc: 'Steam-distilled essential oil' },
              { name: 'Pooja Products', cas: '-', desc: 'Camphor tablets, agarbathi, sambrani' },
            ].map((prod) => (
              <StaggerItem key={prod.name}>
                <div className="bg-gray-50 rounded-xl p-6 hover:bg-primary hover:text-white group transition-colors">
                  <h3 className="font-600 text-gray-900 group-hover:text-white">{prod.name}</h3>
                  {prod.cas !== '-' && <p className="text-xs text-gray-400 group-hover:text-white/50 mt-1">CAS: {prod.cas}</p>}
                  <p className="text-sm text-gray-500 group-hover:text-white/70 mt-2">{prod.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="heading-section text-3xl text-white">Ready to Import?</h2>
            <p className="mt-3 text-white/60 max-w-xl mx-auto">Send us your inquiry with product name, quantity, and destination port for a competitive quotation.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn btn-gold btn-lg">Export Inquiry</Link>
              <a href={`mailto:${COMPANY.contact.exportEmail}`} className="btn btn-lg bg-white/10 text-white border border-white/20 hover:bg-white/20">
                {COMPANY.contact.exportEmail}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
