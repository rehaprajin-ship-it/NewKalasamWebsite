import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Our Products Portfolio | Synthetic Camphor, Isoborneol & Pooja Supplies | ${SITE_NAME}`,
  description: `Explore our complete range of high-purity industrial chemicals and pooja items manufactured in Theni, Tamil Nadu. Premium synthetic camphor, D-camphor, isoborneol flakes, agarbathi, sambrani, and rose water for domestic and global B2B supply.`,
  alternates: { canonical: `${SITE_URL}/products` },
  keywords: [
    'buy synthetic camphor tablets',
    'isoborneol flakes bulk supplier India',
    'D-camphor chemical manufacturer Tamil Nadu',
    'pooja products catalog wholesale',
    'agarbathi and sambrani distributor network'
  ]
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
