import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Become a Distributor | Wholesale Dealership Network | ${SITE_NAME}`,
  description: `Join the distribution network of Kalasam Jaikrishna Industries. Apply for wholesale camphor, sambrani, and agarbathi dealership franchise opportunities across all Indian districts and states.`,
  keywords: [
    'become camphor distributor India',
    'pooja products dealership Tamil Nadu',
    'wholesale chemical distributors list',
    'Kalasam products stockist franchise',
    'distributors application form'
  ]
};

export default function DistributorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
