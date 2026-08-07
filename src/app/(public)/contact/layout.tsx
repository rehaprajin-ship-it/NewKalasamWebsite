import type { Metadata } from 'next';
import { SITE_NAME, COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  alternates: { canonical: `/contact` },
  title: `Contact Us | B2B Sales & Export Division | ${SITE_NAME}`,
  description: `Get in touch with Kalasam Jaikrishna Industries in Theni, Tamil Nadu. Reach our B2B sales, wholesale, and export division for synthetic camphor, isoborneol flakes, and ceremonial pooja products across Chennai, Madurai, Coimbatore, all Indian states, and global markets.`,
  keywords: [
    'contact Kalasam Jaikrishna Industries',
    'camphor manufacturer contact number',
    'Theni camphor factory address',
    'chemical export division India email',
    'Kalasam customer care phone',
    'distributor contact Tamil Nadu'
  ]
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
