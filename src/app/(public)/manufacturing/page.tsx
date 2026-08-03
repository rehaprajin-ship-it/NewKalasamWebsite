import PageHero from '@/components/ui/PageHero';
/* ═══════════════════════════════════════════════════════════════
   Manufacturing Page
   ═══════════════════════════════════════════════════════════════ */

import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

export const metadata: Metadata = {
  title: 'Manufacturing — State-of-the-Art Production Facility',
  description: 'Explore our ISO 9001:2015 certified manufacturing facility in Theni, Tamil Nadu — featuring advanced chemical reactors, automated production lines, and in-house quality laboratory.',
};

const capabilities = [
  { title: 'Chemical Reactors', description: 'Advanced reactor vessels with precise temperature, pressure, and flow control for camphor synthesis.', icon: '⚗️' },
  { title: 'Distillation Units', description: 'Multi-stage distillation columns for purification of camphor oil and chemical intermediates.', icon: '🔬' },
  { title: 'Tablet Pressing', description: 'Automated rotary tablet presses with precision weight control for camphor tablet production.', icon: '💊' },
  { title: 'Granulation & Milling', description: 'Industrial grinders and sieve classifiers for particle size control and powder production.', icon: '⚙️' },
  { title: 'Quality Laboratory', description: 'In-house lab with GC, HPLC, melting point apparatus, and optical rotation measurement.', icon: '🧪' },
  { title: 'Packaging Lines', description: 'Automated filling, sealing, and labeling machines for retail, bulk, and export packaging.', icon: '📦' },
  { title: 'Warehouse & Storage', description: 'Climate-controlled warehouses with proper ventilation for chemical and finished goods storage.', icon: '🏭' },
  { title: 'Water Treatment', description: 'Effluent treatment plant and water recycling systems for sustainable manufacturing.', icon: '♻️' },
];

export default function ManufacturingPage() {
  return (
    <div>
      {/* Hero */}
      <PageHero
        title="Manufacturing Operations"
        overline="Excellence in Production"
        description="State-of-the-art chemical synthesis facilities, vacuum distillation towers, and clean packing zones."
        backgroundImage="/images/hero/manufacturing-line.png"
      />

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter value={10000} suffix="+" label="MT Annual Capacity" light className="text-center" />
            <AnimatedCounter value={50} suffix="+" label="Product SKUs" light className="text-center" />
            <AnimatedCounter value={200} suffix="+" label="Team Members" light className="text-center" />
            <AnimatedCounter value={24} suffix="/7" label="Production" light className="text-center" />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader overline="Infrastructure" title="Manufacturing Capabilities" subtitle="Our integrated facility houses everything from raw material processing to finished goods packaging." />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {capabilities.map((cap) => (
              <StaggerItem key={cap.title}>
                <div className="bg-gray-50 rounded-2xl p-6 h-full hover:shadow-medium hover:bg-white border border-transparent hover:border-gray-200 transition-all group">
                  <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform">{cap.icon}</span>
                  <h3 className="text-base font-600 text-gray-900 mb-2">{cap.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader overline="Process" title="From Raw Material to Finished Product" />
          <div className="max-w-3xl mx-auto mt-4">
            {[
              { step: '01', title: 'Raw Material Receipt & Testing', desc: 'Every batch of raw material is tested in our QC lab before acceptance into the production process.' },
              { step: '02', title: 'Chemical Processing', desc: 'Controlled chemical synthesis in reactor vessels with continuous monitoring of reaction parameters.' },
              { step: '03', title: 'Purification & Refining', desc: 'Multi-stage distillation and crystallization to achieve target purity levels (99%+).' },
              { step: '04', title: 'In-Process Quality Control', desc: 'Intermediate testing at each stage ensures the final product will meet specifications.' },
              { step: '05', title: 'Final Product Testing', desc: 'Comprehensive analysis including GC purity, melting point, optical rotation, and appearance checks.' },
              { step: '06', title: 'Packaging & Dispatch', desc: 'Product-specific packaging with proper labeling, batch coding, and documentation.' },
            ].map((item, i) => (
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

      {/* CTA */}
      <section className="py-16 bg-primary-dark">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="heading-section text-3xl text-white">Schedule a Factory Visit</h2>
            <p className="mt-3 text-white/60 max-w-xl mx-auto">See our manufacturing capabilities firsthand. We welcome prospective clients and partners.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn btn-gold btn-lg">Request a Visit</Link>
              <Link href="/gallery" className="btn btn-lg bg-white/10 text-white border border-white/20 hover:bg-white/20">View Gallery</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
