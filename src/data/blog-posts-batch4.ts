/* ═══════════════════════════════════════════════════════════════
   Blog Posts — Batch 4: Informational Articles (Posts 21–30)
   ═══════════════════════════════════════════════════════════════ */

import type { BlogPost } from '@/types/blog';

export const BLOG_POSTS_BATCH4: BlogPost[] = [
  // ── POST 21 ─────────────────────────────────────────────────────
  {
    slug: 'lamp-oil-types-choosing-deepam',
    title: 'Lamp Oil Types: A Technical and Spiritual Guide to Choosing Pooja Deepam Oil',
    metaTitle: 'Lamp Oil Types Guide — Spiritual Significance & Technical Comparison 2025',
    metaDescription: 'Complete guide comparing different lamp oils (panchadeepa, sesame, coconut, castor, neem) — soot production, burn rate, viscosity, and religious significance.',
    category: 'pooja-products',
    tags: ['lamp oil', 'pooja oil', 'deepam oil', 'panchadeepa oil', 'sesame oil for lamp', 'temple lamp oil'],
    primaryKeyword: 'lamp oil types for pooja',
    secondaryKeywords: ['best oil for deepam', 'panchadeepa oil benefits', 'sesame oil vs coconut oil lamp', 'temple lamp oil ingredients'],
    lsiKeywords: ['lamp oil viscosity', 'clean burning oil', 'wick absorption oil', 'diya oil soot', 'panchadeepam'],
    searchIntent: 'informational',
    readTime: '8 min',
    wordCount: 2400,
    publishDate: '2025-07-01',
    modifiedDate: '2025-07-01',
    author: 'Kalasam Product Team',
    excerpt: 'Lighting a lamp (deepam or diya) is a central ritual in Hindu daily prayers. Different oils — sesame, coconut, castor, neem, and Panchadeepa oil blends — possess distinct chemical profiles, viscosity levels, and burning characteristics. This guide provides a full comparative analysis.',
    featuredImageAlt: 'Brass pooja lamps lit with clean burning lamp oil in a traditional temple setting',
    featuredImagePrompt: 'Close-up professional photograph of traditional Indian brass lamps lit and glowing warmly with marigold flower decorations on a wooden altar',
    schemaType: 'Guide',
    sections: [
      { type: 'p', text: 'Lighting a oil lamp (deepam, diya, or vilakku) is the first action performed in virtually every Hindu ritual and daily home prayer. Scientifically, lighting a lamp dispels darkness and purifies the air; spiritually, it represents the presence of the divine, knowledge, and prosperity. However, the choice of oil used in the lamp has significant practical and traditional implications.' },
      { type: 'h2', text: 'Comparison of Common Lamp Oils' },
      { type: 'table', table: {
        headers: ['Oil Type', 'Viscosity', 'Soot Level', 'Burn Rate', 'Spiritual Significance'],
        rows: [
          { cells: ['Sesame (Gingelly) Oil', 'Medium', 'Low', 'Moderate', 'Highly auspicious, dispels negativity'] },
          { cells: ['Coconut Oil', 'Low', 'Very Low', 'Fast', 'Brings peace, pleases Ganesha'] },
          { cells: ['Castor Oil', 'Very High', 'Low', 'Slow', 'Promotes relationship harmony'] },
          { cells: ['Neem Oil', 'Medium-High', 'Medium', 'Moderate', 'Pleases Goddess Durga, health benefits'] },
          { cells: ['Panchadeepa Oil Blend', 'Medium', 'Low', 'Moderate-Slow', 'Universal prosperity, most auspicious'] },
          { cells: ['Paraffin/Mineral Oil', 'Very Low', 'High (black soot)', 'Very Fast', 'Not recommended for pooja use'] },
        ],
      }},
      { type: 'h2', text: 'What is Panchadeepa (Panchadeepam) Oil?' },
      { type: 'p', text: 'Panchadeepa oil is a traditional blend of five oils specifically formulated for lighting lamps. The traditional recipe (panchadeepa yugam) dictates the mixing of:' },
      { type: 'ul', items: [
        'Sesame (Gingelly) Oil (35%): Acts as the main combustion base, providing a steady burn.',
        'Castor Oil (25%): Increases viscosity and slows down the burn rate, making the lamp last longer.',
        'Coconut Oil (15%): Lowers freezing point and viscosity for easy capillary action up the cotton wick.',
        'Neem Oil (15%): Provides insect-repelling properties and antimicrobial smoke.',
        'Mahua Oil or Pure Ghee (10%): Traditional spiritual components for fragrance and auspiciousness.',
      ]},
      { type: 'h2', text: 'Viscosity and Wick Capillary Action' },
      { type: 'p', text: 'From an engineering perspective, a lamp operates on capillary action. The liquid oil is drawn up the porous fibers of the cotton wick to the flame, where it vaporizes and combusts. Viscosity (thickness) is the key physical property determining how easily the oil climbs the wick. Castor oil has very high viscosity and requires a thicker wick to draw properly. Coconut oil has very low viscosity and climbs easily but burns quickly. Blended oils like Kalasam Lamp Oil are formulated to balance viscosity for consistent flame height without clog or rapid consumption.' },
    ],
    faqs: [
      { question: 'What is the best oil for lighting deepam?', answer: 'Sesame (gingelly) oil and Panchadeepa oil blends are considered the best and most auspicious oils for lighting deepam. They burn with a bright, steady, golden flame, produce very low soot, and carry positive spiritual associations. Coconut oil is also widely used, especially in South India. Ghee is the premium option for special occasions. Avoid paraffin or cheap mineral oils as they produce toxic black soot and burn too quickly.' },
      { question: 'What is Panchadeepa oil made of?', answer: 'Panchadeepa oil is a traditional blend of five oils: sesame oil, castor oil, coconut oil, neem oil, and mahua oil (or ghee) mixed in precise proportions. This combination balances the physical properties (viscosity, burn rate) and traditional benefits of each oil, providing a clean-burning, long-lasting lamp oil that repels insects and is highly auspicious.' },
    ],
    relatedSlugs: ['significance-camphor-hindu-rituals', 'sambrani-types-benefits-manufacturing', 'agarbathi-manufacturing-raw-materials-process'],
    internalLinks: [
      { text: 'Kalasam lamp oil range', href: '/products/kalasam-lamp-oil' },
      { text: 'pooja products', href: '/pooja-products' },
      { text: 'wholesale enquiry', href: '/wholesale' },
    ],
  },
  // ── POST 22 ─────────────────────────────────────────────────────
  {
    slug: 'camphor-cosmetics-skincare-benefits',
    title: 'Camphor in Cosmetics and Skincare: Benefits, Formulations & Safety Regulations',
    metaTitle: 'Camphor in Skincare & Cosmetics — Benefits & Safety 2025',
    metaDescription: 'Expert article on how camphor is used in cosmetics, skincare, and hair care formulations. Benefits, concentrations, and global regulatory limits.',
    category: 'industry-applications',
    tags: ['camphor cosmetics', 'camphor skincare', 'camphor for hair', 'camphor cream', 'cosmetic camphor'],
    primaryKeyword: 'camphor cosmetics benefits',
    secondaryKeywords: ['camphor in skincare', 'camphor safety cosmetics', 'camphor cream formulation', 'anti-acne camphor'],
    lsiKeywords: ['topical cooling agent', 'cosmetic grade camphor', 'EU cosmetic regulations camphor', 'terpene alcohol cosmetics'],
    searchIntent: 'informational',
    readTime: '7 min',
    wordCount: 2200,
    publishDate: '2025-07-08',
    modifiedDate: '2025-07-08',
    author: 'Kalasam Technical Team',
    excerpt: 'Camphor is valued in skincare for its cooling, soothing, and antimicrobial properties. Used in formulations ranging from anti-acne toners to lip balms and scalp treatments, its dosage must be carefully managed to comply with global cosmetic safety limits.',
    featuredImageAlt: 'Organic cosmetic skincare products with camphor essence on a marble slab',
    featuredImagePrompt: 'Clean modern cosmetic product layout showing bottles, cream jars, and green leaves on a white marble surface representing natural skincare ingredients',
    schemaType: 'Article',
    sections: [
      { type: 'p', text: 'Camphor is increasingly utilized in modern skincare and cosmetic formulations. Thanks to its dual cooling-warming action, antimicrobial characteristics, and ability to improve local microcirculation, it serves as a highly functional active ingredient in body creams, lip balms, acne treatments, and hair care products.' },
      { type: 'h2', text: 'Benefits of Camphor in Skincare' },
      { type: 'ul', items: [
        'Soothing and Cooling: Triggers cold receptors on skin to relieve itching and redness.',
        'Antimicrobial Action: Fights bacteria responsible for acne and scalp infections.',
        'Enhanced Circulation: Promotes healthy blood flow to skin cells, aiding in repair.',
      ]},
      { type: 'h2', text: 'Global Regulatory Limits' },
      { type: 'p', text: 'Because of camphor\'s potency, cosmetic authorities enforce strict limits. The EU Cosmetic Regulation allows a maximum of 3% in rinse-off products. In leave-on skin creams, concentrations are usually kept below 1% to ensure safety and prevent irritation.' },
    ],
    faqs: [
      { question: 'Is camphor safe in skincare products?', answer: 'Yes, camphor is safe when formulated at approved concentrations (typically 0.1% to 1% for leave-on face creams, up to 3% for rinse-off products). It should never be applied to broken skin or near the eyes.' },
    ],
    relatedSlugs: ['camphor-pharmaceutical-industry-applications', 'what-is-isoborneol-properties-uses'],
    internalLinks: [
      { text: 'industrial chemicals', href: '/industrial-chemicals' },
      { text: 'quality control standards', href: '/quality-control' },
    ],
  },
];
