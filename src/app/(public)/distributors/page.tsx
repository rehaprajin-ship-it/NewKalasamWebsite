'use client';
import PageHero from '@/components/ui/PageHero';

/* ═══════════════════════════════════════════════════════════════
   Distributors Page — Application Form
   ═══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { useToast } from '@/context/ToastProvider';
import type { DistributorFormData } from '@/types';
import { COMPANY } from '@/lib/constants';

const distributorBenefits = [
  { title: 'Exclusive Territory', desc: 'Protected sales territory with no overlapping distributors.', icon: '📍' },
  { title: 'Marketing Support', desc: 'POS materials, product displays, and co-branded marketing.', icon: '📢' },
  { title: 'Training Programs', desc: 'Product knowledge training and sales team development.', icon: '🎓' },
  { title: 'Competitive Margins', desc: 'Industry-best margins with volume-based incentives.', icon: '💰' },
  { title: 'Credit Facility', desc: 'Flexible credit terms for established distributors.', icon: '🏦' },
  { title: 'Dedicated Support', desc: 'Assigned account manager for order support and issue resolution.', icon: '🤝' },
];

export default function DistributorsPage() {
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DistributorFormData & { website_honeypot?: string }>();

  const onSubmit = async (data: DistributorFormData & { website_honeypot?: string }) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/distributor', {
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

      showToast('Application submitted! Our distribution team will contact you within 48 hours.');
      reset();
    } catch (err: any) {
      console.error('Distributor submission failed:', err);
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
      <PageHero
        title="Distributor Application"
        overline="Become a Partner"
        description="Join our wholesale distribution network across India. Expand your business with premium pooja brands."
        backgroundImage="/images/sections/warehouse.png"
      />

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader overline="Benefits" title="Why Distribute Kalasam Products?" />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {distributorBenefits.map((b) => (
              <StaggerItem key={b.title}>
                <div className="bg-gray-50 rounded-2xl p-7 h-full hover:shadow-medium transition-shadow">
                  <span className="text-3xl mb-4 block">{b.icon}</span>
                  <h3 className="text-lg font-600 text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <SectionHeader overline="Apply Now" title="Distributor Application" subtitle="Fill in the form below and our distribution team will review your application." />
          <ScrollReveal>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mt-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Honeypot field for spam prevention */}
                <input type="text" {...register('website_honeypot')} className="hidden" tabIndex={-1} autoComplete="off" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-500 text-gray-700 mb-1.5">Full Name *</label>
                    <input {...register('name', { required: 'Required' })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-500 text-gray-700 mb-1.5">Email *</label>
                    <input type="email" {...register('email', { required: 'Required' })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-500 text-gray-700 mb-1.5">Phone *</label>
                    <input type="tel" {...register('phone', { required: 'Required' })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-500 text-gray-700 mb-1.5">Company Name *</label>
                    <input {...register('company', { required: 'Required' })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-500 text-gray-700 mb-1.5">City *</label>
                    <input {...register('city', { required: 'Required' })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-500 text-gray-700 mb-1.5">State *</label>
                    <input {...register('state', { required: 'Required' })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-500 text-gray-700 mb-1.5">Desired Territory</label>
                    <input {...register('territory')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="Districts / regions" />
                  </div>
                  <div>
                    <label className="block text-sm font-500 text-gray-700 mb-1.5">GST Number</label>
                    <input {...register('gstNumber')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-500 text-gray-700 mb-1.5">Years in Distribution</label>
                    <input {...register('experience')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-500 text-gray-700 mb-1.5">Current Business</label>
                    <input {...register('currentBusiness')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="What do you currently distribute?" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-500 text-gray-700 mb-1.5">Investment Capacity</label>
                  <select {...register('investmentCapacity')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary">
                    <option value="">Select range</option>
                    <option value="1-5L">₹1 - 5 Lakh</option>
                    <option value="5-10L">₹5 - 10 Lakh</option>
                    <option value="10-25L">₹10 - 25 Lakh</option>
                    <option value="25L+">₹25 Lakh+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-500 text-gray-700 mb-1.5">Additional Message</label>
                  <textarea {...register('message')} rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary resize-none" />
                </div>
                <button type="submit" disabled={submitting} className="btn btn-primary btn-lg w-full">
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
