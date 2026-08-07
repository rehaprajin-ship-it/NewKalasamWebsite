import PageHero from '@/components/ui/PageHero';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import { INDUSTRIES } from '@/lib/constants';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  alternates: { canonical: `/industries-we-serve` },
  title: 'Industries We Serve — Sector Applications',
  description: 'Our chemicals and products serve pharmaceutical, fragrance, cosmetics, food, temple, household, and polymer industries worldwide.',
};

export default function IndustriesWeServePage() {
  return (
    <div>
      <PageHero
        title="Industries We Serve"
        overline="Global Impact"
        description="Powering incense, pharmaceutical, paint, rubber, cosmetics, and fragrance industries worldwide."
        backgroundImage="/images/hero/factory-campus.png"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="space-y-8">
            {INDUSTRIES.map((ind, i) => (
              <ScrollReveal key={ind.name} delay={i * 0.05}>
                <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-medium transition-shadow border border-gray-200">
                  <div className="flex items-start gap-6">
                    <span className="text-5xl flex-shrink-0">{ind.icon}</span>
                    <div>
                      <h3 className="text-xl font-700 text-gray-900">{ind.name}</h3>
                      <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-2xl">{ind.description}</p>
                      <Link href="/products" className="inline-flex items-center gap-1.5 text-sm font-500 text-primary mt-4 hover:underline">
                        View Products
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="heading-section text-3xl text-white">Need a Product for Your Industry?</h2>
            <p className="mt-3 text-white/60 max-w-xl mx-auto">Tell us your application requirements and we&apos;ll recommend the right product.</p>
            <Link href="/contact" className="btn btn-gold btn-lg mt-8">Get Recommendations</Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
