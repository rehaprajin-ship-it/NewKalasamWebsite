import PageHero from '@/components/ui/PageHero';
/* COA Library */
import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/common/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = { title: 'COA Library — Certificates of Analysis', description: 'Request batch-wise Certificates of Analysis for Kalasam products.' };

export default function COALibraryPage() {
  return (
    <div>
      <PageHero
        title="COA Library"
        overline="Quality Certificates"
        description="Search and download official Certificates of Analysis (COA) for your specific product batches."
        backgroundImage="/images/sections/qc-laboratory.png"
      />
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-2xl text-center">
          <div className="bg-white rounded-2xl border border-gray-200 p-10">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <h2 className="text-2xl font-700 text-gray-900 mb-3">Request a Certificate of Analysis</h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">COA documents are generated batch-wise. Please provide your batch number or product name and we&apos;ll send the relevant COA within 24 hours.</p>
            <Link href="/contact" className="btn btn-primary btn-lg">Request COA</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
