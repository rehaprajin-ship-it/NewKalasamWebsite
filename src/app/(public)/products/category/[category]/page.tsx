import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import ProductsPage from '@/app/(public)/products/page';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const CATEGORY_META: Record<string, { title: string; desc: string }> = {
  camphor: {
    title: 'Pure Refined Camphor Tablets Wholesale — Kalasam Camphor',
    desc: 'Buy pure refined camphor tablets wholesale. High quality, clean-burning, residue-free camphor for religious ceremonies and temple supply. Direct from factory.',
  },
  agarbathi: {
    title: 'Hand-Rolled Premium Agarbathi Wholesale — Incense Sticks India',
    desc: 'Premium hand-rolled agarbathi and incense sticks in Rose, Sandalwood, Jasmine. Direct manufacturer wholesale supply. Long-lasting divine aroma.',
  },
  sambrani: {
    title: 'Natural Cup Sambrani & Computer Sambrani Manufacturer — Kalasam',
    desc: 'Divine benzoin resin cup sambrani and computer sambrani manufacturer. High-quality bulk pooja supply for temples and retailers. Low smoke, pure fragrance.',
  },
  'lamp-oil': {
    title: 'Temple Dharisana Lamp Oil Wholesale — Low Smoke Puja Deepam Oil',
    desc: 'Sesame-based clean burning temple lamp oil. Low smoke, steady flame for daily puja deepam. Wholesale manufacturer direct supply.',
  },
  'rose-water': {
    title: 'Pure Steam-Distilled Rose Water Bulk Manufacturer — Kalasam',
    desc: 'Pure steam-distilled rose water for abhishekam, cosmetics, and religious rituals. Bulk manufacturer supply in retail and commercial containers.',
  },
  'industrial-chemicals': {
    title: 'Industrial Chemicals Manufacturer — Synthetic Camphor, Isoborneol',
    desc: 'Certified bulk manufacturer of synthetic camphor powder, D-camphor, Isoborneol flakes, and camphor oil. High-purity B2B chemical intermediates.',
  },
  'pooja-products': {
    title: 'Pooja Products Manufacturer India — Camphor, Agarbathi Supplier',
    desc: 'Leading pooja items manufacturer India — premium camphor tablets, cup sambrani, hand-rolled agarbathi, lamp oil, and rose water wholesale from Kalasam.',
  }
};

export async function generateStaticParams() {
  return [
    { category: 'camphor' },
    { category: 'agarbathi' },
    { category: 'sambrani' },
    { category: 'lamp-oil' },
    { category: 'rose-water' },
    { category: 'industrial-chemicals' },
    { category: 'pooja-products' }
  ];
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const meta = CATEGORY_META[category] || {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Products — Kalasam`,
    desc: `Explore our premium range of ${category} products. Direct factory supply from Kalasam Jaikrishna Industries.`,
  };

  return {
    title: meta.title,
    description: meta.desc,
    alternates: {
      canonical: `${SITE_URL}/products/category/${category}`
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  return <ProductsPage categoryFilter={category} />;
}
