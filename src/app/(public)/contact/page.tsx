'use client';

/* ═══════════════════════════════════════════════════════════════
   Contact Page — Multi-Tab Form + Company Info
   ═══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import ScrollReveal from '@/components/common/ScrollReveal';
import { COMPANY } from '@/lib/constants';
import { saveContact } from '@/lib/firestore';
import { sendEmailWithAutoReply } from '@/lib/emailjs';
import { useToast } from '@/context/ToastProvider';
import type { ContactFormData } from '@/types';
import PageHero from '@/components/ui/PageHero';

const departments = [
  { value: 'sales', label: 'Sales & Inquiries' },
  { value: 'export', label: 'Export Division' },
  { value: 'oem', label: 'OEM & Private Label' },
  { value: 'distributor', label: 'Distributor Network' },
  { value: 'support', label: 'Customer Support' },
  { value: 'careers', label: 'Careers' },
];

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    try {
      await saveContact(data);
      await sendEmailWithAutoReply({
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        company: data.company || 'N/A',
        subject: data.subject,
        message: data.message,
        department: data.department || 'sales',
      });
      showToast('Message sent successfully! We\'ll respond within 24 hours.');
      reset();
    } catch {
      showToast('Failed to send message. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHero
        title="Contact Us"
        overline="Get in Touch"
        description="Product inquiries, export quotations, OEM partnerships, or distributor applications — our team is ready to help."
        backgroundImage="/images/hero/factory-campus.png"
      />

      {/* Contact Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <ScrollReveal>
                <div className="mb-6">
                  <Image
                    src="/images/logo.png"
                    alt="Kalasam Jaikrishna Industries Logo"
                    width={200}
                    height={65}
                    className="h-auto max-h-[65px] object-contain"
                    style={{ width: 'auto' }}
                  />
                </div>
                <h2 className="heading-subsection text-2xl text-gray-900 mb-6">Company Information</h2>
              </ScrollReveal>

              <div className="space-y-6">
                {[
                  { icon: '📍', label: 'Address', value: COMPANY.location.address },
                  { icon: '📞', label: 'Phone', value: COMPANY.contact.phone, href: `tel:${COMPANY.contact.phone}` },
                  { icon: '📧', label: 'General', value: COMPANY.contact.email, href: `mailto:${COMPANY.contact.email}` },
                  { icon: '🌍', label: 'Export', value: COMPANY.contact.exportEmail, href: `mailto:${COMPANY.contact.exportEmail}` },
                  { icon: '🕐', label: 'Hours', value: COMPANY.businessHours },
                ].map((item) => (
                  <ScrollReveal key={item.label} delay={0.05}>
                    <div className="flex gap-4 items-start">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="text-xs font-600 uppercase tracking-wider text-gray-400 mb-1">{item.label}</div>
                        {item.href ? (
                          <a href={item.href} className="text-sm text-gray-700 hover:text-primary transition-colors">{item.value}</a>
                        ) : (
                          <p className="text-sm text-gray-700">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-10">
                  <h2 className="heading-subsection text-2xl text-gray-900 mb-2">Send Us a Message</h2>
                  <p className="text-sm text-gray-500 mb-8">Fill in the form below and we&apos;ll respond within 24 business hours.</p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-500 text-gray-700 mb-1.5">Full Name *</label>
                        <input {...register('name', { required: 'Name is required' })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="Your name" />
                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-500 text-gray-700 mb-1.5">Email Address *</label>
                        <input type="email" {...register('email', { required: 'Email is required' })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="you@company.com" />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-500 text-gray-700 mb-1.5">Phone Number *</label>
                        <input type="tel" {...register('phone', { required: 'Phone is required' })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="+91 98765 43210" />
                        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-500 text-gray-700 mb-1.5">Company</label>
                        <input {...register('company')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="Your company name" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-500 text-gray-700 mb-1.5">Department</label>
                        <select {...register('department')} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary">
                          {departments.map((d) => (
                            <option key={d.value} value={d.value}>{d.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-500 text-gray-700 mb-1.5">Subject *</label>
                        <input {...register('subject', { required: 'Subject is required' })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="How can we help?" />
                        {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-500 text-gray-700 mb-1.5">Message *</label>
                      <textarea {...register('message', { required: 'Message is required' })} rows={5} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary resize-none" placeholder="Tell us about your requirements..." />
                      {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
                    </div>

                    <button type="submit" disabled={submitting} className="btn btn-primary btn-lg w-full sm:w-auto">
                      {submitting ? 'Sending...' : 'Send Message'}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </button>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="pb-24 bg-gray-50">
        <div className="container-custom">
          <div className="bg-white p-4 rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden h-[450px]">
            <iframe
              title="Jaikrishna Industries Location Map"
              src="https://maps.google.com/maps?q=Telephone%20Nagar,%20Theni,%20Tamil%20Nadu%20625531,%20India&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              className="border-0 rounded-2xl"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
