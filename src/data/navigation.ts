/* ═══════════════════════════════════════════════════════════════
   Navigation Data — Mega Menu Structure
   ═══════════════════════════════════════════════════════════════ */

import type { NavItem } from '@/types';

export const navigation: NavItem[] = [
  {
    label: 'Company',
    href: '/about',
    children: [
      {
        title: 'About Us',
        items: [
          { label: 'Our Story', href: '/about', description: 'Heritage, vision & leadership' },
          { label: 'Manufacturing', href: '/manufacturing', description: 'State-of-the-art production' },
          { label: 'Infrastructure', href: '/infrastructure', description: 'Factory & facilities' },
          { label: 'Quality Control', href: '/quality-control', description: 'Testing & standards' },
          { label: 'R&D', href: '/research-development', description: 'Innovation & development' },
        ],
      },
      {
        title: 'Recognition',
        items: [
          { label: 'Certificates', href: '/certificates', description: 'ISO, FSSAI & more' },
          { label: 'Gallery', href: '/gallery', description: 'Factory & product gallery' },
          { label: 'Careers', href: '/careers', description: 'Join our team' },
        ],
      },
    ],
  },
  {
    label: 'Products',
    href: '/products',
    featured: true,
    children: [
      {
        title: 'Industrial Chemicals',
        items: [
          { label: 'All Industrial Chemicals', href: '/industrial-chemicals', description: 'Complete chemical portfolio', badge: 'Featured' },
          { label: 'Synthetic Camphor', href: '/products/synthetic-camphor', description: 'CAS 76-22-2' },
          { label: 'D-Camphor', href: '/products/d-camphor', description: 'Dextrorotatory camphor' },
          { label: 'Camphor Oil', href: '/products/camphor-oil', description: 'Essential oil grade' },
          { label: 'Isoborneol Powder', href: '/products/isoborneol-powder', description: 'Industrial grade' },
          { label: 'Isoborneol Flakes', href: '/products/isoborneol-flakes', description: 'Bulk supply' },
        ],
      },
      {
        title: 'Traditional Products',
        items: [
          { label: 'All Pooja Products', href: '/pooja-products', description: 'Complete range', badge: 'Popular' },
          { label: 'Camphor Tablets', href: '/products?category=Camphor', description: 'Pure refined camphor' },
          { label: 'Agarbathi', href: '/products?category=Agarbathi', description: 'Incense sticks' },
          { label: 'Sambrani', href: '/products?category=Sambrani', description: 'Cup & computer sambrani' },
          { label: 'Lamp Oil', href: '/products?category=Lamp+Oil', description: 'Temple deepam oil' },
          { label: 'Rose Water', href: '/products?category=Rose+Water', description: 'Pure rose water' },
        ],
      },
    ],
  },
  {
    label: 'Services',
    href: '/export',
    children: [
      {
        title: 'Business Services',
        items: [
          { label: 'Export Division', href: '/export', description: '17+ countries served' },
          { label: 'OEM Manufacturing', href: '/oem-manufacturing', description: 'Custom manufacturing' },
          { label: 'Private Label', href: '/private-label', description: 'Your brand, our quality' },
          { label: 'Distributor Network', href: '/distributors', description: 'Join our network' },
          { label: 'Super Stockist', href: '/super-stockist', description: 'State-level partnership' },
          { label: 'Wholesale', href: '/wholesale', description: 'Bulk pricing' },
        ],
      },
      {
        title: 'Buyer Segments',
        items: [
          { label: 'Retail Store Supply', href: '/retail-supply', description: 'Stock your shop' },
          { label: 'Temple & Institutional', href: '/temple-supply', description: 'Bulk temple supply' },
          { label: 'Industries We Serve', href: '/industries-we-serve', description: 'Sectors & applications' },
          { label: 'Downloads', href: '/downloads', description: 'Catalogs & brochures' },
          { label: 'MSDS Library', href: '/msds-library', description: 'Safety data sheets' },
          { label: 'COA Library', href: '/coa-library', description: 'Certificates of analysis' },
        ],
      },
    ],
  },
  {
    label: 'Resources',
    href: '/blog',
    children: [
      {
        title: 'Knowledge',
        items: [
          { label: 'Blog', href: '/blog', description: 'Articles & insights' },
          { label: 'FAQ', href: '/faq', description: 'Common questions' },
          { label: 'Downloads', href: '/downloads', description: 'Brochures & catalogs' },
        ],
      },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export const footerNav = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Manufacturing', href: '/manufacturing' },
    { label: 'Infrastructure', href: '/infrastructure' },
    { label: 'Quality Control', href: '/quality-control' },
    { label: 'R&D', href: '/research-development' },
    { label: 'Careers', href: '/careers' },
    { label: 'Gallery', href: '/gallery' },
  ],
  products: [
    { label: 'All Products', href: '/products' },
    { label: 'Industrial Chemicals', href: '/industrial-chemicals' },
    { label: 'Pooja Products', href: '/pooja-products' },
    { label: 'Synthetic Camphor', href: '/products/synthetic-camphor' },
    { label: 'D-Camphor', href: '/products/d-camphor' },
    { label: 'Camphor Tablets', href: '/products?category=Camphor' },
    { label: 'Agarbathi', href: '/products?category=Agarbathi' },
  ],
  services: [
    { label: 'Export Division', href: '/export' },
    { label: 'OEM Manufacturing', href: '/oem-manufacturing' },
    { label: 'Private Label', href: '/private-label' },
    { label: 'Distributors', href: '/distributors' },
    { label: 'Super Stockist', href: '/super-stockist' },
    { label: 'Wholesale', href: '/wholesale' },
    { label: 'Retail Supply', href: '/retail-supply' },
    { label: 'Temple Supply', href: '/temple-supply' },
    { label: 'Industries We Serve', href: '/industries-we-serve' },
  ],
  resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Downloads', href: '/downloads' },
    { label: 'MSDS Library', href: '/msds-library' },
    { label: 'COA Library', href: '/coa-library' },
    { label: 'Certificates', href: '/certificates' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-conditions' },
    { label: 'Shipping Policy', href: '/shipping-policy' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Disclaimer', href: '/disclaimer' },
  ],
};
