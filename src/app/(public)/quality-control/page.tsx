import PageHero from '@/components/ui/PageHero';
/* ═══════════════════════════════════════════════════════════════
   Quality Control Page
   ═══════════════════════════════════════════════════════════════ */

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { CERTIFICATIONS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Quality Control — ISO 9001:2015 Certified Manufacturing',
  description: 'Our multi-stage quality control system ensures every product meets international standards. In-house lab, batch-wise COA, MSDS documentation, and third-party audits.',
};

const qcStages = [
  { stage: 'Incoming Inspection', desc: 'Raw materials tested for identity, purity, moisture, and heavy metals before acceptance.' },
  { stage: 'In-Process Control', desc: 'Real-time monitoring of reaction parameters, temperature, pressure, and intermediate purity.' },
  { stage: 'Finished Product Testing', desc: 'Complete analysis — GC purity, melting point, optical rotation, appearance, and odor.' },
  { stage: 'Packaging QC', desc: 'Weight verification, seal integrity, labeling accuracy, and batch code verification.' },
  { stage: 'Stability Testing', desc: 'Accelerated stability studies to determine shelf life and storage recommendations.' },
  { stage: 'Release & Documentation', desc: 'Batch release only after full QC approval. COA generated for every batch.' },
];

const labEquipment = [
  'Gas Chromatography (GC)',
  'High-Performance Liquid Chromatography (HPLC)',
  'Melting Point Apparatus',
  'Optical Rotation Polarimeter',
  'Karl Fischer Titrator',
  'UV-Visible Spectrophotometer',
  'pH Meter & Conductivity Meter',
  'Analytical Balance (0.001g)',
];

export default function QualityControlPage() {
  return (
    <div>
      <PageHero
        title="Quality Control & QA"
        overline="Accreditations"
        description="ISO 9001:2015 certified, gas chromatography systems, and strict batch-wise laboratory testing checklists."
        backgroundImage="/images/sections/qc-laboratory.png"
      />

      {/* QC Stages */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader overline="Process" title="6-Stage Quality Control" />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {qcStages.map((item, i) => (
              <StaggerItem key={item.stage}>
                <div className="bg-gray-50 rounded-2xl p-7 h-full hover:shadow-medium hover:bg-white border border-transparent hover:border-gray-200 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-700 text-sm mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-base font-600 text-gray-900 mb-2">{item.stage}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Lab Equipment */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <span className="overline">Laboratory</span>
                <h2 className="heading-section text-3xl text-gray-900 mt-4">In-House Analytical Lab</h2>
                <p className="mt-4 text-gray-500 leading-relaxed">
                  Our fully-equipped quality control laboratory enables comprehensive testing of raw materials, intermediates,
                  and finished products — ensuring every batch meets specifications before release.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {labEquipment.map((equip) => (
                    <li key={equip} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {equip}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
            <ScrollReveal direction="right">
              <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-medium border border-gray-200">
                <Image
                  src="/images/sections/qc-laboratory.png"
                  alt="In-House Analytical Quality Control Laboratory"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader overline="Certifications" title="Accreditations & Certifications" />
          <ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-medium transition-shadow border border-gray-200">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <span className="text-sm font-600 text-gray-700">{cert}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="heading-section text-3xl text-white">Need Quality Documentation?</h2>
            <p className="mt-3 text-white/60 max-w-xl mx-auto">Request COA, MSDS, TDS, or specification sheets for any of our products.</p>
            <Link href="/contact" className="btn btn-gold btn-lg mt-8">Request Documents</Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
