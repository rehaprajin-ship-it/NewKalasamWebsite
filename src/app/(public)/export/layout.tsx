import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Camphor Exporter India — Import Synthetic Camphor — ${SITE_NAME}`,
  description: `Kalasam Jaikrishna Industries — certified camphor exporter from India. Import synthetic camphor, D-camphor, and isoborneol flakes from Chennai and Tuticorin ports to Malaysia, Singapore, UAE, Bangladesh, Europe, and worldwide. FCL/LCL, HS codes, COA per batch.`,
  alternates: { canonical: `${SITE_URL}/export` }
};

export default function ExportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
