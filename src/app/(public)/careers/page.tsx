/* Careers Page */
import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'Careers — Join Our Team',
  description: 'Explore career opportunities at Kalasam Jaikrishna Industries. Join our growing team of professionals in manufacturing, quality, sales, and export.',
};

const openings = [
  { title: 'Production Supervisor', dept: 'Manufacturing', location: 'Theni', type: 'Full-time' },
  { title: 'Quality Control Chemist', dept: 'QC Laboratory', location: 'Theni', type: 'Full-time' },
  { title: 'Export Documentation Executive', dept: 'Export Division', location: 'Theni', type: 'Full-time' },
  { title: 'Sales Representative', dept: 'Sales', location: 'Tamil Nadu', type: 'Full-time' },
  { title: 'Digital Marketing Executive', dept: 'Marketing', location: 'Remote / Theni', type: 'Full-time' },
];

export default function CareersPage() {
  return (
    <div>
      <section className="relative bg-primary-dark py-20 lg:py-28">
        <div className="container-custom relative z-10 text-center">
          <span className="overline text-accent-light">Join Us</span>
          <h1 className="heading-display text-white text-4xl sm:text-5xl lg:text-6xl mt-4">Careers</h1>
          <p className="mt-4 text-white/60 text-lg max-w-2xl mx-auto">
            Build your career with one of India&apos;s leading camphor and chemical manufacturers.
          </p>
          <div className="accent-line accent-line-center mt-6" />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <SectionHeader overline="Opportunities" title="Current Openings" />
          <div className="space-y-4 mt-4">
            {openings.map((job) => (
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
              <Link href={`mailto:careers@kalasam.com`} className="btn btn-outline">Send Resume</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
