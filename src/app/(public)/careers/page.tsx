'use client';

import PageHero from '@/components/ui/PageHero';

/* ═══════════════════════════════════════════════════════════════
   Careers Page — Field Sales + General Openings + JobPosting Schema
   Separate application form (NOT the product inquiry system)
   ═══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { useForm } from 'react-hook-form';
import { useToast } from '@/context/ToastProvider';
import { saveContact } from '@/lib/firestore';
import { COMPANY, SITE_URL } from '@/lib/constants';

const openings = [
  {
    title: 'Field Sales Executive / Line Salesman',
    dept: 'Sales — Route Sales',
    location: 'Tamil Nadu, Kerala, Karnataka, Andhra Pradesh',
    type: 'Full-time',
    featured: true,
    description: 'Join our growing field sales team as a Line Salesman. You will manage a route covering retail shops, wholesale stores, and small distributors in your assigned territory — introducing Kalasam camphor, agarbathi, sambrani, and pooja products to new outlets and servicing existing ones.',
    responsibilities: [
      'Visit 15-25 retail shops daily on your assigned route',
      'Introduce new products and take orders from shop owners',
      'Maintain relationships with existing retail and wholesale customers',
      'Collect market feedback and competitor intelligence',
      'Meet monthly sales targets and expand coverage area',
      'Coordinate with distribution team for timely delivery',
    ],
    requirements: [
      '1-3 years of FMCG field sales experience preferred (freshers with two-wheeler considered)',
      'Own two-wheeler with valid driving license',
      'Good communication skills in Tamil (and local language for non-TN territories)',
      'Willingness to travel daily within assigned territory',
      'Basic smartphone usage for order reporting',
    ],
    compensation: 'Salary + Incentive (performance-based). Petrol allowance and phone reimbursement provided.',
  },
  { title: 'Production Supervisor', dept: 'Manufacturing', location: 'Theni, Tamil Nadu', type: 'Full-time', featured: false },
  { title: 'Quality Control Chemist', dept: 'QC Laboratory', location: 'Theni, Tamil Nadu', type: 'Full-time', featured: false },
  { title: 'Export Documentation Executive', dept: 'Export Division', location: 'Theni, Tamil Nadu', type: 'Full-time', featured: false },
  { title: 'Digital Marketing Executive', dept: 'Marketing', location: 'Remote / Theni', type: 'Full-time', featured: false },
];

type JobApplicationData = {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  currentLocation: string;
  experience: string;
  preferredTerritory: string;
  currentRole: string;
  message: string;
  website_honeypot?: string;
};

export default function CareersPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<JobApplicationData>();

  const onSubmit = async (data: JobApplicationData) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/careers', {
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

      showToast('Application submitted! Our HR team will contact you soon.');
      setSubmitted(true);
      reset();
    } catch (err: any) {
      console.error('Career application submission failed:', err);
      showToast(
        'Submission failed. Please call/WhatsApp us directly at +91 6383020848 or email jaikrishnaindustries1@gmail.com.',
        'error'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // JobPosting schema for Google Jobs
  const jobPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: 'Field Sales Executive / Line Salesman',
    description: 'Join Kalasam Jaikrishna Industries as a Field Sales Executive (Line Salesman). Manage a daily route covering retail shops, wholesale stores, and small distributors in your assigned territory — introducing Kalasam camphor, agarbathi, sambrani, and pooja products to new outlets and servicing existing ones. Salary + Incentive with petrol allowance.',
    datePosted: '2026-08-01',
    validThrough: '2027-02-01',
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Kalasam Jaikrishna Industries',
      sameAs: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Telephone Nagar',
        addressLocality: 'Theni',
        addressRegion: 'Tamil Nadu',
        postalCode: '625531',
        addressCountry: 'IN',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: {
        '@type': 'QuantitativeValue',
        minValue: 12000,
        maxValue: 25000,
        unitText: 'MONTH',
      },
    },
    experienceRequirements: {
      '@type': 'OccupationalExperienceRequirements',
      monthsOfExperience: 12,
    },
    qualifications: 'Own two-wheeler with valid driving license. Good communication skills.',
    industry: 'FMCG / Consumer Goods',
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'India',
    },
  };

  const featuredJob = openings.find((j) => j.featured)!;

  return (
    <div>
      {/* JobPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Careers', item: `${SITE_URL}/careers` },
          ],
        }) }}
      />

      <PageHero
        title="Careers & Openings"
        overline="Join Our Team"
        description="Build your career at Kalasam Jaikrishna Industries. We're hiring field sales executives, production staff, quality chemists, and more."
        backgroundImage="/images/hero/factory-campus.png"
      />

      {/* Featured Role — Field Sales Executive */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <SectionHeader overline="🔥 Now Hiring" title="Field Sales Executive / Line Salesman" subtitle="Our most in-demand role — we're expanding our route sales network across South India." />
          <ScrollReveal>
            <div className="mt-6 bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="px-3 py-1 bg-primary text-white rounded-lg font-700">Full-time</span>
                <span className="px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-lg font-600">Tamil Nadu, Kerala, Karnataka, AP</span>
                <span className="px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-lg font-600">Salary + Incentive</span>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">{featuredJob.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-800 text-gray-900 uppercase tracking-wider mb-3">What You&apos;ll Do</h4>
                  <ul className="space-y-2">
                    {featuredJob.responsibilities?.map((r, i) => (
                      <li key={i} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-primary flex-shrink-0">•</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-800 text-gray-900 uppercase tracking-wider mb-3">What You Need</h4>
                  <ul className="space-y-2">
                    {featuredJob.requirements?.map((r, i) => (
                      <li key={i} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-primary flex-shrink-0">✓</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h4 className="text-xs font-800 text-gray-900 uppercase tracking-wider mb-1">Compensation</h4>
                <p className="text-sm text-gray-700">{featuredJob.compensation}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Application Form — Separate from product inquiry */}
      <section className="section-padding bg-gray-50" id="apply">
        <div className="container-custom max-w-3xl">
          <SectionHeader overline="Apply Now" title="Field Sales Application" subtitle="Fill in the form below. Our HR team will review and contact shortlisted candidates. You can also send your details via WhatsApp." />

          {submitted ? (
            <ScrollReveal>
              <div className="mt-6 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-xl font-800 text-gray-900">Application Received</h3>
                <p className="text-sm text-gray-600 mt-2">Thank you for applying. Our HR team will review your application and contact shortlisted candidates within 5-7 working days.</p>
                <a
                  href={`https://wa.me/${COMPANY.contact.whatsapp}?text=Hi, I just applied for the Field Sales Executive position on your website.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm mt-6 inline-block"
                >
                  Follow Up on WhatsApp
                </a>
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
                      <label className="block text-sm font-500 text-gray-700 mb-1.5">Phone Number *</label>
                      <input {...register('phone', { required: true })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-primary" />
                      {errors.phone && <p className="text-xs text-red-500 mt-1">Required</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-500 text-gray-700 mb-1.5">WhatsApp Number</label>
                      <input {...register('whatsapp')} placeholder="If different from phone" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-500 text-gray-700 mb-1.5">Email *</label>
                      <input type="email" {...register('email', { required: true })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-primary" />
                      {errors.email && <p className="text-xs text-red-500 mt-1">Required</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-500 text-gray-700 mb-1.5">Current Location *</label>
                      <input {...register('currentLocation', { required: true })} placeholder="e.g. Madurai, Tamil Nadu" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-primary" />
                      {errors.currentLocation && <p className="text-xs text-red-500 mt-1">Required</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-500 text-gray-700 mb-1.5">Years of Sales Experience</label>
                      <select {...register('experience')} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-primary bg-white">
                        <option value="">Select</option>
                        <option value="Fresher">Fresher</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5+ years">5+ years</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-500 text-gray-700 mb-1.5">Preferred Territory</label>
                      <input {...register('preferredTerritory')} placeholder="e.g. Madurai & surrounding districts" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-500 text-gray-700 mb-1.5">Current Role / Company</label>
                      <input {...register('currentRole')} placeholder="e.g. Sales Rep at XYZ FMCG" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-500 text-gray-700 mb-1.5">Tell Us About Yourself</label>
                    <textarea rows={4} {...register('message')} placeholder="Your sales experience, why you're interested, any relevant details..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-primary resize-none" />
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-xs text-gray-500">
                    <strong>Resume:</strong> You can send your resume via WhatsApp to{' '}
                    <a href={`https://wa.me/${COMPANY.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-primary font-600 underline">
                      +{COMPANY.contact.whatsapp}
                    </a>{' '}
                    or email to <a href="mailto:careers@kalasam.com" className="text-primary font-600 underline">careers@kalasam.com</a> after submitting this form.
                  </div>
                  <button type="submit" disabled={submitting} className="w-full py-3 bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white rounded-xl text-sm font-700 shadow-md transition-colors cursor-pointer">
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Other Openings */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <SectionHeader overline="Other Roles" title="Additional Openings" />
          <div className="space-y-4 mt-4">
            {openings.filter((j) => !j.featured).map((job) => (
              <ScrollReveal key={job.title}>
                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-medium hover:bg-white border border-transparent hover:border-gray-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-600 text-gray-900">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                      <span>{job.dept}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <Link href="/contact" className="btn btn-primary btn-sm flex-shrink-0">Apply</Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.2}>
            <div className="mt-10 text-center bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-700 text-gray-900 mb-2">Don&apos;t See Your Role?</h3>
              <p className="text-sm text-gray-500 mb-6">Send us your resume and we&apos;ll keep it on file for future opportunities.</p>
              <Link href="mailto:careers@kalasam.com" className="btn btn-outline">Send Resume</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
