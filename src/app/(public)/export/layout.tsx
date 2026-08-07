import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Export Division | Global Chemical Shipping & Logistics | ${SITE_NAME}`,
  description: `Kalasam Jaikrishna Industries is a certified chemical exporter shipping synthetic camphor, isoborneol flakes, and D-camphor from Chennai and Tuticorin ports to Malaysia, Singapore, UAE, Bangladesh, Europe, and worldwide.`,
  alternates: { canonical: `${SITE_URL}/export` },
  keywords: [
    'chemical export company India',
    'camphor exporter Tamil Nadu',
    'isoborneol flakes global shipping',
    'B2B chemical freight logs Chennai port',
    'FCL container shipping custom clearance'
  ]
};

export default function ExportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
