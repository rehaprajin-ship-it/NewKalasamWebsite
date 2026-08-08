import PageHero from '@/components/ui/PageHero';

/* ═══════════════════════════════════════════════════════════════
   Retail Supply Page — For Shop Owners & Retail Store Buyers
   ═══════════════════════════════════════════════════════════════ */

import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaMarkup';
import { SITE_URL, COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  alternates: { canonical: `/retail-supply` },
  title: 'Camphor Supplier for Retail Shops | Pooja Items for Store Stock | Kalasam',
  description: 'Direct factory supply of camphor tablets, agarbathi, sambrani, and pooja items for retail shops. Low MOQ, fast restocking, and competitive shop-friendly pricing from Kalasam Jaikrishna Industries, Theni.',
  keywords: [
    'camphor supplier for shop',
    'pooja items supplier for retail store',
    'camphor tablets for retail shop India',
    'buy camphor for shop stock',
    'wholesale camphor supplier India',
    'pooja products wholesale supplier Tamil Nadu',
    'retail camphor supply Tamil Nadu',
    'camphor tablets retail pack',
  ],
};

const retailAdvantages = [
  { title: 'Low Minimum Orders', desc: 'Start stocking with as few as 5 cartons per SKU — perfect for small and medium retail shops.', icon: '📦' },
  { title: 'Fast Restocking', desc: 'Repeat orders dispatched within 24-48 hours. Never run out of your best-selling camphor and pooja items.', icon: '⚡' },
  { title: 'Shop-Ready Packaging', desc: 'Consumer-friendly retail packs (₹1, ₹2, ₹5, ₹10 MRP strips) ready to hang or display on your counter.', icon: '🏪' },
  { title: 'Competitive Margins', desc: 'Direct factory pricing means better margins for your shop compared to buying through multiple middlemen.', icon: '💰' },
  { title: 'Wide Product Range', desc: 'One supplier for camphor, agarbathi, sambrani, lamp oil, and rose water — simplify your procurement.', icon: '🛒' },
  { title: 'Dedicated Sales Support', desc: 'Assigned field representative for your area to handle orders, returns, and new product introductions.', icon: '🤝' },
];

const buyerHierarchy = [
  { tier: 'Retail Shop Owner', desc: 'You run a retail store and need regular stock of pooja items for your customers. MOQ: 5 cartons.', highlight: true },
  { tier: 'Wholesale Buyer', desc: 'You buy in larger volumes (50+ cartons) for redistribution to multiple shops or markets.', highlight: false },
  { tier: 'Distributor', desc: 'You hold exclusive territory rights and supply multiple wholesale and retail outlets in your region.', highlight: false },
  { tier: 'Super Stockist', desc: 'You operate at state or multi-district level, supplying distributors and large wholesale buyers.', highlight: false },
];

const retailFaqs = [
  { question: 'What is the minimum order for retail shop supply?', answer: 'You can start with as few as 5 cartons per SKU. We offer mix-and-match orders so you can stock multiple products in a single shipment without committing to large volumes of any single item.' },
  { question: 'How quickly can I get restocking orders?', answer: 'Repeat orders for stocked items are typically dispatched within 24-48 hours from our Theni factory. Delivery time depends on your location — most South Indian destinations receive within 3-5 business days.' },
  { question: 'Do you provide retail-ready packaging?', answer: 'Yes. Our camphor tablets come in ₹1, ₹2, ₹5, and ₹10 MRP-printed strips and pouches designed for counter display or hanging pegs. All products have consumer-facing branding and clear pricing.' },
  { question: 'Can I get credit terms as a retail buyer?', answer: 'Credit terms are available for established retail accounts with a consistent order history. New accounts typically start with advance payment, with credit facilities offered after 3-6 months of regular orders.' },
  { question: 'How is retail supply different from wholesale pricing?', answer: 'Retail supply is designed for smaller, more frequent orders at per-carton pricing. Wholesale pricing applies to larger volume commitments (50+ cartons). Both tiers get direct factory pricing — the difference is MOQ and volume-based discounts.' },
  { question: 'Which areas do you supply retail stores in?', answer: 'We supply retail shops across Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana, and other Indian states through our logistics network. Our field sales representatives cover major towns and cities for in-person order support.' },
];

export default function RetailSupplyPage() {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Retail Supply', url: `${SITE_URL}/retail-supply` },
  ];

  return (
    <div>
      <FAQSchema faqs={retailFaqs} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <PageHero
        title="Supply Your Retail Shop"
        overline="Retail Store Supply"
        description="Stock your shop with premium Kalasam camphor, agarbathi, sambrani, and pooja items — direct from the factory with low minimum orders and fast restocking."
        backgroundImage="/images/sections/warehouse.png"
      />

      {/* Advantages Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader overline="For Shop Owners" title="Why Source Directly From Kalasam?" />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {retailAdvantages.map((adv) => (
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

      {/* Buyer Hierarchy Explainer */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <SectionHeader overline="Which Tier Are You?" title="Understanding Our Buyer Tiers" subtitle="Not sure which category you fall into? Here's how our supply tiers work — most shop owners fall into the Retail tier." />
          <div className="space-y-4 mt-6">
            {buyerHierarchy.map((tier) => (
              <ScrollReveal key={tier.tier}>
                <div className={`rounded-xl p-6 border transition-all ${
                  tier.highlight
                    ? 'bg-primary/5 border-primary/30 ring-1 ring-primary/20'
                    : 'bg-white border-gray-200'
                }`}>
                  <div className="flex items-start gap-3">
                    {tier.highlight && (
                      <span className="mt-0.5 px-2 py-0.5 bg-primary text-white text-[10px] font-800 rounded-md uppercase tracking-wider flex-shrink-0">You</span>
                    )}
                    <div>
                      <h3 className="text-base font-700 text-gray-900">{tier.tier}</h3>
                      <p className="text-sm text-gray-500 mt-1">{tier.desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Product Highlights */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader overline="What You Can Stock" title="Popular Retail Products" subtitle="Our best-selling items that move fast on retail shelves." />
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">
            {[
              { name: 'Camphor Tablets', desc: '₹1 to ₹10 MRP retail strips', href: '/products?category=Pooja+Products' },
              { name: 'Bhimseni Camphor', desc: 'Premium pachi karpooram', href: '/products/bhimseni-pachi-karpooram' },
              { name: 'Cup Sambrani', desc: 'Ready-to-use dhoop cups', href: '/pooja-products' },
              { name: 'Agarbathi Sticks', desc: 'Hand-rolled incense', href: '/pooja-products' },
            ].map((item) => (
              <StaggerItem key={item.name}>
                <Link href={item.href} className="block bg-gray-50 rounded-xl p-5 text-center hover:shadow-medium hover:bg-white border border-transparent hover:border-primary/20 transition-all group">
                  <h4 className="font-700 text-gray-900 group-hover:text-primary transition-colors">{item.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <SectionHeader overline="Common Questions" title="Retail Supply FAQ" />
          <div className="space-y-4 mt-6">
            {retailFaqs.map((faq, idx) => (
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
            <h2 className="heading-section text-3xl text-white">Ready to Stock Your Shop?</h2>
            <p className="mt-3 text-white/60 max-w-xl mx-auto">Contact our retail sales team for the current product catalog, pricing, and MOQ details for your area.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn btn-gold btn-lg">Request Retail Pricing</Link>
              <Link href="/products" className="btn btn-lg bg-white/10 text-white border border-white/20 hover:bg-white/20">Browse Products</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
