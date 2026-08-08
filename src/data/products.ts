/* ═══════════════════════════════════════════════════════════════
   Product Seed Data — Carries forward from existing catalog
   ═══════════════════════════════════════════════════════════════ */

import type { Product } from '@/types';

/**
 * Hardcoded seed data used as fallback when Firestore is empty or unavailable.
 * The admin CMS writes to Firestore; these are initial defaults.
 */
export const seedProducts: Partial<Product>[] = [
  // ── Industrial Chemicals ──────────────────────────────────────
  {
    id: 'ic-1',
    name: 'Synthetic Camphor',
    slug: 'synthetic-camphor',
    category: 'Industrial Chemicals',
    shortDescription: 'High-purity synthetic camphor powder for pharmaceutical, fragrance, and chemical manufacturing applications.',
    description: 'Synthetic camphor is a widely used industrial input for pharmaceuticals, fragrance compounding, mothball/repellent manufacturing, and religious/pooja products. Jaikrishna Industries is a bulk manufacturer supplying powder-form synthetic camphor in standard 30kg bags with custom packing available for bulk/export buyers.',
    casNumber: '',
    molecularFormula: '',
    molecularWeight: '',
    purity: '',
    appearance: 'White crystalline powder or granules',
    odor: 'Characteristic camphoraceous',
    meltingPoint: '',
    boilingPoint: '',
    density: '',
    solubility: '',
    applications: [
      'Pharmaceutical manufacturing',
      'Fragrance and flavor industry',
      'Cellulose nitrate plasticizer',
      'Chemical synthesis intermediate',
      'Cosmetics and personal care',
      'Insect repellent formulations',
    ],
    benefits: [
      'Bulk manufacturer supply capacity',
      'Consistent batch quality control',
      'International shipping standards ready',
      'Flexible packaging customization options',
      'COA & MSDS available for verification',
    ],
    packaging: [
      { size: '30', unit: 'kg', description: 'Standard 30Kg bag supply' },
    ],
    downloads: [
      { type: 'MSDS', label: 'Material Safety Data Sheet (Placeholder)', url: '#' },
      { type: 'COA', label: 'Certificate of Analysis (Placeholder)', url: '#' },
    ],
    faq: [
      { question: 'Is custom packing available?', answer: 'Yes, we provide custom packing and sorting sizes on request for bulk and export shipments.' }
    ],
    images: ['/images/products/synthetic-camphor.png'],
    featured: true,
    exportAvailable: true,
    status: 'active',
    order: 1,
    seo: {
      metaTitle: 'Synthetic Camphor Manufacturer | Bulk Supplier India',
      metaDescription: 'Leading synthetic camphor manufacturer & exporter from Theni, India. Bulk powder supply in 30kg bags, custom packing available. Get a quote today.',
      keywords: 'synthetic camphor manufacturer India, synthetic camphor bulk supplier, synthetic camphor exporter, synthetic camphor powder 30kg, buy synthetic camphor wholesale'
    }
  },
  {
    id: 'ic-2',
    name: 'D-Camphor',
    slug: 'd-camphor',
    category: 'Industrial Chemicals',
    shortDescription: 'Dextrorotatory natural camphor for pharmaceutical and specialty chemical applications.',
    description: 'D-camphor (the dextrorotatory isomer) is used in pharmaceutical formulations, fragrance blending, and specialty chemical applications where isomer purity matters to buyers. Sourced by top-tier laboratories and specialized global manufacturers.',
    casNumber: '',
    molecularFormula: '',
    molecularWeight: '',
    purity: '',
    appearance: 'White crystalline solid',
    applications: [
      'Pharmaceutical formulations',
      'Chiral synthesis',
      'Fragrance and cosmetic formulation',
      'Specialty chemicals',
    ],
    benefits: [
      'High isomer purity parameters',
      'Consistent batch-to-batch properties',
      'Global export packaging standards',
    ],
    packaging: [
      { size: '30', unit: 'kg', description: 'Standard 30Kg bag supply' },
    ],
    downloads: [],
    faq: [],
    images: ['/images/products/synthetic-camphor.png'],
    featured: true,
    exportAvailable: true,
    status: 'active',
    order: 2,
    seo: {
      metaTitle: 'D-Camphor Manufacturer & Exporter | Bulk Powder India',
      metaDescription: 'D-Camphor (dextro-camphor) powder manufactured in Theni, Tamil Nadu. Bulk 30kg bag supply for pharma, fragrance & industrial use. Custom packing available.',
      keywords: 'D-camphor manufacturer, D-camphor powder supplier India, D-camphor exporter, dextro camphor bulk supply'
    }
  },
  {
    id: 'ic-3',
    name: 'Isoborneol',
    slug: 'isoborneol',
    category: 'Industrial Chemicals',
    shortDescription: 'Industrial-grade isoborneol powder for fragrance synthesis and chemical intermediate manufacturing.',
    description: 'Isoborneol is a key intermediate primarily used in fragrance/flavor synthesis and as a precursor in camphor derivative production. Sourced globally in bulk powder form.',
    casNumber: '',
    molecularFormula: '',
    molecularWeight: '',
    purity: '',
    appearance: 'White powder',
    applications: [
      'Camphor derivative intermediate',
      'Fragrance compounds formulation',
      'Chemical synthesis processing',
    ],
    packaging: [
      { size: '30', unit: 'kg', description: 'Standard 30Kg bag supply' },
    ],
    downloads: [],
    faq: [],
    images: ['/images/products/isoborneol.png'],
    featured: true,
    exportAvailable: true,
    status: 'active',
    order: 3,
    seo: {
      metaTitle: 'Isoborneol Powder Manufacturer | Bulk Supplier India',
      metaDescription: 'Isoborneol powder manufacturer from Theni, India. High-quality bulk supply in 30kg bags for fragrance & chemical intermediates. Custom packing on request.',
      keywords: 'isoborneol manufacturer India, isoborneol powder supplier, isoborneol bulk exporter, isoborneol flakes and powder'
    }
  },
  {
    id: 'ic-4',
    name: 'Camphor Oil',
    slug: 'camphor-oil',
    category: 'Industrial Chemicals',
    shortDescription: 'Pure camphor essential oil for fragrance, pharmaceutical, and industrial applications.',
    description: 'Camphor oil is used across pharmaceutical, fragrance, and industrial applications. Since packing is fully custom, we offer tailored volumes, drum weights, and container packing configurations directly on request to suit buyer specifications.',
    casNumber: '',
    molecularFormula: '',
    molecularWeight: '',
    purity: '',
    appearance: 'Clear liquid',
    applications: [
      'Pharmaceutical balms and ointments',
      'Fragrance blending and compounding',
      'Industrial chemical intermediates',
    ],
    packaging: [
      { size: 'Custom', unit: 'drum', description: 'Custom packaging size on request' },
    ],
    downloads: [],
    faq: [],
    images: ['/images/products/synthetic-camphor.png'],
    featured: true,
    exportAvailable: true,
    status: 'active',
    order: 4,
    seo: {
      metaTitle: 'Camphor Oil Manufacturer & Bulk Exporter | India',
      metaDescription: 'Camphor oil manufacturer and exporter from Tamil Nadu, India. Custom packing and volumes for industrial, pharma & fragrance buyers. Request a quote.',
      keywords: 'camphor oil manufacturer India, camphor oil bulk supplier, camphor oil exporter Tamil Nadu, industrial camphor oil supply'
    }
  },

  // ── Pooja / Traditional Products ──────────────────────────────
  {
    id: 'pp-bhimseni',
    name: 'Bhimseni / Pachi Karpooram',
    slug: 'bhimseni-pachi-karpooram',
    category: 'Pooja Products',
    shortDescription: 'Pure traditional Bhimseni camphor flakes for residue-free temple and home prayer burning.',
    description: 'Bhimseni camphor (also known as Pachi Karpooram in Tamil) is a traditionally preferred camphor form for temple and home pooja rituals, valued for burning without residue. Diffuses a pure, calming aroma that clears negative energies.',
    appearance: 'White crystalline flakes',
    applications: [
      'Temple worship and regular pooja',
      'Air purification and home aarti',
      'Spiritual energy cleansing',
    ],
    variants: [
      {
        id: 'pp-bhimseni-v1',
        sku: 'PK005',
        attributes: { packSize: 'Pack' },
        packingType: 'Pack format',
        materialType: 'Flakes',
        customPackingAvailable: true,
        sortOrder: 1
      },
      {
        id: 'pp-bhimseni-v2',
        sku: 'PK005-1',
        attributes: { packSize: 'Box' },
        packingType: 'Box format',
        materialType: 'Flakes',
        customPackingAvailable: true,
        sortOrder: 2
      }
    ],
    images: ['/images/products/synthetic-camphor.png'],
    status: 'active',
    order: 5,
    seo: {
      metaTitle: 'Bhimseni Camphor (Pachi Karpooram) | Pooja Camphor Flakes',
      metaDescription: 'Pure Bhimseni camphor (Pachi Karpooram) flakes for pooja and religious use. Available in pack and box formats. Manufactured by Kalasam, Theni, India.',
      keywords: 'Bhimseni camphor, Pachi Karpooram, pure camphor for pooja, temple camphor supplier India, Bhimseni camphor wholesale'
    }
  },

  // ── Kalasam Camphor Tablets Separate Pages ─────────────────────
  {
    id: 'kct-rs1',
    name: 'Kalasam Camphor Rs1',
    slug: 'kalasam-camphor-rs1',
    category: 'Pooja Products',
    shortDescription: 'Budget-friendly pure camphor tablets in Rs1 pocket format.',
    description: 'Kalasam Camphor Rs1 Tablets are premium refined pure camphor tablets in a convenient pocket/strip format. Formulated for a residue-free clean burn, perfect for daily home prayers and light worship needs.',
    specifications: [
      { label: 'Purity', value: 'Technical Spec Placeholder' },
      { label: 'Form', value: 'Compressed tablets' },
      { label: 'Residue', value: 'Zero (clean burn)' }
    ],
    variants: [
      {
        id: 'kct-rs1-v1',
        sku: 'KC006',
        attributes: { packSize: 'Standard' },
        packingType: '50 Pack Per Cover',
        materialType: 'Round Tablets',
        customPackingAvailable: true,
        sortOrder: 1
      }
    ],
    images: ['/images/products/synthetic-camphor.png'],
    status: 'active',
    order: 10,
    seo: {
      metaTitle: 'Kalasam Camphor Rs1 Tablets | Pooja Camphor Pack',
      metaDescription: 'Kalasam Camphor Rs1 round tablets, 50 packs per cover. Pure camphor for daily pooja use. Manufactured by Kalasam, Theni, India.',
      keywords: 'camphor tablets Rs1, pooja camphor small pack, Kalasam camphor Rs1, budget camphor tablets India'
    }
  },
  {
    id: 'kct-rs2',
    name: 'Kalasam Camphor Rs2',
    slug: 'kalasam-camphor-rs2',
    category: 'Pooja Products',
    shortDescription: 'Refined pure camphor tablets in Rs2 retail strip format.',
    description: 'Kalasam Camphor Rs2 Tablets are pure, refined camphor tablets packed cleanly in a budget-friendly size. Burning with a bright, smokeless flame, it is ideal for daily aarti and home purification.',
    specifications: [
      { label: 'Purity', value: 'Technical Spec Placeholder' },
      { label: 'Form', value: 'Compressed tablets' }
    ],
    variants: [
      {
        id: 'kct-rs2-v1',
        sku: 'KC007',
        attributes: { packSize: 'Standard' },
        packingType: '50 Pack Per Cover',
        materialType: 'Round Tablets',
        customPackingAvailable: true,
        sortOrder: 1
      }
    ],
    images: ['/images/products/synthetic-camphor.png'],
    status: 'active',
    order: 11,
    seo: {
      metaTitle: 'Kalasam Camphor Rs2 Tablets | Pooja Camphor Pack',
      metaDescription: 'Kalasam Camphor Rs2 round tablets, 50 packs per cover. Trusted pooja camphor from Theni, India — ideal for retail and daily worship.',
      keywords: 'camphor tablets Rs2, pooja camphor retail pack, Kalasam camphor Rs2'
    }
  },
  {
    id: 'kct-rs5',
    name: 'Kalasam Camphor Rs5',
    slug: 'kalasam-camphor-rs5',
    category: 'Pooja Products',
    shortDescription: 'Traditional round camphor tablets in Rs5 covers, available in 2 packing sizes.',
    description: 'Kalasam Camphor Rs5 Tablets are the standard value-pack round tablets preferred by households across South India. Burns cleanly leaving zero black ash or soot behind, ensuring a pure devotional atmosphere.',
    specifications: [
      { label: 'Purity', value: 'Technical Spec Placeholder' },
      { label: 'Form', value: 'Compressed tablets' }
    ],
    variants: [
      {
        id: 'kct-rs5-v1',
        sku: 'KC008',
        attributes: { packSize: '40 Pack' },
        packingType: '40 Pack Per Cover',
        materialType: 'Round Tablets',
        customPackingAvailable: true,
        sortOrder: 1
      },
      {
        id: 'kct-rs5-v2',
        sku: 'KC009',
        attributes: { packSize: '25 Pack' },
        packingType: '25 Pack Per Cover',
        materialType: 'Round Tablets',
        customPackingAvailable: true,
        sortOrder: 2
      }
    ],
    images: ['/images/products/synthetic-camphor.png'],
    status: 'active',
    order: 12,
    seo: {
      metaTitle: 'Kalasam Camphor Rs5 Tablets | Pooja Camphor — 2 Pack Sizes',
      metaDescription: 'Kalasam Camphor Rs5 round tablets, available in 40-pack or 25-pack covers. Pure camphor for pooja and temple use, made in Theni, India.',
      keywords: 'camphor tablets Rs5, Kalasam camphor Rs5, pooja camphor 40 pack, temple camphor tablets'
    }
  },
  {
    id: 'kct-rs10',
    name: 'Kalasam Camphor Rs10',
    slug: 'kalasam-camphor-rs10',
    category: 'Pooja Products',
    shortDescription: 'Premium round camphor tablets in Rs10 covers, available in 2 packing sizes.',
    description: 'Kalasam Camphor Rs10 Tablets offer a generous count of highly compressed pure camphor tablets. The choice of 40-pack or 20-pack formats makes it convenient for retail shops and regular daily home prayers.',
    specifications: [
      { label: 'Purity', value: 'Technical Spec Placeholder' },
      { label: 'Form', value: 'Compressed tablets' }
    ],
    variants: [
      {
        id: 'kct-rs10-v1',
        sku: 'KC010',
        attributes: { packSize: '40 Pack' },
        packingType: '40 Pack Per Cover',
        materialType: 'Round Tablets',
        customPackingAvailable: true,
        sortOrder: 1
      },
      {
        id: 'kct-rs10-v2',
        sku: 'KC011',
        attributes: { packSize: '20 Pack' },
        packingType: '20 Pack Per Cover',
        materialType: 'Round Tablets',
        customPackingAvailable: true,
        sortOrder: 2
      }
    ],
    images: ['/images/products/synthetic-camphor.png'],
    status: 'active',
    order: 13,
    seo: {
      metaTitle: 'Kalasam Camphor Rs10 Tablets | Pooja Camphor — 2 Pack Sizes',
      metaDescription: 'Kalasam Camphor Rs10 round tablets, available in 40-pack or 20-pack covers. Bulk-friendly pooja camphor from Theni, India.',
      keywords: 'camphor tablets Rs10, Kalasam camphor Rs10, bulk pooja camphor pack'
    }
  },
  {
    id: 'kct-15g',
    name: 'Kalasam Camphor 15G',
    slug: 'kalasam-camphor-15g',
    category: 'Pooja Products',
    shortDescription: '15g premium refined camphor tablets in custom shapes.',
    description: 'Kalasam Camphor 15G retail packs offer exactly weighed premium refined camphor tablets. Available in three custom shapes (Big Round, Small Round, or flat Tablet-Shape) to meet regional preferences and retail packaging requirements.',
    variants: [
      {
        id: 'kct-15g-v1',
        sku: 'KC012',
        attributes: { shape: 'Big Round' },
        packingType: '33 Pack Half-Kg Cover',
        materialType: 'Big Round Tablets',
        customPackingAvailable: true,
        sortOrder: 1
      },
      {
        id: 'kct-15g-v2',
        sku: 'KC013',
        attributes: { shape: 'Small Round' },
        packingType: '33 Pack Half-Kg Cover',
        materialType: 'Small Round Tablets',
        customPackingAvailable: true,
        sortOrder: 2
      },
      {
        id: 'kct-15g-v3',
        sku: 'KC014',
        attributes: { shape: 'Tablet-Shape' },
        packingType: '33 Pack Half-Kg Cover',
        materialType: 'Tablet-shaped Camphor',
        customPackingAvailable: true,
        sortOrder: 3
      }
    ],
    images: ['/images/products/synthetic-camphor.png'],
    status: 'active',
    order: 14,
    seo: {
      metaTitle: 'Kalasam Camphor Tablets 15g | Big Round, Small Round & Tablet-Shape',
      metaDescription: '15g Kalasam camphor tablets, choice of big round, small round, or tablet-shaped. 33 packs per half-kg cover. Pure pooja camphor, Theni, India.',
      keywords: '15g camphor tablets, Kalasam camphor 15 gram, round camphor tablets, tablet shape camphor pooja'
    }
  },
  {
    id: 'kct-20g',
    name: 'Kalasam Camphor 20G',
    slug: 'kalasam-camphor-20g',
    category: 'Pooja Products',
    shortDescription: '20g premium refined camphor tablets in custom shapes.',
    description: 'Kalasam Camphor 20G is a mid-sized retail pack ideal for monthly household prayer supplies. The tablets are manufactured to burn for a long duration, casting a clear flame with a pleasant therapeutic aroma.',
    variants: [
      {
        id: 'kct-20g-v1',
        sku: 'KC015',
        attributes: { shape: 'Big Round' },
        packingType: '25 Pack Half-Kg Cover',
        materialType: 'Big Round Tablets',
        customPackingAvailable: true,
        sortOrder: 1
      },
      {
        id: 'kct-20g-v2',
        sku: 'KC016',
        attributes: { shape: 'Small Round' },
        packingType: '25 Pack Half-Kg Cover',
        materialType: 'Small Round Tablets',
        customPackingAvailable: true,
        sortOrder: 2
      },
      {
        id: 'kct-20g-v3',
        sku: 'KC017',
        attributes: { shape: 'Tablet-Shape' },
        packingType: '25 Pack Half-Kg Cover',
        materialType: 'Tablet-shaped Camphor',
        customPackingAvailable: true,
        sortOrder: 3
      }
    ],
    images: ['/images/products/synthetic-camphor.png'],
    status: 'active',
    order: 15,
    seo: {
      metaTitle: 'Kalasam Camphor Tablets 20g | Big Round, Small Round & Tablet-Shape',
      metaDescription: '20g Kalasam camphor tablets in three shapes — big round, small round, tablet-shape. 25 packs per half-kg cover. Manufactured in Theni, India.',
      keywords: '20g camphor tablets, Kalasam camphor 20 gram, pooja camphor half kg cover'
    }
  },
  {
    id: 'kct-25g',
    name: 'Kalasam Camphor 25G',
    slug: 'kalasam-camphor-25g',
    category: 'Pooja Products',
    shortDescription: '25g premium refined camphor tablets in custom shapes.',
    description: 'Kalasam Camphor 25G retail packs deliver pure, high-potency camphor tablets in a selection of shape configurations. Sourced by distributors for regional retail chains across India.',
    variants: [
      {
        id: 'kct-25g-v1',
        sku: 'KC018',
        attributes: { shape: 'Big Round' },
        packingType: '20 Pack Half-Kg Cover',
        materialType: 'Big Round Tablets',
        customPackingAvailable: true,
        sortOrder: 1
      },
      {
        id: 'kct-25g-v2',
        sku: 'KC019',
        attributes: { shape: 'Small Round' },
        packingType: '20 Pack Half-Kg Cover',
        materialType: 'Small Round Tablets',
        customPackingAvailable: true,
        sortOrder: 2
      },
      {
        id: 'kct-25g-v3',
        sku: 'KC020',
        attributes: { shape: 'Tablet-Shape' },
        packingType: '20 Pack Half-Kg Cover',
        materialType: 'Tablet-shaped Camphor',
        customPackingAvailable: true,
        sortOrder: 3
      }
    ],
    images: ['/images/products/synthetic-camphor.png'],
    status: 'active',
    order: 16,
    seo: {
      metaTitle: 'Kalasam Camphor Tablets 25g | Big Round, Small Round & Tablet-Shape',
      metaDescription: '25g Kalasam camphor tablets — big round, small round, or tablet-shape. 20 packs per half-kg cover. Pure pooja camphor from Theni, India.',
      keywords: '25g camphor tablets, Kalasam camphor 25 gram, pooja camphor wholesale pack'
    }
  },
  {
    id: 'kct-40g',
    name: 'Kalasam Camphor 40G',
    slug: 'kalasam-camphor-40g',
    category: 'Pooja Products',
    shortDescription: '40g premium refined camphor tablets in custom shapes.',
    description: 'Kalasam Camphor 40G tablets are perfect for temples, festive seasons, and larger devotional ceremonies. Highly refined composition guarantees 100% ash-free combustion.',
    variants: [
      {
        id: 'kct-40g-v1',
        sku: 'KC021',
        attributes: { shape: 'Big Round' },
        packingType: '12 Pack Half-Kg Cover',
        materialType: 'Big Round Tablets',
        customPackingAvailable: true,
        sortOrder: 1
      },
      {
        id: 'kct-40g-v2',
        sku: 'KC022',
        attributes: { shape: 'Small Round' },
        packingType: '12 Pack Half-Kg Cover',
        materialType: 'Small Round Tablets',
        customPackingAvailable: true,
        sortOrder: 2
      },
      {
        id: 'kct-40g-v3',
        sku: 'KC023',
        attributes: { shape: 'Tablet-Shape' },
        packingType: '12 Pack Half-Kg Cover',
        materialType: 'Tablet-shaped Camphor',
        customPackingAvailable: true,
        sortOrder: 3
      }
    ],
    images: ['/images/products/synthetic-camphor.png'],
    status: 'active',
    order: 17,
    seo: {
      metaTitle: 'Kalasam Camphor Tablets 40g | Big Round, Small Round & Tablet-Shape',
      metaDescription: '40g Kalasam camphor tablets, 3 shape options, 12 packs per half-kg cover. Trusted pooja camphor manufacturer, Theni, India.',
      keywords: '40g camphor tablets, Kalasam camphor 40 gram, large camphor tablets pooja'
    }
  },
  {
    id: 'kct-50g',
    name: 'Kalasam Camphor 50G',
    slug: 'kalasam-camphor-50g',
    category: 'Pooja Products',
    shortDescription: '50g premium refined camphor tablets in custom shapes.',
    description: 'Kalasam Camphor 50G is the largest standard retail box pack offered. Combining long burning times with an authentic camphoraceous aroma, it is the preferred choice for major rituals and temple use.',
    variants: [
      {
        id: 'kct-50g-v1',
        sku: 'KC024',
        attributes: { shape: 'Big Round' },
        packingType: '10 Pack Half-Kg Cover',
        materialType: 'Big Round Tablets',
        customPackingAvailable: true,
        sortOrder: 1
      },
      {
        id: 'kct-50g-v2',
        sku: 'KC025',
        attributes: { shape: 'Small Round' },
        packingType: '10 Pack Half-Kg Cover',
        materialType: 'Small Round Tablets',
        customPackingAvailable: true,
        sortOrder: 2
      },
      {
        id: 'kct-50g-v3',
        sku: 'KC026',
        attributes: { shape: 'Tablet-Shape' },
        packingType: '10 Pack Half-Kg Cover',
        materialType: 'Tablet-shaped Camphor',
        customPackingAvailable: true,
        sortOrder: 3
      }
    ],
    images: ['/images/products/synthetic-camphor.png'],
    status: 'active',
    order: 18,
    seo: {
      metaTitle: 'Kalasam Camphor Tablets 50g | Big Round, Small Round & Tablet-Shape',
      metaDescription: '50g Kalasam camphor tablets, 3 shape options, 10 packs per half-kg cover. Ideal for temples and bulk pooja use. Made in Theni, India.',
      keywords: '50g camphor tablets, Kalasam camphor 50 gram, temple camphor bulk pack'
    }
  },
  {
    id: 'kct-bulk',
    name: 'Kalasam Camphor Tablets (Bulk, Half/1kg)',
    slug: 'kalasam-camphor-tablets-bulk',
    category: 'Pooja Products',
    shortDescription: 'Wholesale bulk packs of Kalasam camphor tablets in 500g and 1kg sizes.',
    description: 'Kalasam Camphor Tablets Bulk Packs are specifically prepared for wholesale buyers, packaging distributors, and major religious institutions. Offered in half-kilogram and one-kilogram packs in three shape variants.',
    variants: [
      {
        id: 'kct-bulk-v1',
        sku: 'KC027',
        attributes: { shape: 'Big Round' },
        packingType: 'Half/One Kg Pack',
        materialType: 'Big Round Tablets',
        customPackingAvailable: true,
        sortOrder: 1
      },
      {
        id: 'kct-bulk-v2',
        sku: 'KC028',
        attributes: { shape: 'Small Round' },
        packingType: 'Half/One Kg Pack',
        materialType: 'Small Round Tablets',
        customPackingAvailable: true,
        sortOrder: 2
      },
      {
        id: 'kct-bulk-v3',
        sku: 'KC029',
        attributes: { shape: 'Tablet-Shape' },
        packingType: 'Half/One Kg Pack',
        materialType: 'Tablet-shaped Camphor',
        customPackingAvailable: true,
        sortOrder: 3
      }
    ],
    images: ['/images/products/synthetic-camphor.png'],
    status: 'active',
    order: 19,
    seo: {
      metaTitle: 'Kalasam Camphor Tablets — Bulk Half/1kg Pack | Wholesale',
      metaDescription: 'Bulk Kalasam camphor tablets in half-kg or 1kg packs, 3 shape options. Ideal for distributors, temples & wholesale buyers. Theni, India.',
      keywords: 'bulk camphor tablets, wholesale camphor pooja, 1kg camphor pack India, camphor tablets distributor'
    }
  }
];
