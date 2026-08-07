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
  title: 'Wholesale Camphor & Pooja Products | Direct Factory Bulk Pricing | Kalasam',
  description: 'Purchase wholesale camphor tablets, agarbathi, sambrani, and ceremonial supplies at direct factory-carton pricing. Supplying retailers, dealers, and distributors across Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, and all Indian states.',
  keywords: [
    'wholesale camphor tablets India',
    'camphor dealers Tamil Nadu',
    'pooja products bulk distributor Chennai Madurai Coimbatore',
    'agarbathi wholesale price Karnataka Kerala',
    'sambrani wholesale supplier'
  ]
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
