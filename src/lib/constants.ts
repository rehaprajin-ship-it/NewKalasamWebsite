/* ═══════════════════════════════════════════════════════════════
   Kalasam Jaikrishna Industries — Constants & Company Data
   ═══════════════════════════════════════════════════════════════ */

// ── Company Information ────────────────────────────────────────

export const COMPANY = {
  name: 'Jaikrishna Industries',
  shortName: 'Jaikrishna',
  tagline: 'Premium Manufacturer & Global Exporter of Kalasam & Temple Dharisana Brands',
  description:
    'India\'s leading manufacturer and exporter of synthetic camphor, D-camphor, isoborneol flakes, and organic intermediates under the brand names Kalasam and Temple Dharisana. Trusted by global buyers across 17+ countries.',
  founded: '1995',
  location: {
    address: 'Telephone Nagar, Theni, Tamil Nadu-625531, India.',
    city: 'Theni',
    state: 'Tamil Nadu',
    country: 'India',
    pincode: '625531',
  },
  contact: {
    phone: '+91 6383020848',
    email: 'jaikrishnaindustries1@gmail.com',
    exportEmail: 'jaikrishnaindustries1@gmail.com',
    whatsapp: '916383020848',
  },
  social: {
    facebook: 'https://facebook.com/jaikrishnaindustries',
    instagram: 'https://instagram.com/jaikrishnaindustries',
    linkedin: 'https://linkedin.com/company/jaikrishnaindustries',
    youtube: 'https://youtube.com/@jaikrishnaindustries',
    twitter: 'https://twitter.com/jaikrishna_ind',
  },
  businessHours: 'Monday – Saturday: 9:00 AM – 6:00 PM IST',
} as const;

// ── Admin ──────────────────────────────────────────────────────

export const ADMIN_EMAIL = 'srinisrkp@gmail.com';

// ── Statistics ─────────────────────────────────────────────────

export const COMPANY_STATS = [
  { value: 25, suffix: '+', label: 'Years of Excellence', description: 'Manufacturing since 1995' },
  { value: 500, suffix: '+', label: 'Clients Worldwide', description: 'Trusted globally' },
  { value: 17, suffix: '+', label: 'Countries Served', description: 'Export reach' },
  { value: 50, suffix: '+', label: 'Products Range', description: 'Diverse portfolio' },
  { value: 10000, suffix: '+', label: 'MT Annual Capacity', description: 'Production strength' },
  { value: 99.9, suffix: '%', label: 'Purity Standards', description: 'Quality assurance' },
] as const;

// ── Timeline ───────────────────────────────────────────────────

export const COMPANY_TIMELINE = [
  { year: '1995', title: 'Company Founded', description: 'Kalasam Jaikrishna Industries was established in Theni, Tamil Nadu, starting with traditional camphor manufacturing.' },
  { year: '2000', title: 'Production Expansion', description: 'Expanded manufacturing capacity with modern machinery and automated production lines.' },
  { year: '2005', title: 'Export Division Launch', description: 'Opened export division to serve international markets across Asia and the Middle East.' },
  { year: '2010', title: 'ISO Certification', description: 'Achieved ISO 9001:2015 certification for quality management systems.' },
  { year: '2015', title: 'R&D Laboratory', description: 'Established in-house research and development laboratory for product innovation.' },
  { year: '2018', title: 'OEM & Private Label', description: 'Launched OEM manufacturing and private label services for global brands.' },
  { year: '2020', title: 'Industrial Chemicals', description: 'Expanded into synthetic camphor, D-camphor, and isoborneol for industrial applications.' },
  { year: '2024', title: 'Global Expansion', description: 'Serving 17+ countries with an expanded product portfolio and state-of-the-art manufacturing.' },
] as const;

// ── Export Countries ───────────────────────────────────────────

export const EXPORT_COUNTRIES = [
  { name: 'Bangladesh', code: 'BD', continent: 'Asia' },
  { name: 'Sri Lanka', code: 'LK', continent: 'Asia' },
  { name: 'Malaysia', code: 'MY', continent: 'Asia' },
  { name: 'Singapore', code: 'SG', continent: 'Asia' },
  { name: 'Nepal', code: 'NP', continent: 'Asia' },
  { name: 'Bhutan', code: 'BT', continent: 'Asia' },
  { name: 'UAE', code: 'AE', continent: 'Middle East' },
  { name: 'Saudi Arabia', code: 'SA', continent: 'Middle East' },
  { name: 'Oman', code: 'OM', continent: 'Middle East' },
  { name: 'Qatar', code: 'QA', continent: 'Middle East' },
  { name: 'Kuwait', code: 'KW', continent: 'Middle East' },
  { name: 'Indonesia', code: 'ID', continent: 'Asia' },
  { name: 'Vietnam', code: 'VN', continent: 'Asia' },
  { name: 'Thailand', code: 'TH', continent: 'Asia' },
  { name: 'Nigeria', code: 'NG', continent: 'Africa' },
  { name: 'Kenya', code: 'KE', continent: 'Africa' },
  { name: 'United States', code: 'US', continent: 'North America' },
] as const;

// ── Industries Served ──────────────────────────────────────────

export const INDUSTRIES = [
  { name: 'Pharmaceutical', icon: '💊', description: 'Pharmaceutical-grade camphor and intermediates for drug formulation.' },
  { name: 'Fragrance & Flavor', icon: '🌸', description: 'High-purity camphor oil and aromatic compounds for perfumery.' },
  { name: 'Cosmetics & Personal Care', icon: '✨', description: 'Camphor and botanical extracts for skincare and wellness products.' },
  { name: 'Chemical Manufacturing', icon: '🧪', description: 'Industrial chemicals and intermediates for chemical synthesis.' },
  { name: 'Food & Beverage', icon: '🍃', description: 'Food-grade camphor and natural ingredients for traditional preparations.' },
  { name: 'Temple & Religious', icon: '🕉️', description: 'Premium pooja products for temples, ashrams, and devotional retail.' },
  { name: 'Household & FMCG', icon: '🏠', description: 'Camphor-based insect repellents and household products.' },
  { name: 'Plastics & Polymers', icon: '⚙️', description: 'Camphor as a plasticizer for cellulose nitrate and specialty polymers.' },
] as const;

// ── Certificates ───────────────────────────────────────────────

export const CERTIFICATIONS = [
  'ISO 9001:2015',
  'FSSAI Certified',
  'GMP Certified',
  'MSME Registered',
  'IEC Certificate',
  'GST Registered',
  'UDYAM Registered',
  'BIS Standards',
] as const;

// ── Site URLs ──────────────────────────────────────────────────

export const SITE_URL = 'https://kalasamjaikrishna.co.in';
export const SITE_NAME = 'Jaikrishna Industries';
