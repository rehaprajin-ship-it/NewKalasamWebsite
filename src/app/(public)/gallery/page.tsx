import PageHero from '@/components/ui/PageHero';
/* ═══════════════════════════════════════════════════════════════
   Gallery Page
   ═══════════════════════════════════════════════════════════════ */

import type { Metadata } from 'next';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'Gallery — Factory, Products & Manufacturing',
  description: 'View our state-of-the-art manufacturing facility, product range, quality laboratory, and packaging operations.',
};

const galleryCategories = [
  { name: 'Factory', count: 8, icon: '🏭' },
  { name: 'Products', count: 12, icon: '📦' },
  { name: 'Laboratory', count: 6, icon: '🔬' },
  { name: 'Packaging', count: 8, icon: '🎁' },
  { name: 'Warehouse', count: 5, icon: '🏗️' },
  { name: 'Exports', count: 6, icon: '🚢' },
];

export default function GalleryPage() {
  return (
    <div>
      <PageHero
        title="Media Gallery"
        overline="Our Facilities"
        description="Walk through our manufacturing units, QA laboratory, warehouse facilities, and corporate campus."
        backgroundImage="/images/hero/factory-campus.png"
      />

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader overline="Categories" title="Explore by Category" />
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
            {galleryCategories.map((cat) => (
              <StaggerItem key={cat.name}>
                <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center hover:shadow-medium hover:border-primary/20 transition-all group cursor-pointer">
                  <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <h3 className="text-lg font-600 text-gray-900 mb-1">{cat.name}</h3>
                  <p className="text-sm text-gray-500">{cat.count} photos</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Placeholder grid */}
          <div className="mt-16">
            <SectionHeader overline="All Photos" title="Manufacturing Gallery" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <ScrollReveal key={i} delay={i * 0.03}>
                  <div className="aspect-square bg-gradient-to-br from-primary-50 to-cream rounded-xl flex items-center justify-center border border-gray-200 hover:shadow-medium transition-shadow cursor-pointer group">
                    <div className="text-center">
                      <svg className="w-8 h-8 mx-auto text-primary/20 group-hover:text-primary/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5v-15a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v15a1.5 1.5 0 001.5 1.5z" />
                      </svg>
                      <p className="text-xs text-gray-400 mt-2">CMS Image {i + 1}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
