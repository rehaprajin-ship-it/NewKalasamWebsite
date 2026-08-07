import PageHero from '@/components/ui/PageHero';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  alternates: { canonical: `/research-development` },
  title: 'Research & Development — Innovation in Camphor Chemistry',
  description: 'Our in-house R&D laboratory develops custom formulations, optimizes purity levels, and innovates new product lines for industrial and consumer markets.',
};

const rdFocus = [
  { title: 'Purity Optimization', desc: 'Continuous improvement of synthesis processes to achieve 99.9%+ purity levels.', icon: '🎯' },
  { title: 'Custom Formulations', desc: 'Developing tailored chemical grades and blends for OEM client specifications.', icon: '⚗️' },
  { title: 'New Product Development', desc: 'Expanding our portfolio with novel camphor derivatives and specialty chemicals.', icon: '🔬' },
  { title: 'Process Innovation', desc: 'Improving yield, reducing waste, and enhancing energy efficiency in manufacturing.', icon: '⚙️' },
  { title: 'Quality Methods', desc: 'Developing and validating new analytical methods for product quality testing.', icon: '📊' },
  { title: 'Fragrance R&D', desc: 'Creating unique fragrance blends for agarbathi and sambrani product lines.', icon: '🌸' },
];

export default function ResearchDevelopmentPage() {
  return (
    <div>
      <PageHero
        title="Research & Development"
        overline="Innovation"
        description="Advanced laboratories, cutting-edge formulation development, and state-of-the-art testing systems."
        backgroundImage="/images/sections/qc-laboratory.png"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader overline="Focus Areas" title="R&D Capabilities" />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {rdFocus.map((f) => (
              <StaggerItem key={f.title}>
                <div className="bg-gray-50 rounded-2xl p-7 h-full hover:shadow-medium hover:bg-white border border-transparent hover:border-gray-200 transition-all">
                  <span className="text-3xl mb-4 block">{f.icon}</span>
                  <h3 className="text-lg font-600 text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="heading-section text-3xl text-white">Need a Custom Formulation?</h2>
            <p className="mt-3 text-white/60 max-w-xl mx-auto">Our R&D team can develop products tailored to your exact specifications.</p>
            <Link href="/contact" className="btn btn-gold btn-lg mt-8">Discuss Your Requirements</Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
