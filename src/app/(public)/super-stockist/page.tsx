'use client';

import PageHero from '@/components/ui/PageHero';

/* ═══════════════════════════════════════════════════════════════
   Super Stockist Page — SS Opportunity for FMCG Camphor
   ═══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { useForm } from 'react-hook-form';
import { useToast } from '@/context/ToastProvider';

const ssBenefits = [
  { title: 'State-Level Territory', desc: 'Operate across an entire state or multi-district zone with exclusive supply rights for Kalasam products.', icon: '🗺️' },
  { title: 'Higher Margin Tier', desc: 'SS margins are structured above distributor margins — you earn on every unit that moves through your territory.', icon: '📈' },
  { title: 'Direct Factory Relationship', desc: 'Work directly with our production and logistics teams. No intermediaries between you and the factory.', icon: '🏭' },
  { title: 'Marketing & Branding Support', desc: 'Co-branded POS materials, dealer boards, trade fair sponsorship, and digital marketing support in your territory.', icon: '📢' },
  { title: 'Dedicated Account Manager', desc: 'Your own point of contact at Kalasam for order management, market strategy, and issue resolution.', icon: '👤' },
  { title: 'Growing FMCG Category', desc: 'Camphor and pooja products are a ₹5,000+ crore market in India with consistent year-round demand.', icon: '🚀' },
];

const ssVsDistributor = [
  { aspect: 'Territory Size', ss: 'State or multi-district region', distributor: 'Single district or city' },
  { aspect: 'Supplies To', ss: 'Distributors, large wholesalers', distributor: 'Retailers, small wholesalers' },
  { aspect: 'Typical Investment', ss: '₹10-25 lakhs (warehouse + working capital)', distributor: '₹2-5 lakhs' },
  { aspect: 'Warehouse Requirement', ss: '2,000+ sq ft godown', distributor: '500+ sq ft storage' },
  { aspect: 'Margin Structure', ss: 'Higher per-unit margin', distributor: 'Standard distributor margin' },
  { aspect: 'Reporting', ss: 'Reports directly to factory', distributor: 'Reports to Super Stockist or factory' },
];

const ssFaqs = [
  { question: 'What exactly is a Super Stockist?', answer: 'A Super Stockist (SS) is a tier above a regular distributor in the Indian FMCG distribution hierarchy. You hold large inventory at the state or regional level and supply it to distributors and large wholesale buyers in your territory. Think of it as a regional hub between the manufacturer and the distributor network.' },
  { question: 'What investment is required to become a Super Stockist?', answer: 'Typical investment ranges from ₹10-25 lakhs depending on territory size. This covers initial stock, warehouse setup, and working capital. We work with you to structure comfortable payment terms for the initial investment.' },
  { question: 'Do I need a warehouse?', answer: 'Yes. Super Stockists need a minimum 2,000 sq ft godown/warehouse facility suitable for storing camphor and pooja products (dry, ventilated, away from heat sources). We can advise on storage requirements during the application process.' },
  { question: 'Which territories are currently available?', answer: 'We are actively looking for Super Stockists in several states including Kerala, Karnataka, Andhra Pradesh, Telangana, Maharashtra, Gujarat, and North Indian states. Contact us with your preferred territory and we will share availability.' },
  { question: 'I am already a distributor for another camphor company. Can I still apply?', answer: 'Yes, your existing distribution experience and infrastructure are valuable. We evaluate applications based on territory fit, infrastructure, and commitment. Existing FMCG distribution experience is a strong advantage.' },
  { question: 'How is this different from a regular distributorship?', answer: 'A Super Stockist operates at a higher level — you supply distributors rather than individual retailers. This means larger volumes, higher margins per unit, and a more strategic role in building the Kalasam brand in your region. See the comparison table above for a detailed breakdown.' },
];

type SSFormData = {
  name: string;
  company: string;
  phone: string;
  email: string;
  territory: string;
  warehouseSize: string;
  currentBusiness: string;
  investment: string;
  message: string;
  website_honeypot?: string;
};

export default function SuperStockistPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SSFormData>();

  const onSubmit = async (data: SSFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/super-stockist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          sourcePage: window.location.pathname,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Server error');
      }

      showToast('Application submitted! Our distribution head will contact you within 48 hours.');
      setSubmitted(true);
      reset();
    } catch (err: any) {
      console.error('Super stockist submission failed:', err);
      showToast(
        'Submission failed. Please call/WhatsApp us directly at +91 6383020848 or email jaikrishnaindustries1@gmail.com.',
        'error'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: ssFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kalasam.com' },
            { '@type': 'ListItem', position: 2, name: 'Super Stockist', item: 'https://www.kalasam.com/super-stockist' },
          ],
        }) }}
      />

      <PageHero
        title="Become a Super Stockist"
        overline="SS Opportunity"
        description="Partner with Kalasam as a Super Stockist — operate at the state level, supply distributors across your region, and build a high-margin FMCG business."
        backgroundImage="/images/sections/warehouse.png"
      />

      {/* Benefits Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader overline="SS Advantages" title="Why Become a Kalasam Super Stockist?" />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {ssBenefits.map((b) => (
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

      {/* SS vs Distributor Comparison */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <SectionHeader overline="Comparison" title="Super Stockist vs. Distributor" subtitle="Understand the key differences between these two partnership tiers." />
          <ScrollReveal>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-5 py-3 text-left font-700">Aspect</th>
                    <th className="px-5 py-3 text-left font-700">Super Stockist</th>
                    <th className="px-5 py-3 text-left font-700">Distributor</th>
                  </tr>
                </thead>
                <tbody>
                  {ssVsDistributor.map((row, idx) => (
                    <tr key={row.aspect} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-5 py-3 font-600 text-gray-900">{row.aspect}</td>
                      <td className="px-5 py-3 text-gray-700">{row.ss}</td>
                      <td className="px-5 py-3 text-gray-500">{row.distributor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <SectionHeader overline="Apply Now" title="Super Stockist Application" subtitle="Fill in the details below. Our distribution head will review your application and contact you within 48 hours." />

          {submitted ? (
            <ScrollReveal>
              <div className="mt-6 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-xl font-800 text-gray-900">Application Received</h3>
                <p className="text-sm text-gray-600 mt-2">Thank you for your interest. Our distribution head will review your application and contact you within 48 hours to discuss territory availability and next steps.</p>
                <Link href="/products" className="btn btn-primary btn-sm mt-6 inline-block">Browse Our Products</Link>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <div className="bg-white rounded-2xl border border-gray-200 p-8 mt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Honeypot field for spam prevention */}
                  <input type="text" {...register('website_honeypot')} className="hidden" tabIndex={-1} autoComplete="off" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-500 text-gray-700 mb-1.5">Full Name *</label>
                      <input {...register('name', { required: true })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-primary" />
                      {errors.name && <p className="text-xs text-red-500 mt-1">Required</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-500 text-gray-700 mb-1.5">Company / Firm Name *</label>
                      <input {...register('company', { required: true })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-primary" />
                      {errors.company && <p className="text-xs text-red-500 mt-1">Required</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-500 text-gray-700 mb-1.5">Phone / WhatsApp *</label>
                      <input {...register('phone', { required: true })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-primary" />
                      {errors.phone && <p className="text-xs text-red-500 mt-1">Required</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-500 text-gray-700 mb-1.5">Email *</label>
                      <input type="email" {...register('email', { required: true })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-primary" />
                      {errors.email && <p className="text-xs text-red-500 mt-1">Required</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-500 text-gray-700 mb-1.5">Preferred Territory / State *</label>
                      <input {...register('territory', { required: true })} placeholder="e.g. Kerala, Karnataka" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-primary" />
                      {errors.territory && <p className="text-xs text-red-500 mt-1">Required</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-500 text-gray-700 mb-1.5">Warehouse / Godown Size</label>
                      <input {...register('warehouseSize')} placeholder="e.g. 3,000 sq ft" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-primary" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-500 text-gray-700 mb-1.5">Current Business / Products Handled</label>
                      <input {...register('currentBusiness')} placeholder="e.g. FMCG distribution" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-500 text-gray-700 mb-1.5">Investment Capacity</label>
                      <select {...register('investment')} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-primary bg-white">
                        <option value="">Select range</option>
                        <option value="5-10 lakhs">₹5-10 lakhs</option>
                        <option value="10-15 lakhs">₹10-15 lakhs</option>
                        <option value="15-25 lakhs">₹15-25 lakhs</option>
                        <option value="25+ lakhs">₹25+ lakhs</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-500 text-gray-700 mb-1.5">Additional Information</label>
                    <textarea rows={4} {...register('message')} placeholder="Tell us about your distribution experience, existing network, or any questions..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-primary resize-none" />
                  </div>
                  <button type="submit" disabled={submitting} className="w-full py-3 bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white rounded-xl text-sm font-700 shadow-md transition-colors cursor-pointer">
                    {submitting ? 'Submitting...' : 'Submit Super Stockist Application'}
                  </button>
                </form>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <SectionHeader overline="Common Questions" title="Super Stockist FAQ" />
          <div className="space-y-4 mt-6">
            {ssFaqs.map((faq, idx) => (
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
    </div>
  );
}
