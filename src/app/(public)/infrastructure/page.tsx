/* ═══════════════════════════════════════════════════════════════
   Infrastructure Page
   ═══════════════════════════════════════════════════════════════ */

import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

export const metadata: Metadata = {
  title: 'Infrastructure — World-Class Manufacturing Facility',
  description: 'Our 50,000+ sq ft integrated manufacturing facility houses chemical reactors, distillation units, tablet presses, packaging lines, and a modern QC laboratory.',
};

const facilities = [
  { name: 'Chemical Processing Plant', area: '15,000 sq ft', desc: 'Advanced reactor vessels, distillation columns, and purification systems for camphor and isoborneol synthesis.', icon: '⚗️' },
  { name: 'Tablet & Product Unit', area: '10,000 sq ft', desc: 'Rotary tablet presses, granulation machines, and product forming equipment for consumer products.', icon: '💊' },
  { name: 'QC Laboratory', area: '2,000 sq ft', desc: 'Fully equipped analytical lab with GC, HPLC, UV-Vis, polarimeter, and melting point apparatus.', icon: '🔬' },
  { name: 'Packaging Hall', area: '8,000 sq ft', desc: 'Automated filling, sealing, labeling, and carton packing lines for retail and export packaging.', icon: '📦' },
  { name: 'Raw Material Warehouse', area: '5,000 sq ft', desc: 'Climate-controlled storage for chemical precursors, essential oils, and packaging materials.', icon: '🏗️' },
  { name: 'Finished Goods Warehouse', area: '7,000 sq ft', desc: 'Organized storage with FIFO management, ready for domestic and export dispatch.', icon: '🏭' },
  { name: 'ETP & Utilities', area: '3,000 sq ft', desc: 'Effluent treatment plant, boiler room, generator set, and water treatment facility.', icon: '♻️' },
  { name: 'Administrative Block', area: '3,000 sq ft', desc: 'Corporate offices, conference room, R&D wing, and visitor reception area.', icon: '🏢' },
];

export default function InfrastructurePage() {
  return (
    <div>
      <section className="relative bg-primary-dark py-20 lg:py-28">
        <div className="container-custom relative z-10 text-center">
          <span className="overline text-accent-light">Our Facility</span>
          <h1 className="heading-display text-white text-4xl sm:text-5xl lg:text-6xl mt-4">Infrastructure</h1>
          <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
            A world-class integrated manufacturing campus spanning 50,000+ sq ft in Theni, Tamil Nadu.
          </p>
          <div className="accent-line accent-line-center mt-6" />
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter value={50000} suffix="+" label="Sq Ft Total Area" light className="text-center" />
            <AnimatedCounter value={8} label="Production Zones" light className="text-center" />
            <AnimatedCounter value={200} suffix="+" label="Employees" light className="text-center" />
            <AnimatedCounter value={3} label="Shift Operations" light className="text-center" />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader overline="Facilities" title="Campus Layout" />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {facilities.map((f) => (
              <StaggerItem key={f.name}>
                <div className="bg-gray-50 rounded-2xl p-6 h-full hover:shadow-medium hover:bg-white border border-transparent hover:border-gray-200 transition-all group">
                  <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">{f.icon}</span>
                  <h3 className="text-base font-600 text-gray-900 mb-1">{f.name}</h3>
                  <p className="text-xs text-accent font-600 mb-2">{f.area}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-16 bg-primary-dark">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="heading-section text-3xl text-white">Visit Our Facility</h2>
            <p className="mt-3 text-white/60 max-w-xl mx-auto">We welcome prospective buyers and partners for a guided facility tour.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn btn-gold btn-lg">Schedule a Visit</Link>
              <Link href="/gallery" className="btn btn-lg bg-white/10 text-white border border-white/20 hover:bg-white/20">Photo Gallery</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
