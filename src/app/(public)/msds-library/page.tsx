import PageHero from '@/components/ui/PageHero';
/* MSDS Library */
import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = { title: 'MSDS Library — Material Safety Data Sheets', description: 'Download MSDS for all Kalasam industrial chemicals.' };

const msdsList = [
  { product: 'Synthetic Camphor', cas: '76-22-2' },
  { product: 'D-Camphor', cas: '464-49-3' },
  { product: 'Isoborneol Powder', cas: '10385-78-1' },
  { product: 'Isoborneol Flakes', cas: '10385-78-1' },
  { product: 'Camphor Oil', cas: '8008-51-3' },
];

export default function MSDSLibraryPage() {
  return (
    <div>
      <PageHero
        title="MSDS Document Library"
        overline="Regulatory Compliance"
        description="Download official Material Safety Data Sheets (MSDS) for all our chemical grades and compounds."
        backgroundImage="/images/sections/qc-laboratory.png"
      />
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <SectionHeader overline="Documents" title="Available MSDS" />
          <div className="space-y-4 mt-4">
            {msdsList.map((m) => (
              <ScrollReveal key={m.cas}>
                <div className="bg-white rounded-xl p-6 border border-gray-200 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-600 text-gray-900">{m.product}</h3>
                    <p className="text-xs text-gray-400 mt-1">CAS: {m.cas}</p>
                  </div>
                  <Link href="/contact" className="btn btn-outline btn-sm">Request MSDS</Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.2}>
            <p className="mt-8 text-center text-sm text-gray-500">Need an MSDS not listed here? <Link href="/contact" className="text-primary hover:underline">Contact us</Link>.</p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
