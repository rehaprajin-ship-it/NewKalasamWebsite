import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  alternates: { canonical: `/faq` },
  title: `Frequently Asked Questions (FAQ) — Support Center — ${SITE_NAME}`,
  description: `Find answers to common queries regarding bulk order packaging, shipping logistics, laboratory Certificates of Analysis (COA), safety data sheets (MSDS), and custom private label terms.`
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
