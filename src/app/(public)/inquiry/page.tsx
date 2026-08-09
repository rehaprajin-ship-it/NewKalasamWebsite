'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useInquiry } from '@/context/InquiryContext';
import { COMPANY } from '@/lib/constants';

const inquiryFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(2, 'Company name is required'),
  country: z.string().min(2, 'Target country is required'),
  email: z.string().email('Invalid business email address'),
  phone: z.string().min(5, 'Contact number is required'),
  whatsapp: z.string().optional(),
  message: z.string().min(10, 'Please describe any custom specs or delivery requirements'),
  website_honeypot: z.string().optional(),
});

type InquiryFormData = z.infer<typeof inquiryFormSchema>;

export default function ConsolidatedInquiryPage() {
  const { items, removeItem, updateQuantity, clearList } = useInquiry();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquiryFormSchema)
  });

  const onSubmit = async (data: InquiryFormData) => {
    if (items.length === 0) {
      alert('Your inquiry list is empty. Please add products first.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          items,
          sourcePage: window.location.pathname,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Server error');
      }

      setIsSubmitted(true);
      clearList();
      reset();
    } catch (err: any) {
      alert(`Failed to submit inquiry: ${err.message}. Please reach out directly on WhatsApp at +91 6383020848.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white border border-gray-200 p-8 rounded-2xl shadow-md text-center space-y-5">
          <div className="w-16 h-16 bg-green-100 text-primary rounded-full flex items-center justify-center mx-auto text-3xl">
            ✓
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-900 text-gray-900 tracking-tight">Inquiry Received</h2>
            <p className="text-sm text-gray-600">
              Thank you. Your bulk inquiry has been received. Our sales and export division will contact you within 1-2 business days with detailed quotation terms.
            </p>
          </div>
          <div className="pt-4 space-y-2">
            <a
              href={`https://wa.me/${COMPANY.contact.whatsapp}?text=Hi,%20I%20just%20submitted%20a%20bulk%2520inquiry%20on%20your%20website.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-700 block transition-all shadow-xs"
            >
              Direct WhatsApp Follow-up
            </a>
            <Link
              href="/products"
              className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-xs font-700 block transition-all"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-900 text-gray-900 tracking-tight">Request Quotation</h1>
          <p className="text-sm text-gray-500 mt-2">
            Confirm your selected products and quantities, and submit one single consolidated quote request.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inquiry List Summary */}
          <div className="lg:col-span-1 bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-5 h-fit">
            <h3 className="font-800 text-gray-900 text-sm border-b border-gray-100 pb-2">Your Items</h3>

            {items.length === 0 ? (
              <div className="text-center py-6 space-y-3">
                <p className="text-xs text-gray-400">No items selected.</p>
                <Link
                  href="/products"
                  className="px-4 py-2 bg-primary text-white text-xs font-700 rounded-lg inline-block"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 justify-between items-start text-xs border-b border-gray-55 pb-3">
                    <div className="min-w-0">
                      <h4 className="font-850 text-gray-900 truncate leading-tight">{item.productName}</h4>
                      {item.variantName && <p className="text-[10px] text-gray-500 font-600 mt-0.5">Option: {item.variantName}</p>}
                      <span className="text-[9px] font-mono text-gray-400 mt-1 block">SKU: {item.sku}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                        className="w-20 px-2 py-0.5 border border-gray-200 rounded-md text-xs font-700 text-right text-gray-950 focus:outline-hidden"
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[10px] text-red-500 hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
            <h3 className="font-800 text-gray-900 text-base border-b border-gray-100 pb-3 mb-5">
              Contact & Logistics Info
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Honeypot field for spam prevention */}
              <input type="text" {...register('website_honeypot')} className="hidden" tabIndex={-1} autoComplete="off" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-800 uppercase tracking-wider text-gray-400 block">Name *</label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-950 placeholder-gray-400 focus:outline-hidden"
                  />
                  {errors.name && <p className="text-[10px] text-red-500 font-600">{errors.name.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-800 uppercase tracking-wider text-gray-400 block">Company Name *</label>
                  <input
                    type="text"
                    {...register('company')}
                    placeholder="Registered Legal Company Name"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-950 placeholder-gray-400 focus:outline-hidden"
                  />
                  {errors.company && <p className="text-[10px] text-red-500 font-600">{errors.company.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-800 uppercase tracking-wider text-gray-400 block">Email *</label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="business@company.com"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-955 placeholder-gray-400 focus:outline-hidden"
                  />
                  {errors.email && <p className="text-[10px] text-red-500 font-600">{errors.email.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-800 uppercase tracking-wider text-gray-400 block">Destination Country *</label>
                  <input
                    type="text"
                    {...register('country')}
                    placeholder="e.g. USA, UAE, Germany"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-950 placeholder-gray-400 focus:outline-hidden"
                  />
                  {errors.country && <p className="text-[10px] text-red-500 font-600">{errors.country.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-800 uppercase tracking-wider text-gray-400 block">Phone Number *</label>
                  <input
                    type="text"
                    {...register('phone')}
                    placeholder="+1 555-0199"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-950 placeholder-gray-400 focus:outline-hidden"
                  />
                  {errors.phone && <p className="text-[10px] text-red-500 font-600">{errors.phone.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-800 uppercase tracking-wider text-gray-400 block">WhatsApp (Optional)</label>
                  <input
                    type="text"
                    {...register('whatsapp')}
                    placeholder="WhatsApp contact info"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-955 placeholder-gray-400 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-800 uppercase tracking-wider text-gray-400 block">Inquiry Message *</label>
                <textarea
                  rows={4}
                  {...register('message')}
                  placeholder="Detail any specific purity grades, customs regulations, delivery schedules, or port shipping instructions needed..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-950 placeholder-gray-400 focus:outline-hidden resize-none"
                />
                {errors.message && <p className="text-[10px] text-red-500 font-600">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full py-3 bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white rounded-xl text-xs font-700 shadow-md transition-colors cursor-pointer"
              >
                {isSubmitting ? 'Submitting request...' : 'Submit Consolidated Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
