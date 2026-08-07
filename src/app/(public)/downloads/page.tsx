import PageHero from '@/components/ui/PageHero';
/* Downloads Page */
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import ScrollReveal from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  alternates: { canonical: `/downloads` },
  title: 'Downloads — Catalogs, Brochures & Technical Documents',
  description: 'Download product catalogs, company brochures, MSDS, COA templates, and technical data sheets.',
};

const downloads = [
  { name: 'Company Profile', type: 'PDF', size: '5.2 MB', desc: 'Complete company overview, capabilities, and product portfolio.' },
  { name: 'Industrial Chemicals Catalog', type: 'PDF', size: '3.8 MB', desc: 'Detailed specifications for camphor, isoborneol, and camphor oil.' },
  { name: 'Pooja Products Catalog', type: 'PDF', size: '4.1 MB', desc: 'Full range of camphor tablets, agarbathi, sambrani, and accessories.' },
  { name: 'Export Product Brochure', type: 'PDF', size: '2.9 MB', desc: 'Export-grade products with packaging and shipping specifications.' },
  { name: 'OEM & Private Label Guide', type: 'PDF', size: '1.8 MB', desc: 'Complete guide to our OEM and private label manufacturing services.' },
  { name: 'Quality Assurance Overview', type: 'PDF', size: '2.2 MB', desc: 'Our QMS, laboratory capabilities, and certification details.' },
];

export default function DownloadsPage() {
  return (
    <div>
      <PageHero
        title="Document Downloads"
        overline="Resource Center"
        description="Access and download our catalogs, brochures, quality certificates, and product datasheets."
        backgroundImage="/images/sections/warehouse.png"
      />

      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <SectionHeader overline="Documents" title="Available Downloads" />
          <div className="space-y-4 mt-4">
            {downloads.map((dl) => (
              <ScrollReveal key={dl.name}>
                <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-medium hover:border-primary/20 transition-all flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-600 text-gray-900">{dl.name}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{dl.desc}</p>
                      <span className="text-xs text-gray-400 mt-1 block">{dl.type} • {dl.size}</span>
                    </div>
                  </div>
                  <button className="btn btn-outline btn-sm flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
