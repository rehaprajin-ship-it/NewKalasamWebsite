import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Frequently Asked Questions (FAQ) | Support Center | ${SITE_NAME}`,
  description: `Find answers to common queries regarding bulk order packaging, shipping logistics, laboratory Certificates of Analysis (COA), safety data sheets (MSDS), and custom private label terms.`,
  keywords: [
    'camphor MSDS guidelines FAQ',
    'chemical shipping lead time India',
    'purity certificate COA request',
    'OEM manufacturing terms and contract options',
    'distributor shipping fees'
  ]
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
