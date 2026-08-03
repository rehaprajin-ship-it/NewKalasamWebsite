'use client';

/* ═══════════════════════════════════════════════════════════════
   FAQ Page — Accordion
   ═══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';

const faqCategories = [
  {
    name: 'Products',
    faqs: [
      { q: 'What grades of camphor do you manufacture?', a: 'We manufacture pharmaceutical-grade, industrial-grade, and food-grade synthetic camphor with purity levels from 96% to 99.9%. We also produce D-camphor, isoborneol (powder and flakes), and camphor oil.' },
      { q: 'What is the CAS number for your synthetic camphor?', a: 'Our synthetic camphor CAS number is 76-22-2 (DL-Camphor). D-Camphor CAS is 464-49-3. Isoborneol CAS is 10385-78-1.' },
      { q: 'What pooja products do you offer?', a: 'We offer camphor tablets, cup sambrani, computer sambrani, premium agarbathi (incense sticks), lamp oil, rose water, cotton wicks, and complete temple pooja kits.' },
      { q: 'Do you provide MSDS and COA for your products?', a: 'Yes, we provide Material Safety Data Sheets (MSDS), Certificate of Analysis (COA), and Technical Data Sheets (TDS) for all our industrial chemical products. COA is provided batch-wise.' },
    ],
  },
  {
    name: 'Export',
    faqs: [
      { q: 'Which countries do you export to?', a: 'We export to 17+ countries including Bangladesh, Sri Lanka, Malaysia, Singapore, Nepal, UAE, Saudi Arabia, Oman, Qatar, Kuwait, Indonesia, Vietnam, Thailand, Nigeria, Kenya, and the United States.' },
      { q: 'What is your minimum order quantity for export?', a: 'MOQ varies by product. For industrial chemicals, the typical MOQ is 1 MT (metric ton). For pooja products, the MOQ is usually 500-1000 cartons. Contact our export team for specific requirements.' },
      { q: 'What export documentation do you provide?', a: 'We provide commercial invoice, packing list, COA, MSDS, fumigation certificate, certificate of origin, and any additional documentation required by the destination country.' },
      { q: 'What are the payment terms for export orders?', a: 'We accept LC (Letter of Credit), TT (Telegraphic Transfer), and DA/DP terms. Payment terms are discussed based on order value and customer history.' },
    ],
  },
  {
    name: 'OEM & Private Label',
    faqs: [
      { q: 'Can you manufacture products with our brand name?', a: 'Yes, we offer both OEM manufacturing (your formulation) and private label services (our products, your brand). We handle packaging design, printing, and labeling.' },
      { q: 'What is the MOQ for private label orders?', a: 'Private label MOQ starts from 500 units for most pooja products and 100 kg for industrial chemicals. We offer flexible MOQs for new brands.' },
      { q: 'Can you develop custom formulations?', a: 'Yes, our R&D team can develop custom formulations based on your specifications. We have developed customized camphor grades, fragrance blends, and specialty products for clients.' },
    ],
  },
  {
    name: 'Distribution',
    faqs: [
      { q: 'How can I become a distributor?', a: 'Visit our Distributors page and fill out the application form. Our distribution team will review your application and contact you within 48 hours.' },
      { q: 'What territories are available?', a: 'We have distributor openings across multiple states in India. Contact us for the current list of available territories.' },
      { q: 'What support do you provide to distributors?', a: 'We provide exclusive territory rights, marketing materials, POS displays, product training, competitive margins, credit facility, and a dedicated account manager.' },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors">
        <span className="text-sm font-500 text-gray-900 pr-4">{q}</span>
        <svg className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div>
      <section className="relative bg-primary-dark py-20 lg:py-28">
        <div className="container-custom relative z-10 text-center">
          <span className="overline text-accent-light">Help Center</span>
          <h1 className="heading-display text-white text-4xl sm:text-5xl lg:text-6xl mt-4">FAQ</h1>
          <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
            Frequently asked questions about our products, exports, OEM services, and distributor partnerships.
          </p>
          <div className="accent-line accent-line-center mt-6" />
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          {faqCategories.map((cat) => (
            <div key={cat.name} className="mb-12 last:mb-0">
              <ScrollReveal>
                <h2 className="text-xl font-700 text-gray-900 mb-5 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-xs font-700">{cat.name.charAt(0)}</span>
                  {cat.name}
                </h2>
              </ScrollReveal>
              <div className="space-y-3">
                {cat.faqs.map((faq) => (
                  <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          ))}

          <ScrollReveal>
            <div className="mt-12 text-center bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-xl font-700 text-gray-900 mb-2">Still Have Questions?</h3>
              <p className="text-sm text-gray-500 mb-6">Our team is available Monday–Saturday, 9 AM – 6 PM IST.</p>
              <Link href="/contact" className="btn btn-primary">Contact Us</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
