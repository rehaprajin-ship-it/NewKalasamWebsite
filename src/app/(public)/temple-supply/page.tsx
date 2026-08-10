import PageHero from '@/components/ui/PageHero';

/* ═══════════════════════════════════════════════════════════════
   Temple Supply Page — Institutional/Temple Camphor & Pooja Supply
   ═══════════════════════════════════════════════════════════════ */

import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  alternates: { canonical: `/temple-supply` },
  title: 'Camphor Supplier for Temples | Bulk Pooja Items for Temple Trusts | Kalasam',
  description: 'Dedicated bulk camphor and pooja item supply for temples, religious institutions, and event organisers. Pure Bhimseni Camphor, clean-burning camphor tablets, sambrani, lamp oil — consistent quality for daily aarti and abhishekam.',
  keywords: [
    'camphor supplier for temples',
    'temple camphor bulk supply India',
    'pooja items supplier for temple trust',
    'Bhimseni camphor for temple',
    'camphor for aarti bulk order',
    'temple pooja items wholesale',
    'institutional camphor supply',
    'camphor for abhishekam bulk',
  ],
};

const templeAdvantages = [
  { title: 'Ritual-Grade Purity', desc: 'Our camphor burns clean with zero residue — essential for temple aarti and hawan. No synthetic additives or fillers.', icon: '🕉️' },
  { title: 'Consistent Quality', desc: 'Every batch is laboratory-tested for purity and sublimation. Temples receive the same premium quality, every single order.', icon: '🔬' },
  { title: 'Bulk Institutional Packing', desc: 'Large-format packing (5kg, 10kg, 25kg bags) designed for institutional consumption — not retail strips.', icon: '📦' },
  { title: 'Recurring Order Convenience', desc: 'Set up a standing monthly or quarterly order so your temple never runs out. Automatic dispatch on your schedule.', icon: '🔄' },
  { title: 'Pan-India Temple Network', desc: 'We supply 500+ temples and religious institutions across Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, and beyond.', icon: '🛕' },
  { title: 'GST-Compliant Invoicing', desc: 'Proper GST invoices for every order — essential for temple trusts, devasthanams, and institutional accounting.', icon: '📋' },
];

const templeProducts = [
  { name: 'Bhimseni Pachi Karpooram', desc: 'Pure natural camphor — the gold standard for temple aarti. Clean sublimation, divine fragrance.', href: '/products/bhimseni-pachi-karpooram', badge: 'Most Popular' },
  { name: 'Kalasam Camphor Tablets', desc: 'Refined camphor tablets in 15g, 20g, 30g, and 50g sizes. Burns clean, no residue.', href: '/products/category/pooja-products', badge: '' },
  { name: 'Cup Sambrani', desc: 'Natural benzoin resin dhoop cups. 20-30 minutes of purifying smoke for sanctum fumigation.', href: '/pooja-products', badge: '' },
  { name: 'Temple Lamp Oil', desc: 'Clean-burning sesame-based oil for temple deepam. Low smoke, steady flame, long burn time.', href: '/pooja-products', badge: '' },
];

const templeFaqs = [
  { question: 'What type of camphor is best for temple aarti?', answer: 'Bhimseni (Pachi) Karpooram is the traditional choice for temple aarti due to its natural origin, clean sublimation, and divine fragrance. For temples with very high daily consumption, our refined Kalasam Camphor Tablets (15g or 20g Big Round shape) offer excellent quality at a more economical scale.' },
  { question: 'What is the minimum order for temple supply?', answer: 'For institutional temple supply, we recommend a minimum order of 25-50 kg of camphor products per shipment to optimise logistics costs. However, we can accommodate smaller initial orders for temples evaluating our products for the first time.' },
  { question: 'Can we set up recurring monthly orders?', answer: 'Yes, absolutely. Many temples and devasthanams work with us on a standing monthly or quarterly order schedule. We dispatch automatically on your preferred dates so your supply is uninterrupted. Contact our temple supply team to set up a recurring arrangement.' },
  { question: 'Do you provide proper GST invoices?', answer: 'Yes, every order comes with a proper GST invoice. We understand that temple trusts, devasthanams, and religious endowments boards require formal invoicing for their accounting and audit compliance. We can also provide proforma invoices for budget approvals if needed.' },
  { question: 'Do you supply camphor for large religious events and festivals?', answer: 'Yes, we handle festival and event supply for large religious gatherings. For events like Karthigai Deepam, Maha Shivaratri, Navratri, and annual temple festivals, we recommend placing orders 2-3 weeks in advance to ensure sufficient stock and timely delivery.' },
  { question: 'Is there a difference between your temple camphor and retail camphor?', answer: 'The product quality is identical — our manufacturing process does not differentiate between temple and retail supply. The difference is in packaging (institutional bulk packs vs. consumer retail strips) and pricing (volume-based institutional pricing vs. per-unit retail pricing).' },
];

export default function TempleSupplyPage() {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Temple Supply', url: `${SITE_URL}/temple-supply` },
  ];

  return (
    <div>
      <FAQSchema faqs={templeFaqs} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <PageHero
        title="Temple & Institutional Supply"
        overline="Dedicated Temple Supply"
        description="Pure camphor, sambrani, lamp oil, and pooja essentials for temples, devasthanams, religious trusts, and large institutional buyers — consistent ritual-grade quality in every batch."
        backgroundImage="/images/sections/warehouse.png"
      />

      {/* Advantages */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader overline="Why Temples Choose Kalasam" title="Built for Institutional Supply" />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {templeAdvantages.map((adv) => (
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

      {/* Temple Product Highlights */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader overline="Temple Essentials" title="Products for Daily Worship" subtitle="Our most-ordered products for temple and institutional use." />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {templeProducts.map((p) => (
              <StaggerItem key={p.name}>
                <Link href={p.href} className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-medium hover:border-primary/20 transition-all group h-full">
                  {p.badge && (
                    <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-800 rounded-md uppercase mb-3">{p.badge}</span>
                  )}
                  <h4 className="font-700 text-gray-900 group-hover:text-primary transition-colors">{p.name}</h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">{p.desc}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl text-center">
          <ScrollReveal>
            <SectionHeader overline="Trusted Supply" title="Serving 500+ Temples Across South India" subtitle="From small neighbourhood temples to major devasthanams — our camphor powers daily worship across the region." />
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-3xl font-900 text-primary">500+</p>
                <p className="text-xs text-gray-500 mt-1">Temples Served</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-3xl font-900 text-primary">15+</p>
                <p className="text-xs text-gray-500 mt-1">Years of Supply</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-3xl font-900 text-primary">5</p>
                <p className="text-xs text-gray-500 mt-1">South Indian States</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <SectionHeader overline="Common Questions" title="Temple Supply FAQ" />
          <div className="space-y-4 mt-6">
            {templeFaqs.map((faq, idx) => (
              <ScrollReveal key={idx}>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-700 text-gray-900 text-sm">{faq.question}</h3>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">{faq.answer}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="heading-section text-3xl text-white">Request Temple Supply Pricing</h2>
            <p className="mt-3 text-white/60 max-w-xl mx-auto">Contact our dedicated temple supply team for institutional pricing, recurring order setup, and bulk pack options.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn btn-gold btn-lg">Request Institutional Pricing</Link>
              <Link href="/products" className="btn btn-lg bg-white/10 text-white border border-white/20 hover:bg-white/20">Browse Products</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
