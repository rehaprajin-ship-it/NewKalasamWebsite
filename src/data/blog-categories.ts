/* ═══════════════════════════════════════════════════════════════
   Blog Categories — 16 category taxonomy for SEO topic clusters
   ═══════════════════════════════════════════════════════════════ */

import type { BlogCategory } from '@/types/blog';

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: 'industrial-chemicals',
    name: 'Industrial Chemicals',
    description: 'Technical articles on synthetic camphor, isoborneol, camphor oil, and chemical intermediates — CAS numbers, specifications, grades, and industrial properties.',
    metaTitle: 'Industrial Chemicals Blog — Camphor, Isoborneol & Chemical Intermediates',
    metaDescription: 'Expert articles on industrial-grade camphor, isoborneol powder, camphor oil, and chemical intermediates. CAS numbers, purity standards, and technical specifications.',
    color: 'bg-blue-100 text-blue-700',
    icon: '⚗️',
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    description: 'In-depth coverage of chemical manufacturing processes, production technology, factory infrastructure, and OEM manufacturing in India.',
    metaTitle: 'Chemical Manufacturing Blog — Process, Technology & OEM',
    metaDescription: 'Guides on camphor manufacturing processes, chemical plant technology, OEM manufacturing, private label production, and industrial capacity in India.',
    color: 'bg-orange-100 text-orange-700',
    icon: '🏭',
  },
  {
    slug: 'export',
    name: 'Export',
    description: 'Complete export guides covering HS codes, shipping documentation, destination countries, export compliance, and international trade for chemical products.',
    metaTitle: 'Chemical Export Blog — HS Codes, Documentation & Global Markets',
    metaDescription: 'Expert export guides for camphor and chemical products — HS codes, shipping documentation, destination markets, export compliance, and trade finance.',
    color: 'bg-green-100 text-green-700',
    icon: '🌏',
  },
  {
    slug: 'camphor-products',
    name: 'Camphor Products',
    description: 'Everything about camphor products — tablets, powder, oil, D-camphor, synthetic camphor, computer camphor, Bhimseni camphor, and specialty grades.',
    metaTitle: 'Camphor Products Blog — Types, Grades & Applications',
    metaDescription: 'Complete guides to camphor tablets, camphor powder, D-camphor, synthetic camphor, Bhimseni camphor, and specialty camphor grades for industrial and pooja use.',
    color: 'bg-primary-100 text-primary-700',
    icon: '🕯️',
  },
  {
    slug: 'quality-control',
    name: 'Quality Control',
    description: 'ISO 9001 quality management, GC testing methods, COA interpretation, MSDS documentation, and analytical standards for chemical manufacturing.',
    metaTitle: 'Chemical Quality Control Blog — ISO, GC Testing & COA',
    metaDescription: 'Quality control guides for chemical manufacturers — ISO 9001 standards, gas chromatography testing, COA documentation, MSDS preparation, and audit compliance.',
    color: 'bg-purple-100 text-purple-700',
    icon: '🔬',
  },
  {
    slug: 'buying-guides',
    name: 'Buying Guides',
    description: 'Complete buyer guides for industrial chemicals — how to evaluate suppliers, assess quality, negotiate pricing, and manage procurement.',
    metaTitle: 'Chemical Buying Guides — How to Buy Camphor & Industrial Chemicals',
    metaDescription: 'Step-by-step buyer guides for camphor, isoborneol, and industrial chemicals. Supplier evaluation, quality checks, pricing benchmarks, and procurement best practices.',
    color: 'bg-yellow-100 text-yellow-700',
    icon: '📋',
  },
  {
    slug: 'industry-applications',
    name: 'Industry Applications',
    description: 'How camphor and chemical products serve the pharmaceutical, cosmetics, food, fragrance, polymer, and specialty chemical industries.',
    metaTitle: 'Camphor Industry Applications — Pharma, Cosmetics & More',
    metaDescription: 'Discover how camphor, isoborneol, and chemical intermediates are used in pharmaceutical, cosmetics, food processing, fragrance, and polymer industries.',
    color: 'bg-teal-100 text-teal-700',
    icon: '🏥',
  },
  {
    slug: 'temple-traditions',
    name: 'Temple & Traditions',
    description: 'The cultural, spiritual, and historical significance of camphor, sambrani, agarbathi, and lamp oil in Hindu worship and temple traditions.',
    metaTitle: 'Camphor in Hindu Traditions — Significance, Rituals & Spirituality',
    metaDescription: 'Explore the sacred role of camphor in Hindu rituals, temple worship, and spiritual traditions. Science and spirituality of camphor, sambrani, and incense.',
    color: 'bg-amber-100 text-amber-700',
    icon: '🛕',
  },
  {
    slug: 'market-intelligence',
    name: 'Market Intelligence',
    description: 'Camphor market trends, pricing forecasts, global demand analysis, competitive landscape, and investment opportunities in chemical manufacturing.',
    metaTitle: 'Camphor Market Intelligence — Trends, Prices & Global Demand',
    metaDescription: 'Market reports on camphor pricing, global demand trends, India export statistics, competitive analysis, and growth forecasts for camphor and chemical products.',
    color: 'bg-indigo-100 text-indigo-700',
    icon: '📊',
  },
  {
    slug: 'oem-private-label',
    name: 'OEM & Private Label',
    description: 'How OEM contract manufacturing and private label services work for chemical and pooja products — from formulation to packaging to market launch.',
    metaTitle: 'OEM & Private Label Chemical Manufacturing — Complete Guide',
    metaDescription: 'OEM contract manufacturing and private label guides for camphor, pooja products, and specialty chemicals. From formulation to branding to logistics.',
    color: 'bg-rose-100 text-rose-700',
    icon: '🏷️',
  },
  {
    slug: 'wholesale-distribution',
    name: 'Wholesale & Distribution',
    description: 'Wholesale pricing, distributor network building, stockist opportunities, and supply chain management for camphor and pooja products.',
    metaTitle: 'Camphor Wholesale & Distribution — Pricing, MOQ & Networks',
    metaDescription: 'Guides on camphor wholesale pricing, distributor opportunities, stockist programs, supply chain management, and building distribution networks in India.',
    color: 'bg-cyan-100 text-cyan-700',
    icon: '🚚',
  },
  {
    slug: 'technical-guides',
    name: 'Technical Guides',
    description: 'Detailed technical references on chemical properties, analytical methods, safety standards, storage conditions, and laboratory procedures.',
    metaTitle: 'Chemical Technical Guides — Properties, Safety & Lab Methods',
    metaDescription: 'Technical references for camphor and chemical intermediates — molecular properties, analytical testing methods, safety data, storage guidelines, and lab procedures.',
    color: 'bg-slate-100 text-slate-700',
    icon: '📐',
  },
  {
    slug: 'pooja-products',
    name: 'Pooja Products',
    description: 'Detailed guides on agarbathi, sambrani, lamp oil, rose water, cotton wicks, and pooja accessories — manufacturing, quality, and usage.',
    metaTitle: 'Pooja Products Guide — Agarbathi, Sambrani & Temple Supplies',
    metaDescription: 'Complete guides to agarbathi, sambrani cups, lamp oil, rose water, and temple supplies — manufacturing process, quality standards, ingredients, and usage.',
    color: 'bg-orange-100 text-orange-700',
    icon: '🪔',
  },
  {
    slug: 'research',
    name: 'Research & Innovation',
    description: 'Academic and industry research on camphor chemistry, synthesis innovations, new applications, and frontier developments in chemical manufacturing.',
    metaTitle: 'Camphor Research & Innovation — Chemistry & New Applications',
    metaDescription: 'Latest research on camphor chemistry, synthesis innovations, new industrial applications, pharmaceutical discoveries, and frontier chemical manufacturing technology.',
    color: 'bg-violet-100 text-violet-700',
    icon: '🧪',
  },
  {
    slug: 'safety-compliance',
    name: 'Safety & Compliance',
    description: 'Chemical safety regulations, REACH compliance, transport guidelines, environmental standards, and occupational health for chemical manufacturers.',
    metaTitle: 'Chemical Safety & Compliance — REACH, Transport & Regulations',
    metaDescription: 'Safety and compliance guides for chemical manufacturers — REACH regulations, transport classification, environmental standards, and occupational health.',
    color: 'bg-red-100 text-red-700',
    icon: '🛡️',
  },
  {
    slug: 'local-india',
    name: 'Made in India',
    description: 'Celebrating India\'s chemical manufacturing excellence — Theni, Tamil Nadu, Make in India, Atmanirbhar Bharat, and Indian export success stories.',
    metaTitle: 'Made in India Chemical Manufacturing — Tamil Nadu & Theni',
    metaDescription: 'India\'s chemical manufacturing excellence — Theni and Tamil Nadu as manufacturing hubs, Make in India initiative, Indian camphor exports, and success stories.',
    color: 'bg-green-100 text-green-700',
    icon: '🇮🇳',
  },
];

export const getCategoryBySlug = (slug: string): BlogCategory | undefined =>
  BLOG_CATEGORIES.find((c) => c.slug === slug);

export const getCategoryName = (slug: string): string =>
  BLOG_CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;

export const getCategoryImage = (categorySlug: string): string => {
  switch (categorySlug) {
    case 'industrial-chemicals':
    case 'quality-control':
    case 'technical-guides':
    case 'research':
      return '/images/sections/qc-laboratory.png';
    case 'manufacturing':
    case 'industry-applications':
    case 'oem-private-label':
      return '/images/hero/manufacturing-line.png';
    case 'export':
      return '/images/hero/export-port.png';
    case 'temple-traditions':
    case 'pooja-products':
      return '/images/hero/pooja-temple.png';
    case 'camphor-products':
    case 'buying-guides':
    case 'wholesale-distribution':
      return '/images/sections/warehouse.png';
    case 'market-intelligence':
    case 'safety-compliance':
    case 'local-india':
    default:
      return '/images/hero/factory-campus.png';
  }
};
