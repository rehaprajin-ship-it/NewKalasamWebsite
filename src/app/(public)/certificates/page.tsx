/* Certificates Page */
import type { Metadata } from 'next';
import ScrollReveal from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { CERTIFICATIONS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Certificates — ISO, FSSAI, GMP & Industry Certifications',
  description: 'View our ISO 9001:2015, FSSAI, GMP, IEC, and other industry certifications that validate our commitment to quality and compliance.',
};

export default function CertificatesPage() {
  return (
    <div>
      <section className="relative bg-primary-dark py-20 lg:py-28">
        <div className="container-custom relative z-10 text-center">
          <span className="overline text-accent-light">Compliance</span>
          <h1 className="heading-display text-white text-4xl sm:text-5xl lg:text-6xl mt-4">Certificates</h1>
          <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">Our certifications reflect our unwavering commitment to quality, safety, and regulatory compliance.</p>
          <div className="accent-line accent-line-center mt-6" />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <SectionHeader overline="Accreditations" title="Our Certifications" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {CERTIFICATIONS.map((cert) => (
              <ScrollReveal key={cert}>
                <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-medium border border-gray-200 hover:border-primary/20 transition-all">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-700 text-gray-900">{cert}</h3>
                  <p className="text-sm text-gray-500 mt-2">Verified & Active</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
