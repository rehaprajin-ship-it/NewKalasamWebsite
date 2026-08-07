import PageHero from '@/components/ui/PageHero';
/* ═══════════════════════════════════════════════════════════════
   About Page — Our Story
   ═══════════════════════════════════════════════════════════════ */

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { COMPANY, COMPANY_STATS, COMPANY_TIMELINE } from '@/lib/constants';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  alternates: { canonical: `/about` },
  title: 'About Us — Our Story, Chemical Manufacturing Legacy & Team',
  description: `Discover the story of ${COMPANY.name} — a leading manufacturer and supplier of synthetic camphor and organic intermediates based in Theni, Tamil Nadu, supplying all states and districts of India.`,
  keywords: [
    'about Kalasam Jaikrishna Industries',
    'camphor manufacturing factory Tamil Nadu',
    'chemical industry legacy Theni',
    'industrial camphor supplier history India'
  ]
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Banner */}
      <PageHero
        title="Our Story"
        overline="About Us"
        description="Three decades of manufacturing excellence, innovation, and trust — from a humble beginning in Theni to global markets."
        backgroundImage="/images/hero/factory-campus.png"
      />

      {/* Company Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <div className="mb-6">
                  <Image
                    src="/images/logo.png"
                    alt="Kalasam Jaikrishna Industries Logo"
                    width={240}
                    height={80}
                    className="h-auto max-h-[80px] object-contain"
                    style={{ width: 'auto' }}
                  />
                </div>
                <span className="overline">Our Heritage</span>
                <h2 className="heading-section text-3xl sm:text-4xl text-gray-900 mt-4">
                  Building India&apos;s Camphor Legacy Since 1995
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="mt-6 text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">Kalasam Jaikrishna Industries</strong> was founded in 1995 in Theni, Tamil Nadu,
                  with a mission to manufacture the purest camphor products in India. What began as a small-scale traditional camphor
                  manufacturing unit has evolved into a diversified industrial chemicals and consumer products company.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="mt-4 text-gray-500 leading-relaxed">
                  Today, we are a leading manufacturer of synthetic camphor, D-camphor, isoborneol, camphor oil, and a comprehensive
                  range of pooja products. Our products are trusted by pharmaceutical companies, chemical manufacturers, exporters,
                  distributors, retailers, and temples across 17+ countries.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className="mt-4 text-gray-500 leading-relaxed">
                  Our commitment to quality is backed by ISO 9001:2015 certification, an in-house R&D laboratory, and a rigorous
                  quality management system that ensures every product meets international standards.
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal direction="right">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image src="/images/sections/logo-wall.png" alt="Jaikrishna Industries manufacturing facility and product showcase" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {COMPANY_STATS.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                light
                className="text-center"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader overline="Purpose" title="Mission & Vision" />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <StaggerItem>
              <div className="bg-white rounded-2xl p-8 border border-gray-200 h-full">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-700 text-gray-900 mb-3">Our Mission</h3>
                <p className="text-gray-500 leading-relaxed">
                  To manufacture the highest quality camphor and industrial chemicals while preserving India&apos;s rich tradition of
                  sacred products — delivering excellence to global markets through innovation, integrity, and customer-centric service.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white rounded-2xl p-8 border border-gray-200 h-full">
                <div className="w-14 h-14 rounded-xl bg-accent-dark flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-700 text-gray-900 mb-3">Our Vision</h3>
                <p className="text-gray-500 leading-relaxed">
                  To be recognized as a world-class chemical manufacturer and India&apos;s most trusted brand for camphor and
                  pooja products — setting global benchmarks in purity, sustainability, and manufacturing excellence.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-primary-dark">
        <div className="container-custom">
          <SectionHeader overline="Milestones" title="Our Journey" light />
          <div className="space-y-6 mt-4">
            {COMPANY_TIMELINE.map((ms, i) => (
              <ScrollReveal key={ms.year} delay={i * 0.05}>
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-accent font-800 text-xl">{ms.year}</span>
                  </div>
                  <div className="w-px bg-white/10 flex-shrink-0 relative">
                    <div className="w-3 h-3 rounded-full bg-accent absolute -left-[5px] top-1" />
                  </div>
                  <div className="pb-6">
                    <h3 className="text-white font-600 text-lg">{ms.title}</h3>
                    <p className="text-white/50 text-sm mt-1 leading-relaxed">{ms.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="heading-section text-3xl text-gray-900">Ready to Work With Us?</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">Contact our team for product inquiries, export quotations, or partnership opportunities.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn btn-primary">Contact Us</Link>
              <Link href="/products" className="btn btn-outline">Our Products</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
