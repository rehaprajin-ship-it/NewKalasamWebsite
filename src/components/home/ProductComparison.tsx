'use client';

/* ═══════════════════════════════════════════════════════════════
   Product Comparison — Data Table Section
   Camphor product specifications comparison table
   ═══════════════════════════════════════════════════════════════ */

import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/common/ScrollReveal';

const comparisonData = [
  {
    property: 'Chemical Name',
    syntheticCamphor: 'DL-Camphor (racemic)',
    dCamphor: 'D-Camphor (dextrorotatory)',
    isoborneol: 'Isoborneol',
  },
  {
    property: 'CAS Number',
    syntheticCamphor: '76-22-2',
    dCamphor: '464-49-3',
    isoborneol: '124-76-5',
  },
  {
    property: 'Purity',
    syntheticCamphor: '≥ 96%',
    dCamphor: '≥ 97%',
    isoborneol: '≥ 95%',
  },
  {
    property: 'Form',
    syntheticCamphor: 'Powder / Tablets',
    dCamphor: 'Crystal Powder',
    isoborneol: 'Powder / Flakes',
  },
  {
    property: 'Primary Use',
    syntheticCamphor: 'Pharmaceuticals, Fragrance, Plasticizers, Religious',
    dCamphor: 'Pharmaceuticals, Optical Instruments',
    isoborneol: 'Camphor synthesis intermediate',
  },
  {
    property: 'Annual Capacity',
    syntheticCamphor: '500+ MT',
    dCamphor: '100+ MT',
    isoborneol: '200+ MT',
  },
  {
    property: 'Packaging',
    syntheticCamphor: '1 kg – 30 kg bags',
    dCamphor: '1 kg – 25 kg drums',
    isoborneol: '25 kg – 50 kg bags',
  },
];

export default function ProductComparison() {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          overline="Product Specifications"
          title="Compare Our Core Chemicals"
          subtitle="A side-by-side comparison of our three primary industrial chemical products — helping you choose the right grade for your application."
        />

        <ScrollReveal>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-primary/20">
                  <th className="py-3 px-4 text-left text-xs font-700 uppercase tracking-wider text-gray-500">
                    Specification
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-700 uppercase tracking-wider text-primary">
                    Synthetic Camphor
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-700 uppercase tracking-wider text-primary">
                    D-Camphor
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-700 uppercase tracking-wider text-primary">
                    Isoborneol
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr
                    key={row.property}
                    className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}`}
                  >
                    <td className="py-3 px-4 font-600 text-gray-800">{row.property}</td>
                    <td className="py-3 px-4 text-gray-600">{row.syntheticCamphor}</td>
                    <td className="py-3 px-4 text-gray-600">{row.dCamphor}</td>
                    <td className="py-3 px-4 text-gray-600">{row.isoborneol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Key Takeaways / TL;DR Summary */}
        <ScrollReveal delay={0.2}>
          <div className="mt-10 bg-primary-50/50 border border-primary/10 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto">
            <h3 className="text-base font-700 text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Key Takeaways
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600 leading-relaxed">
              <li>• <strong>Synthetic camphor</strong> is our highest-volume product at 500+ MT/year — ideal if you need pharmaceutical, fragrance, or religious-grade camphor.</li>
              <li>• <strong>D-camphor</strong> offers optical-grade purity (≥ 97%) for pharmaceutical and precision instrument applications.</li>
              <li>• <strong>Isoborneol</strong> serves as an intermediate in camphor synthesis — available in both powder and flake forms for your process requirements.</li>
              <li>• All three products ship with <abbr title="Certificate of Analysis">COA</abbr> and <abbr title="Material Safety Data Sheet">MSDS</abbr> documentation per international B2B standards.</li>
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-8">
            <Link href="/industrial-chemicals" className="btn btn-primary">
              View Full Product Range
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
