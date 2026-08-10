import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  alternates: { canonical: `/distributors` },
  title: `Become a Camphor Distributor India — Distributorship Opportunity — ${SITE_NAME}`,
  description: `Apply for camphor distributorship in India. Join the Kalasam distribution network — exclusive territory, competitive margins, marketing support, and credit facilities for wholesale camphor, sambrani, and agarbathi dealership across all Indian states.`
};

export default function DistributorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
