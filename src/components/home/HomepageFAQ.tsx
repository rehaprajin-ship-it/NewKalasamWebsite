'use client';

/* ═══════════════════════════════════════════════════════════════
   Homepage FAQ — Common Questions Section
   Direct Q&A visible on homepage for AI answer engine extraction
   ═══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/common/ScrollReveal';

const homepageFaqs = [
  {
    question: 'What is synthetic camphor, and how is it used?',
    answer:
      'Synthetic camphor is a manufactured alternative to natural camphor, produced from alpha-pinene through a multi-step chemical process. You can use it across pharmaceutical formulations, fragrance compounding, cellulose plasticization, and religious ceremonies. Our facility processes over 500 metric tons of synthetic camphor annually, meeting ISO 9001:2015 quality standards.',
  },
  {
    question: 'Do you supply camphor and pooja products in bulk?',
    answer:
      'Yes — we are a direct-from-factory bulk manufacturer. You can order camphor tablets, agarbathi, cup sambrani, lamp oil, and rose water in wholesale quantities. We offer flexible packaging from 1 kg retail packs to 30 kg industrial bags. Minimum order quantities vary by product; contact our sales team for a custom quote.',
  },
  {
    question: 'Which countries do you export to?',
    answer:
      'We export to over 17 countries, including Bangladesh, Sri Lanka, Malaysia, Singapore, UAE, Saudi Arabia, Oman, Qatar, Kuwait, Nigeria, Kenya, and the United States. All shipments comply with international packaging standards (ISPM-15), and we provide full export documentation including COA, MSDS, and phytosanitary certificates.',
  },
  {
    question: 'How can I become a distributor or super stockist?',
    answer:
      'We actively appoint distributors and super stockists across India. As a distributor, you get exclusive territory rights, marketing support, and competitive trade margins. Visit our Distributors page to submit your application, or call us directly at +91 6383020848. We typically respond within 48 hours.',
  },
  {
    question: 'What quality certifications does Jaikrishna Industries hold?',
    answer:
      'Our manufacturing facility holds ISO 9001:2015 certification for quality management systems. Every batch undergoes in-house laboratory testing for purity, sublimation rate, and moisture content. We provide Certificates of Analysis (COA) and Material Safety Data Sheets (MSDS) with every industrial shipment, per international B2B buyer requirements.',
  },
];

export default function HomepageFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-custom">
        <SectionHeader
          overline="Common Questions"
          title="Frequently Asked Questions"
          subtitle="Quick answers to the most common questions from our buyers, distributors, and export partners."
        />

        <div className="max-w-3xl mx-auto">
          {homepageFaqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <div className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-start justify-between py-5 text-left group"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-base sm:text-lg font-700 text-gray-900 pr-8 group-hover:text-primary transition-colors">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 mt-1 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 pb-5' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10">
            <Link href="/faq" className="btn btn-outline">
              View All FAQs
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
