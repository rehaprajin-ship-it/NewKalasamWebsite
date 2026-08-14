import PageHero from '@/components/ui/PageHero';
/* ═══════════════════════════════════════════════════════════════
   Wholesale Page
   ═══════════════════════════════════════════════════════════════ */

import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  alternates: { canonical: `/wholesale` },
  title: 'Wholesale Camphor Supplier India — Bulk Pooja Products — Factory Pricing — Kalasam',
  description: 'Wholesale camphor supplier India — buy bulk camphor tablets, agarbathi, sambrani, and pooja items at direct factory-carton pricing. Serving wholesale stores, retailers, and dealers across Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, and all Indian states.'
};

const wholesaleAdvantages = [
  { title: 'Competitive Pricing', desc: 'Direct factory pricing with volume-based discounts up to 35%.', icon: '💰' },
  { title: 'Wide Product Range', desc: '50+ SKUs across camphor, sambrani, agarbathi, lamp oil, and temple supplies.', icon: '📦' },
  { title: 'Pan-India Shipping', desc: 'We ship to all states via trusted logistics partners with tracking.', icon: '🚚' },
  { title: 'Flexible MOQ', desc: 'Start with as little as 1 carton per SKU. Mix & match orders welcome.', icon: '📊' },
  { title: 'Credit Terms', desc: 'Flexible credit terms available for regular wholesale buyers.', icon: '🏦' },
  { title: 'Brand Support', desc: 'Marketing materials, display stands, and promotional support.', icon: '📢' },
];

export default function WholesalePage() {
  return (
    <div>
      <PageHero
        title="Wholesale & B2B Distribution"
        overline="Partnerships"
        description="Connect with our team to secure direct bulk factory pricing and regular wholesale supply chains across India."
        backgroundImage="/images/sections/warehouse.png"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader overline="Benefits" title="Wholesale Advantages" />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {wholesaleAdvantages.map((adv) => (
              <StaggerItem key={adv.title}>
                <div className="bg-gray-50 rounded-2xl p-7 h-full hover:shadow-medium hover:bg-white border border-transparent hover:border-gray-200 transition-all">
                  <span className="text-3xl mb-4 block">{adv.icon}</span>
                  <h3 className="text-lg font-600 text-gray-900 mb-2">{adv.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{adv.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Bulk Supply Products */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader overline="Bulk Offerings" title="Featured Wholesale & Industrial SKUs" subtitle="High-volume drum, tin, and carton formats ready for immediate wholesale dispatch." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <Link href="/products/kalasam-lamp-oil-210l-barrel" className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-medium hover:border-primary/20 transition-all group">
              <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-800 rounded-md uppercase mb-3">Bulk Drum / Barrel</span>
              <h4 className="font-700 text-gray-900 group-hover:text-primary transition-colors">Kalasam Lamp Oil 210L Barrel</h4>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">Direct drum-scale pure pooja lamp oil supply for wholesale distributors, repackaging operations, and large dealers.</p>
            </Link>
            <Link href="/products/kalasam-lamp-oil-16l-tin" className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-medium hover:border-primary/20 transition-all group">
              <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-800 rounded-md uppercase mb-3">Institutional Tin</span>
              <h4 className="font-700 text-gray-900 group-hover:text-primary transition-colors">Kalasam Lamp Oil 16L Tin</h4>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">16-litre tin packaging ideal for wholesale stockists catering to temple trusts, devasthanams, and retail supply.</p>
            </Link>
            <Link href="/products/kalasam-camphor-tablets-bulk" className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-medium hover:border-primary/20 transition-all group">
              <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-800 rounded-md uppercase mb-3">Bulk Camphor</span>
              <h4 className="font-700 text-gray-900 group-hover:text-primary transition-colors">Kalasam Camphor Tablets (Bulk)</h4>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">Half-kg and 1kg wholesale master packs in Big Round, Small Round, and Tablet-Shape options.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="heading-section text-3xl text-white">Get Wholesale Pricing</h2>
            <p className="mt-3 text-white/60 max-w-xl mx-auto">Contact our sales team for the current wholesale price list and terms.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn btn-gold btn-lg">Request Price List</Link>
              <Link href="/products" className="btn btn-lg bg-white/10 text-white border border-white/20 hover:bg-white/20">Browse Products</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
