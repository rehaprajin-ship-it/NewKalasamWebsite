/* ═══════════════════════════════════════════════════════════════
   Pooja Products Page
   ═══════════════════════════════════════════════════════════════ */

import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import Link from 'next/link';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  alternates: { canonical: `/pooja-products` },
  title: 'Pooja Products Wholesale | Camphor Tablets, Sambrani & Agarbathi',
  description: 'Premium ceremonial pooja products including pure camphor tablets, hand-rolled agarbathi, cup sambrani, and rose water. Manufactured in Theni, Tamil Nadu for distributors in Kerala, Karnataka, Andhra Pradesh, and India.',
  keywords: [
    'pure camphor tablets wholesale Tamil Nadu',
    'cup sambrani manufacturer India',
    'hand-rolled agarbathi supplier Kerala Karnataka',
    'temple pooja items bulk distributor',
    'Theni incense stick manufacturing factory'
  ]
};

const products = [
  { name: 'Camphor Tablets', desc: '99.9% pure refined camphor — burns clean with zero residue. Available in ₹1, ₹2, ₹5, ₹10, 15g-50g packs.', icon: '🕯️', slug: 'kalasam-camphor-tablets', badge: 'Bestseller' },
  { name: 'Cup Sambrani', desc: 'Natural benzoin resin sambrani cups — 20-30 mins of divine fragrance. Just light and enjoy.', icon: '🌿', slug: 'kalasam-cup-sambrani', badge: 'Popular' },
  { name: 'Computer Sambrani', desc: 'Traditional block sambrani for home fumigation and spiritual atmosphere.', icon: '🏠', slug: 'kalasam-computer-sambrani' },
  { name: 'Premium Agarbathi', desc: 'Hand-rolled incense sticks in Sandalwood, Jasmine, Rose, and traditional blends.', icon: '🪔', slug: 'kalasam-premium-agarbathi' },
  { name: 'Lamp Oil', desc: 'Clean-burning sesame-based lamp oil for daily deepam. Low smoke, steady flame.', icon: '💧', slug: 'temple-dharisana-lamp-oil' },
  { name: 'Rose Water', desc: '100% steam-distilled pure rose water for abhishekam, prasad, and skincare.', icon: '🌹', slug: 'kalasam-rose-water' },
  { name: 'Cotton Wicks', desc: 'Pure cotton wicks for oil lamps — hand-rolled, even burning.', icon: '🧵' },
  { name: 'Temple Pooja Kit', desc: 'Complete kit — camphor, agarbathi, lamp oil, wicks, sambrani in a premium gift box.', icon: '🎁', slug: 'kalasam-temple-pooja-kit' },
];

import PageHero from '@/components/ui/PageHero';

export default function PoojaProductsPage() {
  return (
    <div>
      <PageHero
        title="Pooja Products"
        overline="Traditional Range"
        description="Sacred traditions, modern quality — premium pooja essentials for temples, homes, and devotional stores."
        backgroundImage="/images/hero/pooja-temple.png"
      />

      <section className="section-padding bg-cream">
        <div className="container-custom">
          <SectionHeader overline="Our Range" title="Complete Pooja Essentials" subtitle="Every product crafted with devotion and manufactured to the highest quality standards." />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {products.map((prod) => (
              <StaggerItem key={prod.name}>
                <div className="bg-white rounded-2xl p-6 h-full hover:shadow-medium border border-gray-200 hover:border-primary/20 transition-all group relative">
                  {prod.badge && (
                    <span className="absolute top-4 right-4 px-2 py-1 bg-accent text-white text-[10px] font-600 rounded">{prod.badge}</span>
                  )}
                  <span className="text-4xl mb-4 block">{prod.icon}</span>
                  <h3 className="text-lg font-600 text-gray-900 group-hover:text-primary transition-colors mb-2">{prod.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{prod.desc}</p>
                  {prod.slug && (
                    <Link href={`/products/${prod.slug}`} className="text-sm font-500 text-primary hover:underline inline-flex items-center gap-1">
                      View Details
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader overline="Business" title="Wholesale & Distribution" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {[
              { title: 'Wholesale Pricing', desc: 'Competitive carton-wise pricing for retailers and wholesale dealers.', href: '/wholesale' },
              { title: 'Distributor Network', desc: 'Join our growing distributor network across India. Exclusive territories available.', href: '/distributors' },
              { title: 'Private Label', desc: 'Your brand name on our quality products. Custom packaging available.', href: '/private-label' },
            ].map((item) => (
              <ScrollReveal key={item.title}>
                <Link href={item.href} className="block bg-gray-50 rounded-2xl p-7 hover:shadow-medium hover:bg-white border border-transparent hover:border-gray-200 transition-all group h-full">
                  <h3 className="text-lg font-600 text-gray-900 group-hover:text-primary transition-colors mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.desc}</p>
                  <span className="text-sm font-500 text-primary">Learn More →</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
