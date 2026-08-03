/* ═══════════════════════════════════════════════════════════════
   Private Label Page
   ═══════════════════════════════════════════════════════════════ */

import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'Private Label — Your Brand, Our Quality Manufacturing',
  description: 'Launch your own brand of camphor tablets, agarbathi, sambrani, and pooja products with our private label manufacturing services. Custom packaging and low MOQ.',
};

const benefits = [
  { title: 'Your Brand Identity', desc: 'Custom packaging design, your logo, your brand story — on products manufactured in our ISO-certified facility.', icon: '🎨' },
  { title: 'Low Minimum Orders', desc: 'Start with quantities as low as 500 units. Scale up as your brand grows.', icon: '📦' },
  { title: 'Premium Quality', desc: 'Same quality that goes into our own brand — ISO certified, batch-tested, and quality guaranteed.', icon: '⭐' },
  { title: 'Complete Packaging', desc: 'From pouch to carton — we handle design, printing, filling, and final packaging.', icon: '🎁' },
  { title: 'Fast Turnaround', desc: 'Quick production cycles with 10-15 day delivery for most orders.', icon: '⚡' },
  { title: 'Market Support', desc: 'Marketing materials, product photography, and content support for your brand launch.', icon: '📢' },
];

const privateLabelProducts = [
  'Camphor Tablets (₹1, ₹2, ₹5, ₹10, 15g-50g)',
  'Cup Sambrani (various cup sizes)',
  'Computer Sambrani (traditional blocks)',
  'Agarbathi (multiple fragrances)',
  'Lamp Oil (glass & plastic bottles)',
  'Rose Water (spray & pour bottles)',
  'Cotton Wicks (various sizes)',
  'Pooja Kits (complete gift boxes)',
];

export default function PrivateLabelPage() {
  return (
    <div>
      <section className="relative bg-primary-dark py-20 lg:py-28">
        <div className="container-custom relative z-10 text-center">
          <span className="overline text-accent-light">Your Brand</span>
          <h1 className="heading-display text-white text-4xl sm:text-5xl lg:text-6xl mt-4">Private Label</h1>
          <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
            Launch your own brand of premium pooja products and camphor — backed by 25+ years of manufacturing expertise.
          </p>
          <div className="accent-line accent-line-center mt-6" />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader overline="Advantages" title="Why Private Label with Kalasam?" />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {benefits.map((b) => (
              <StaggerItem key={b.title}>
                <div className="bg-gray-50 rounded-2xl p-7 h-full hover:shadow-medium hover:bg-white border border-transparent hover:border-gray-200 transition-all">
                  <span className="text-3xl mb-4 block">{b.icon}</span>
                  <h3 className="text-lg font-600 text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader overline="Products" title="Private Label Product Range" />
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {privateLabelProducts.map((prod) => (
                <div key={prod} className="bg-white rounded-xl p-5 border border-gray-200 text-sm text-gray-700 hover:border-primary/30 transition-colors">
                  {prod}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="heading-section text-3xl text-white">Start Your Brand Today</h2>
            <p className="mt-3 text-white/60 max-w-xl mx-auto">Tell us your brand vision and product requirements — we&apos;ll handle the rest.</p>
            <Link href="/contact" className="btn btn-gold btn-lg mt-8">Private Label Inquiry</Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
