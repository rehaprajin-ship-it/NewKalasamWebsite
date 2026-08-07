import PageHero from '@/components/ui/PageHero';
/* Certificates Page */
import type { Metadata } from 'next';
import ScrollReveal from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/certificates` },
  title: 'Certificates — ISO, FSSAI, GMP & Industry Certifications',
  description: 'View our ISO 9001:2015, FSSAI, GMP, IEC, and other industry certifications that validate our commitment to quality and compliance.',
};

/* Certification data with SEO-friendly descriptions */
const CERT_DETAILS = [
  {
    name: 'ISO 9001:2015',
    description: 'Our quality management system is ISO 9001:2015 certified, ensuring consistent product quality, documented processes, and continuous improvement across all manufacturing and export operations.',
    scope: 'Manufacturing, Quality Control, Export',
  },
  {
    name: 'FSSAI Certified',
    description: 'Food Safety and Standards Authority of India certification ensures our food-grade camphor and pooja products meet strict safety standards for consumer use in worship and traditional preparations.',
    scope: 'Food-grade Camphor, Pooja Products',
  },
  {
    name: 'GMP Certified',
    description: 'Good Manufacturing Practice certification validates that our production facility follows international hygiene, cleanliness, and process-control standards for chemical and consumer product manufacturing.',
    scope: 'All Product Lines',
  },
  {
    name: 'MSME Registered',
    description: 'Registered under the Ministry of Micro, Small and Medium Enterprises, Government of India — enabling access to government schemes, priority lending, and export promotion benefits.',
    scope: 'Business Entity',
  },
  {
    name: 'IEC Certificate',
    description: 'Import Export Code issued by the Directorate General of Foreign Trade (DGFT), authorizing Jaikrishna Industries to conduct international trade and export chemicals to 17+ countries.',
    scope: 'Export Operations',
  },
  {
    name: 'GST Registered',
    description: 'Goods and Services Tax registration ensures full tax compliance for domestic and interstate trade across all Indian states and union territories.',
    scope: 'All Sales — Domestic & Interstate',
  },
  {
    name: 'UDYAM Registered',
    description: 'UDYAM registration under the Government of India MSME portal, validating our status as a recognized manufacturing enterprise eligible for government procurement and export incentives.',
    scope: 'Business Entity',
  },
  {
    name: 'BIS Standards',
    description: 'Our products conform to Bureau of Indian Standards (BIS) quality norms, ensuring they meet the national benchmarks for chemical purity, safety, and labeling requirements.',
    scope: 'Industrial Chemicals, Consumer Products',
  },
];

export default function CertificatesPage() {
  return (
    <div>
      <PageHero
        title="Quality & ISO Certificates"
        overline="Accreditations"
        description="Review our official ISO, quality control compliance certifications, and industry memberships."
        backgroundImage="/images/hero/factory-campus.png"
      />

      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <SectionHeader
            overline="Accreditations"
            title="Our Certifications"
            subtitle="Every certification reflects our commitment to quality, safety, and regulatory compliance across manufacturing, export, and consumer product standards."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {CERT_DETAILS.map((cert) => (
              <ScrollReveal key={cert.name}>
                <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 hover:shadow-medium border border-gray-200 hover:border-primary/20 transition-all h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-700 text-gray-900">{cert.name}</h3>
                      <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{cert.description}</p>
                      <p className="text-xs text-primary/70 font-600 mt-3">Scope: {cert.scope}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
