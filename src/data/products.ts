/* ═══════════════════════════════════════════════════════════════
   Product Seed Data — Carries forward from existing catalog
   ═══════════════════════════════════════════════════════════════ */

import type { Product } from '@/types';

/**
 * Hardcoded seed data used as fallback when Firestore is empty or unavailable.
 * The admin CMS writes to Firestore; these are initial defaults.
 */
export const seedProducts: Partial<Product>[] = [
  // ── Industrial Products ──────────────────────────────────────
  {
    id: 'ic-1',
    name: 'Synthetic Camphor',
    slug: 'synthetic-camphor',
    category: 'Industrial Product',
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
    category: 'Industrial Product',
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
    category: 'Industrial Product',
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
    category: 'Industrial Product',
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

  // ── Camphor Products ──────────────────────────────────────────
  {
    id: 'pp-bhimseni',
    name: 'Bhimseni / Pachi Karpooram',
    slug: 'bhimseni-pachi-karpooram',
    category: 'Camphor',
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
    category: 'Camphor',
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
    category: 'Camphor',
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
    category: 'Camphor',
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
    category: 'Camphor',
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
      metaDescription: 'Kalasam Camphor Rs10 round tablets, 40-pack or 20-pack covers. Refined pure camphor for daily home prayers and temple aarti. Made in Theni, India.',
      keywords: 'camphor tablets Rs10, pooja camphor 20 pack, Kalasam camphor Rs10'
    }
  },
  {
    id: 'kct-15g',
    name: 'Kalasam Camphor 15G',
    slug: 'kalasam-camphor-15g',
    category: 'Camphor',
    shortDescription: 'Kalasam pure camphor tablets in 15g pack format, available in 4 tablet shapes.',
    description: 'Kalasam Camphor 15g Tablets provide an ideal quantity of premium clean-burning camphor for weekly household pooja. Available in Big Round, Small Round, Square, and Tablet-Shape options.',
    specifications: [
      { label: 'Purity', value: 'Technical Spec Placeholder' },
      { label: 'Pack Weight', value: '15 Grams' },
      { label: 'Shape Options', value: 'Big Round, Small Round, Square, Tablet-Shape' }
    ],
    variants: [
      {
        id: 'kct-15g-v1',
        sku: 'KC012',
        attributes: { shape: 'Big Round' },
        packingType: '20 Pack Half-Kg Cover',
        materialType: 'Big Round Tablets',
        customPackingAvailable: true,
        sortOrder: 1
      },
      {
        id: 'kct-15g-v2',
        sku: 'KC013',
        attributes: { shape: 'Small Round' },
        packingType: '20 Pack Half-Kg Cover',
        materialType: 'Small Round Tablets',
        customPackingAvailable: true,
        sortOrder: 2
      },
      {
        id: 'kct-15g-v3',
        sku: 'KC014',
        attributes: { shape: 'Square' },
        packingType: '20 Pack Half-Kg Cover',
        materialType: 'Square Tablets',
        customPackingAvailable: true,
        sortOrder: 3
      },
      {
        id: 'kct-15g-v4',
        sku: 'KC015',
        attributes: { shape: 'Tablet-Shape' },
        packingType: '20 Pack Half-Kg Cover',
        materialType: 'Tablet-shaped Camphor',
        customPackingAvailable: true,
        sortOrder: 4
      }
    ],
    images: ['/images/products/synthetic-camphor.png'],
    status: 'active',
    order: 14,
    seo: {
      metaTitle: 'Kalasam Camphor Tablets 15g | 4 Shapes Available',
      metaDescription: '15g Kalasam camphor tablets in Big Round, Small Round, Square & Tablet-Shape. 20 packs per half-kg cover. Pure camphor made in Theni, India.',
      keywords: '15g camphor tablets, Kalasam camphor 15 gram, square camphor tablets, pooja camphor shapes'
    }
  },
  {
    id: 'kct-20g',
    name: 'Kalasam Camphor 20G',
    slug: 'kalasam-camphor-20g',
    category: 'Camphor',
    shortDescription: 'Kalasam pure camphor tablets in 20g format, available in 3 tablet shapes.',
    description: 'Kalasam Camphor 20g Tablets are prepared from pure refined camphor, pressed into durable, easy-to-light tablets. Available in Big Round, Small Round, and Tablet-Shape formats.',
    specifications: [
      { label: 'Purity', value: 'Technical Spec Placeholder' },
      { label: 'Pack Weight', value: '20 Grams' },
      { label: 'Shape Options', value: 'Big Round, Small Round, Tablet-Shape' }
    ],
    variants: [
      {
        id: 'kct-20g-v1',
        sku: 'KC016',
        attributes: { shape: 'Big Round' },
        packingType: '20 Pack Half-Kg Cover',
        materialType: 'Big Round Tablets',
        customPackingAvailable: true,
        sortOrder: 1
      },
      {
        id: 'kct-20g-v2',
        sku: 'KC017',
        attributes: { shape: 'Small Round' },
        packingType: '20 Pack Half-Kg Cover',
        materialType: 'Small Round Tablets',
        customPackingAvailable: true,
        sortOrder: 2
      },
      {
        id: 'kct-20g-v3',
        sku: 'KC018',
        attributes: { shape: 'Tablet-Shape' },
        packingType: '20 Pack Half-Kg Cover',
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
      metaDescription: '20g Kalasam camphor tablets in 3 shapes, 20 packs per half-kg cover. Premium pooja camphor from Theni, India.',
      keywords: '20g camphor tablets, Kalasam camphor 20 gram, round camphor tablets'
    }
  },
  {
    id: 'kct-25g',
    name: 'Kalasam Camphor 25G',
    slug: 'kalasam-camphor-25g',
    category: 'Camphor',
    shortDescription: 'Kalasam pure camphor tablets in 25g packs, available in 3 tablet shapes.',
    description: 'Kalasam Camphor 25g Tablets offer an extended-use pooja pack suitable for regular temple visits, festival preparations, and daily home aarti.',
    specifications: [
      { label: 'Purity', value: 'Technical Spec Placeholder' },
      { label: 'Pack Weight', value: '25 Grams' },
      { label: 'Shape Options', value: 'Big Round, Small Round, Tablet-Shape' }
    ],
    variants: [
      {
        id: 'kct-25g-v1',
        sku: 'KC019',
        attributes: { shape: 'Big Round' },
        packingType: '20 Pack Half-Kg Cover',
        materialType: 'Big Round Tablets',
        customPackingAvailable: true,
        sortOrder: 1
      },
      {
        id: 'kct-25g-v2',
        sku: 'KC020',
        attributes: { shape: 'Small Round' },
        packingType: '20 Pack Half-Kg Cover',
        materialType: 'Small Round Tablets',
        customPackingAvailable: true,
        sortOrder: 2
      },
      {
        id: 'kct-25g-v3',
        sku: 'KC021',
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
      metaTitle: 'Kalasam Camphor Tablets 25g | 3 Shape Variations',
      metaDescription: '25g Kalasam camphor tablets, available in 3 shapes, 20 packs per half-kg cover. Long-burning pure pooja camphor from Theni, India.',
      keywords: '25g camphor tablets, Kalasam camphor 25 gram, pooja camphor tablets wholesale'
    }
  },
  {
    id: 'kct-40g',
    name: 'Kalasam Camphor 40G',
    slug: 'kalasam-camphor-40g',
    category: 'Camphor',
    shortDescription: 'Larger 40g format Kalasam pure camphor tablets, available in 2 shapes.',
    description: 'Kalasam Camphor 40g Tablets are ideal for households with daily multi-aarti rituals and small temples. High-density compression ensures steady, complete burning.',
    specifications: [
      { label: 'Purity', value: 'Technical Spec Placeholder' },
      { label: 'Pack Weight', value: '40 Grams' },
      { label: 'Shape Options', value: 'Big Round, Small Round' }
    ],
    variants: [
      {
        id: 'kct-40g-v1',
        sku: 'KC022',
        attributes: { shape: 'Big Round' },
        packingType: '10 Pack Half-Kg Cover',
        materialType: 'Big Round Tablets',
        customPackingAvailable: true,
        sortOrder: 1
      },
      {
        id: 'kct-40g-v2',
        sku: 'KC023',
        attributes: { shape: 'Small Round' },
        packingType: '10 Pack Half-Kg Cover',
        materialType: 'Small Round Tablets',
        customPackingAvailable: true,
        sortOrder: 2
      }
    ],
    images: ['/images/products/synthetic-camphor.png'],
    status: 'active',
    order: 17,
    seo: {
      metaTitle: 'Kalasam Camphor Tablets 40g | Big Round & Small Round',
      metaDescription: '40g Kalasam camphor tablets, 2 shape options, 10 packs per half-kg cover. High-density pure camphor for pooja. Made in Theni, India.',
      keywords: '40g camphor tablets, Kalasam camphor 40 gram, large camphor pack'
    }
  },
  {
    id: 'kct-50g',
    name: 'Kalasam Camphor 50G',
    slug: 'kalasam-camphor-50g',
    category: 'Camphor',
    shortDescription: 'Generous 50g packs of Kalasam pure camphor tablets, available in 3 tablet shapes.',
    description: 'Kalasam Camphor 50g Tablets are designed for regular temple donors, large households, and community prayer events. Burns completely without ash residue.',
    specifications: [
      { label: 'Purity', value: 'Technical Spec Placeholder' },
      { label: 'Pack Weight', value: '50 Grams' },
      { label: 'Shape Options', value: 'Big Round, Small Round, Tablet-Shape' }
    ],
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
    category: 'Camphor',
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
  },

  // ── Kalasam Lamp Oil Range ──────────────────────────────────────
  {
    id: 'klo-50ml',
    name: 'Kalasam Lamp Oil 50ml',
    slug: 'kalasam-lamp-oil-50ml',
    category: 'Lamp Oil',
    shortDescription: 'Pure lamp oil in a compact 50ml bottle for daily household pooja.',
    description: 'A small, everyday-use bottle of pure lamp oil for daily household pooja and diya (oil lamp) lighting — positioned as the entry-size option for individual/home buyers.',
    specifications: [
      { label: 'Material Type', value: 'Pure' },
      { label: 'Volume', value: '50ml' },
      { label: 'Packing', value: 'Bottle' }
    ],
    applications: [
      'Daily household pooja and aarti',
      'Diya and agal vilakku lighting',
      'Small home shrines and prayer rooms',
      'Travel-size pooja essentials',
    ],
    benefits: [
      'Pure lamp oil for clean, steady flame',
      'Compact size ideal for daily home use',
      'Low-smoke burn for indoor worship',
      'Manufactured in Theni, Tamil Nadu',
    ],
    packaging: [
      { size: '50', unit: 'ml', description: '50ml bottle' },
    ],
    downloads: [],
    faq: [
      { question: 'Is this lamp oil suitable for brass diyas?', answer: 'Yes, Kalasam pure lamp oil is suitable for all types of traditional brass, copper, and clay diyas and agal vilakkus.' }
    ],
    variants: [
      {
        id: 'klo-50ml-v1',
        sku: 'KL030',
        attributes: { volume: '50ml' },
        packingType: '50ml Bottle',
        materialType: 'Pure',
        customPackingAvailable: true,
        sortOrder: 1
      }
    ],
    images: ['/images/products/lamp-oil-placeholder.png'],
    featured: false,
    exportAvailable: false,
    status: 'active',
    order: 30,
    seo: {
      metaTitle: 'Kalasam Lamp Oil 50ml | Pure Pooja Lamp Oil',
      metaDescription: 'Kalasam pure lamp oil, 50ml bottle. Ideal for daily pooja and diya lighting at home. Manufactured by Kalasam, Theni, India.',
      keywords: 'lamp oil for pooja, Kalasam lamp oil 50ml, pure lamp oil small bottle, diya oil India, agal vilakku oil'
    }
  },
  {
    id: 'klo-100ml',
    name: 'Kalasam Lamp Oil 100ml',
    slug: 'kalasam-lamp-oil-100ml',
    category: 'Lamp Oil',
    shortDescription: 'Pure lamp oil in a 100ml bottle for regular daily household worship.',
    description: 'A step-up household size from the 50ml bottle, suited to regular daily-use households or small shrines.',
    specifications: [
      { label: 'Material Type', value: 'Pure' },
      { label: 'Volume', value: '100ml' },
      { label: 'Packing', value: 'Bottle' }
    ],
    applications: [
      'Daily household pooja and aarti',
      'Diya and agal vilakku lighting',
      'Small shrines and home temples',
      'Neighbourhood shops and kirana stores',
    ],
    benefits: [
      'Pure lamp oil for clean, steady flame',
      'Regular household size for daily use',
      'Low-smoke burn for indoor worship',
      'Manufactured in Theni, Tamil Nadu',
    ],
    packaging: [
      { size: '100', unit: 'ml', description: '100ml bottle' },
    ],
    downloads: [],
    faq: [
      { question: 'How long does 100ml of lamp oil last?', answer: 'Approximately 8-12 hours of continuous diya lighting depending on wick size, making it suitable for 1-2 weeks of daily household pooja use.' }
    ],
    variants: [
      {
        id: 'klo-100ml-v1',
        sku: 'KL031',
        attributes: { volume: '100ml' },
        packingType: '100ml Bottle',
        materialType: 'Pure',
        customPackingAvailable: true,
        sortOrder: 1
      }
    ],
    images: ['/images/products/lamp-oil-placeholder.png'],
    featured: false,
    exportAvailable: false,
    status: 'active',
    order: 31,
    seo: {
      metaTitle: 'Kalasam Lamp Oil 100ml | Pure Pooja Lamp Oil',
      metaDescription: 'Kalasam pure lamp oil, 100ml bottle. Trusted lamp oil for daily worship and diya lighting. Made in Theni, India.',
      keywords: 'lamp oil 100ml, pure diya oil, Kalasam lamp oil, pooja lamp oil bottle'
    }
  },
  {
    id: 'klo-200ml',
    name: 'Kalasam Lamp Oil 200ml',
    slug: 'kalasam-lamp-oil-200ml',
    category: 'Lamp Oil',
    shortDescription: 'Pure lamp oil available in 200ml or 250ml bottles for regular household and small temple use.',
    description: 'A mid-size lamp oil bottle available in two close fill options (200ml or 250ml) to suit different bottle preferences, ideal for regular household or small temple use.',
    specifications: [
      { label: 'Material Type', value: 'Pure' },
      { label: 'Volume Options', value: '200ml / 250ml' },
      { label: 'Packing', value: 'Bottle' }
    ],
    applications: [
      'Regular household pooja and aarti',
      'Small temple and shrine daily lighting',
      'Diya and agal vilakku use',
      'Retail shop stock',
    ],
    benefits: [
      'Two fill sizes to suit bottle preferences',
      'Pure lamp oil for clean, steady flame',
      'Mid-size ideal for regular use households',
      'Manufactured in Theni, Tamil Nadu',
    ],
    packaging: [
      { size: '200', unit: 'ml', description: '200ml bottle' },
      { size: '250', unit: 'ml', description: '250ml bottle' },
    ],
    downloads: [],
    faq: [
      { question: 'What is the difference between the 200ml and 250ml options?', answer: 'Both contain the same pure lamp oil — the only difference is the bottle fill volume. Choose the size that suits your usage and bottle preference.' }
    ],
    variants: [
      {
        id: 'klo-200ml-v1',
        sku: 'KL032',
        attributes: { volume: '200ml' },
        packingType: '200ml Bottle',
        materialType: 'Pure',
        customPackingAvailable: true,
        sortOrder: 1
      },
      {
        id: 'klo-250ml-v1',
        sku: 'KL033',
        attributes: { volume: '250ml' },
        packingType: '250ml Bottle',
        materialType: 'Pure',
        customPackingAvailable: true,
        sortOrder: 2
      }
    ],
    images: ['/images/products/lamp-oil-placeholder.png'],
    featured: false,
    exportAvailable: false,
    status: 'active',
    order: 32,
    seo: {
      metaTitle: 'Kalasam Lamp Oil 200ml | Pure Pooja Lamp Oil — 2 Sizes',
      metaDescription: 'Kalasam pure lamp oil, available in 200ml or 250ml bottles. Reliable lamp oil for pooja and diya use, from Theni, India.',
      keywords: 'lamp oil 200ml, lamp oil 250ml, pure pooja oil mid size, Kalasam lamp oil bottle'
    }
  },
  {
    id: 'klo-500ml',
    name: 'Kalasam Lamp Oil 500ml',
    slug: 'kalasam-lamp-oil-500ml',
    category: 'Lamp Oil',
    shortDescription: 'Pure lamp oil in 500ml or 450ml bottles for temples, shops, and regular bulk household use.',
    description: 'A larger household/small-institutional size, available in two close fill options, suited to shops restocking regularly or larger family shrines.',
    specifications: [
      { label: 'Material Type', value: 'Pure' },
      { label: 'Volume Options', value: '500ml / 450ml' },
      { label: 'Packing', value: 'Bottle' }
    ],
    applications: [
      'Larger household and family shrine daily use',
      'Retail shop restocking',
      'Small temple regular supply',
      'Community prayer hall lighting',
    ],
    benefits: [
      'Two fill sizes for flexibility',
      'Pure lamp oil for clean, steady flame',
      'Economical per-ml cost at larger volume',
      'Manufactured in Theni, Tamil Nadu',
    ],
    packaging: [
      { size: '500', unit: 'ml', description: '500ml bottle' },
      { size: '450', unit: 'ml', description: '450ml bottle' },
    ],
    downloads: [],
    faq: [
      { question: 'Is this size suitable for shop restocking?', answer: 'Yes, the 500ml size is one of the most popular SKUs for kirana stores and retail shops that sell pooja items. Available in carton quantities for wholesale orders.' }
    ],
    variants: [
      {
        id: 'klo-500ml-v1',
        sku: 'KL034',
        attributes: { volume: '500ml' },
        packingType: '500ml Bottle',
        materialType: 'Pure',
        customPackingAvailable: true,
        sortOrder: 1
      },
      {
        id: 'klo-450ml-v1',
        sku: 'KL035',
        attributes: { volume: '450ml' },
        packingType: '450ml Bottle',
        materialType: 'Pure',
        customPackingAvailable: true,
        sortOrder: 2
      }
    ],
    images: ['/images/products/lamp-oil-placeholder.png'],
    featured: false,
    exportAvailable: false,
    status: 'active',
    order: 33,
    seo: {
      metaTitle: 'Kalasam Lamp Oil 500ml | Pure Pooja Lamp Oil — 2 Sizes',
      metaDescription: 'Kalasam pure lamp oil, available in 500ml or 450ml bottles. Ideal for temples, shops, and regular bulk household use.',
      keywords: 'lamp oil 500ml, lamp oil 450ml, bulk pooja oil, temple lamp oil supply'
    }
  },
  {
    id: 'klo-1000ml',
    name: 'Kalasam Lamp Oil 1000ml',
    slug: 'kalasam-lamp-oil-1000ml',
    category: 'Lamp Oil',
    shortDescription: 'Pure lamp oil in 1 litre or 900ml bottles for temples, retail stock, and bulk household use.',
    description: 'A full-litre size (with a 900ml alternate fill option) aimed at retail shop stock and temple/institutional buyers who go through lamp oil regularly. This size range is ideal for temples and institutions — see our dedicated temple supply program at /temple-supply for institutional pricing.',
    specifications: [
      { label: 'Material Type', value: 'Pure' },
      { label: 'Volume Options', value: '1000ml / 900ml' },
      { label: 'Packing', value: 'Bottle' }
    ],
    applications: [
      'Temple and institutional daily lamp supply',
      'Retail shop bulk stock',
      'Large household and multi-diya setups',
      'Festival and event lighting',
    ],
    benefits: [
      'Best per-ml value in bottle range',
      'Two fill sizes for flexibility',
      'Pure lamp oil for clean, steady flame',
      'Ideal for temple recurring orders',
    ],
    packaging: [
      { size: '1000', unit: 'ml', description: '1000ml (1 litre) bottle' },
      { size: '900', unit: 'ml', description: '900ml bottle' },
    ],
    downloads: [],
    faq: [
      { question: 'Can temples order this size in bulk?', answer: 'Yes, this 1-litre size is popular with temples and institutions. We offer institutional pricing and recurring order schedules — visit our Temple Supply page or contact our team for details.' }
    ],
    variants: [
      {
        id: 'klo-1000ml-v1',
        sku: 'KL036',
        attributes: { volume: '1000ml' },
        packingType: '1000ml Bottle',
        materialType: 'Pure',
        customPackingAvailable: true,
        sortOrder: 1
      },
      {
        id: 'klo-900ml-v1',
        sku: 'KL037',
        attributes: { volume: '900ml' },
        packingType: '900ml Bottle',
        materialType: 'Pure',
        customPackingAvailable: true,
        sortOrder: 2
      }
    ],
    images: ['/images/products/lamp-oil-placeholder.png'],
    featured: false,
    exportAvailable: false,
    status: 'active',
    order: 34,
    seo: {
      metaTitle: 'Kalasam Lamp Oil 1 Litre | Pure Pooja Lamp Oil — 2 Sizes',
      metaDescription: 'Kalasam pure lamp oil in 1000ml or 900ml bottles. Ideal for temples, retail stock, and bulk household use. From Theni, India.',
      keywords: 'lamp oil 1 litre, lamp oil 900ml, wholesale pooja lamp oil, temple oil supply India'
    }
  },
  {
    id: 'klo-16l',
    name: 'Kalasam Lamp Oil 16L Tin',
    slug: 'kalasam-lamp-oil-16l-tin',
    category: 'Lamp Oil',
    shortDescription: 'Bulk 16 litre tin of pure lamp oil for temples, trusts, and institutional buyers.',
    description: 'A bulk institutional size built for temples, trusts, and large-scale daily-use religious institutions — this is not a retail household product, but a dedicated institutional supply format. See our Temple Supply program at /temple-supply for institutional pricing and recurring order setup.',
    specifications: [
      { label: 'Material Type', value: 'Pure' },
      { label: 'Volume', value: '16 Litres' },
      { label: 'Packing', value: 'Tin' }
    ],
    applications: [
      'Temple and devasthanam daily lamp supply',
      'Religious trust institutional use',
      'Large-scale festival and event lighting',
      'Ashram and monastery recurring supply',
    ],
    benefits: [
      'Bulk institutional packing for high-volume use',
      'Significant per-litre cost advantage over bottles',
      'Pure lamp oil for clean, steady flame',
      'Institutional pricing and recurring order support',
    ],
    packaging: [
      { size: '16', unit: 'L', description: '16 Litre tin' },
    ],
    downloads: [],
    faq: [
      { question: 'Is this suitable for temple trusts?', answer: 'Yes, the 16L tin is designed specifically for institutional temple use. We provide GST-compliant invoices and can set up recurring monthly/quarterly dispatch schedules for temple trusts and devasthanams.' }
    ],
    variants: [
      {
        id: 'klo-16l-v1',
        sku: 'KL038',
        attributes: { volume: '16L' },
        packingType: '16 L Tin',
        materialType: 'Pure',
        customPackingAvailable: true,
        sortOrder: 1
      }
    ],
    images: ['/images/products/lamp-oil-placeholder.png'],
    featured: false,
    exportAvailable: false,
    status: 'active',
    order: 35,
    seo: {
      metaTitle: 'Kalasam Lamp Oil 16L Tin | Bulk Pooja Lamp Oil',
      metaDescription: 'Bulk Kalasam pure lamp oil, 16 litre tin. Ideal for temples, trusts, and institutional buyers needing large-volume supply. Theni, India.',
      keywords: 'bulk lamp oil, 16 litre lamp oil tin, temple lamp oil bulk supply, lamp oil for trust institutions'
    }
  },
  {
    id: 'klo-210l',
    name: 'Kalasam Lamp Oil 210L Barrel',
    slug: 'kalasam-lamp-oil-210l-barrel',
    category: 'Lamp Oil',
    shortDescription: 'Wholesale 210 litre barrel of pure lamp oil for distributors, wholesale buyers, and Super Stockists.',
    description: 'The largest bulk size, aimed squarely at wholesale buyers, distributors, and Super Stockists needing drum-scale volume rather than individual bottles. See our wholesale program at /wholesale, distributor opportunities at /distributors, or Super Stockist program at /super-stockist for trade pricing and terms.',
    specifications: [
      { label: 'Material Type', value: 'Pure' },
      { label: 'Volume', value: '210 Litres' },
      { label: 'Packing', value: 'Barrel / Drum' }
    ],
    applications: [
      'Wholesale trade and distribution',
      'Distributor and Super Stockist stock',
      'Large-scale institutional and event supply',
      'Bulk repackaging operations',
    ],
    benefits: [
      'Lowest per-litre cost in the range',
      'Wholesale and distributor pricing available',
      'Pure lamp oil in industrial drum format',
      'Direct factory supply from Theni, Tamil Nadu',
    ],
    packaging: [
      { size: '210', unit: 'L', description: '210 Litre barrel / drum' },
    ],
    downloads: [],
    faq: [
      { question: 'Can distributors order this barrel size?', answer: 'Yes, the 210L barrel is our primary wholesale and distributor supply format. Contact our trade team for distributor pricing, credit terms, and territory-based supply arrangements.' }
    ],
    variants: [
      {
        id: 'klo-210l-v1',
        sku: 'KL039',
        attributes: { volume: '210L' },
        packingType: '210 L Barrel',
        materialType: 'Pure',
        customPackingAvailable: true,
        sortOrder: 1
      }
    ],
    images: ['/images/products/lamp-oil-placeholder.png'],
    featured: false,
    exportAvailable: false,
    status: 'active',
    order: 36,
    seo: {
      metaTitle: 'Kalasam Lamp Oil 210L Barrel | Wholesale Bulk Supply',
      metaDescription: 'Kalasam pure lamp oil in 210 litre barrels for wholesale and distributor bulk orders. Manufactured in Theni, India — request a quote.',
      keywords: 'wholesale lamp oil barrel, bulk lamp oil supplier India, 210 litre lamp oil drum, lamp oil distributor supply'
    }
  },

  // ── Sambrani ──────────────────────────────────────────────────
  {
    id: 'ks-055',
    name: 'Kalasam Cup Sambrani',
    slug: 'kalasam-cup-sambrani',
    category: 'Sambrani',
    shortDescription: 'Traditional cup-style sambrani for daily pooja and temple ritual fragrance, 12 pieces per box.',
    description: 'A traditional cup-style sambrani used for daily pooja and temple ritual fragrance, packed 12 pieces per box for convenient regular use.',
    specifications: [
      { label: 'Packing', value: '12 Pcs Per Box' },
      { label: 'Custom Packing', value: 'Available' },
    ],
    applications: [
      'Daily pooja and aarti',
      'Temple ritual fragrance',
      'Home shrine incense',
      'Religious ceremonies',
    ],
    benefits: [
      'Traditional cup-style format',
      'Long-lasting fragrance',
      'Convenient box packing',
      'Manufactured in Theni, Tamil Nadu',
    ],
    packaging: [
      { size: '12', unit: 'pcs', description: '12 Pcs Per Box' },
    ],
    downloads: [],
    faq: [
      { question: 'Is custom packing available for Sambrani?', answer: 'Yes, custom packing is available on request for bulk and institutional buyers.' }
    ],
    images: ['/images/products/sambrani-placeholder.png'],
    featured: false,
    exportAvailable: false,
    status: 'active',
    order: 40,
    seo: {
      metaTitle: 'Kalasam Cup Sambrani | Traditional Pooja Fragrance',
      metaDescription: 'Kalasam Cup Sambrani, 12 pieces per box. Traditional fragrance for daily pooja and temple use. Manufactured by Kalasam, Theni, India.',
      keywords: 'cup sambrani, Kalasam sambrani, pooja sambrani cup, temple fragrance India'
    }
  },
  {
    id: 'ks-056',
    name: 'Kalasam Computer Sambrani',
    slug: 'kalasam-computer-sambrani',
    category: 'Sambrani',
    shortDescription: 'Pressed/molded computer sambrani fragrance cups for pooja and religious use, 12 pieces per box.',
    description: '"Computer sambrani" is a popular pressed/molded fragrance cup format for pooja use, packed 12 pieces per box — a related but distinct format buyers search for by name alongside Cup Sambrani.',
    specifications: [
      { label: 'Packing', value: '12 Pcs Per Box' },
      { label: 'Custom Packing', value: 'Available' },
    ],
    applications: [
      'Daily pooja and aarti',
      'Temple ritual fragrance',
      'Home shrine incense',
      'Religious ceremonies',
    ],
    benefits: [
      'Pressed/molded fragrance cup format',
      'Long-lasting fragrance',
      'Convenient box packing',
      'Manufactured in Theni, Tamil Nadu',
    ],
    packaging: [
      { size: '12', unit: 'pcs', description: '12 Pcs Per Box' },
    ],
    downloads: [],
    faq: [
      { question: 'What is computer sambrani?', answer: 'Computer sambrani refers to a pressed/molded fragrance cup format that is popular for pooja use — similar to cup sambrani but in a distinct pressed shape that buyers recognise by this name.' }
    ],
    images: ['/images/products/sambrani-placeholder.png'],
    featured: false,
    exportAvailable: false,
    status: 'active',
    order: 41,
    seo: {
      metaTitle: 'Kalasam Computer Sambrani | Pooja Fragrance Cups',
      metaDescription: 'Kalasam Computer Sambrani, 12 pieces per box. Long-lasting fragrance cups for pooja and religious use. Made in Theni, India.',
      keywords: 'computer sambrani, Kalasam sambrani box, sambrani cups pooja, fragrance cups for temple'
    }
  },

  // ── Rose Water ────────────────────────────────────────────────
  {
    id: 'krs-057',
    name: 'Kalasam Rose Water 100ml',
    slug: 'kalasam-rose-water-100ml',
    category: 'Rose Water',
    shortDescription: 'Pure rose water in a compact 100ml bottle for pooja, rituals, and everyday use.',
    description: 'A small everyday-use bottle of pure rose water for pooja and household ritual use.',
    specifications: [
      { label: 'Volume', value: '100ml' },
      { label: 'Packing', value: '100ml Bottle' },
      { label: 'Custom Packing', value: 'Available' },
    ],
    applications: [
      'Daily pooja and ritual use',
      'Home shrine and prayer room',
      'Personal fragrance and freshening',
      'Small household use',
    ],
    benefits: [
      'Pure rose water for pooja',
      'Compact everyday-use bottle',
      'Manufactured in Theni, Tamil Nadu',
    ],
    packaging: [
      { size: '100', unit: 'ml', description: '100ml Bottle' },
    ],
    downloads: [],
    faq: [
      { question: 'Is this rose water suitable for pooja use?', answer: 'Yes, Kalasam rose water is suitable for all traditional pooja and ritual uses.' }
    ],
    images: ['/images/products/rose-water-placeholder.png'],
    featured: false,
    exportAvailable: false,
    status: 'active',
    order: 42,
    seo: {
      metaTitle: 'Kalasam Rose Water 100ml | Pure Pooja Rose Water',
      metaDescription: 'Kalasam pure rose water, 100ml bottle. Ideal for pooja, rituals, and everyday use. Manufactured in Theni, India.',
      keywords: 'rose water for pooja, Kalasam rose water 100ml, pure rose water small bottle'
    }
  },
  {
    id: 'krs-058',
    name: 'Kalasam Rose Water 200ml',
    slug: 'kalasam-rose-water-200ml',
    category: 'Rose Water',
    shortDescription: 'Pure rose water in a 200ml bottle for regular household or small temple use.',
    description: 'A mid-size rose water bottle suited to regular household or small temple use.',
    specifications: [
      { label: 'Volume', value: '200ml' },
      { label: 'Packing', value: '200ml Bottle' },
      { label: 'Custom Packing', value: 'Available' },
    ],
    applications: [
      'Regular household pooja use',
      'Small temple and shrine use',
      'Neighbourhood kirana shops',
    ],
    benefits: [
      'Pure rose water for pooja',
      'Mid-size for regular use households',
      'Manufactured in Theni, Tamil Nadu',
    ],
    packaging: [
      { size: '200', unit: 'ml', description: '200ml Bottle' },
    ],
    downloads: [],
    faq: [
      { question: 'Is this rose water suitable for pooja use?', answer: 'Yes, Kalasam rose water is suitable for all traditional pooja and ritual uses.' }
    ],
    images: ['/images/products/rose-water-placeholder.png'],
    featured: false,
    exportAvailable: false,
    status: 'active',
    order: 43,
    seo: {
      metaTitle: 'Kalasam Rose Water 200ml | Pure Pooja Rose Water',
      metaDescription: 'Kalasam pure rose water, 200ml bottle. Trusted rose water for pooja and religious rituals. Made in Theni, India.',
      keywords: 'rose water 200ml, pure pooja rose water, Kalasam rose water bottle'
    }
  },
  {
    id: 'krs-059',
    name: 'Kalasam Rose Water 500ml',
    slug: 'kalasam-rose-water-500ml',
    category: 'Rose Water',
    shortDescription: 'Pure rose water in a 500ml bottle, ideal for temples, shops, and regular bulk household use.',
    description: 'A larger household/small-institutional size, suited to shops restocking regularly or larger temple use.',
    specifications: [
      { label: 'Volume', value: '500ml' },
      { label: 'Packing', value: '500ml Bottle' },
      { label: 'Custom Packing', value: 'Available' },
    ],
    applications: [
      'Small temple and shrine regular use',
      'Retail shop stock',
      'Larger household pooja use',
    ],
    benefits: [
      'Pure rose water for pooja',
      'Larger size for frequent-use buyers',
      'Manufactured in Theni, Tamil Nadu',
    ],
    packaging: [
      { size: '500', unit: 'ml', description: '500ml Bottle' },
    ],
    downloads: [],
    faq: [
      { question: 'Is this suitable for temple use?', answer: 'Yes, the 500ml bottle is well-suited for temples and shops that use rose water regularly and prefer a larger, economical bottle.' }
    ],
    images: ['/images/products/rose-water-placeholder.png'],
    featured: false,
    exportAvailable: false,
    status: 'active',
    order: 44,
    seo: {
      metaTitle: 'Kalasam Rose Water 500ml | Pure Pooja Rose Water',
      metaDescription: 'Kalasam pure rose water, 500ml bottle. Ideal for temples, shops, and regular bulk household use.',
      keywords: 'rose water 500ml, bulk pooja rose water, temple rose water supply'
    }
  },
  {
    id: 'krs-060',
    name: 'Kalasam Rose Water 1000ml',
    slug: 'kalasam-rose-water-1000ml',
    category: 'Rose Water',
    shortDescription: 'Pure rose water in a 1 litre bottle for temples, retail stock, and bulk household use.',
    description: 'A full-litre size aimed at retail shop stock and temple/institutional buyers who use rose water regularly. For institutional supply or temple orders, visit our <a href="/temple-supply">temple supply</a> page.',
    specifications: [
      { label: 'Volume', value: '1000ml (1 Litre)' },
      { label: 'Packing', value: '1 Litre Bottle' },
      { label: 'Custom Packing', value: 'Available' },
    ],
    applications: [
      'Retail shop stock',
      'Temple and institutional supply',
      'Bulk household pooja use',
    ],
    benefits: [
      'Pure rose water for pooja',
      'Full-litre size for institutional and retail buyers',
      'Manufactured in Theni, Tamil Nadu',
    ],
    packaging: [
      { size: '1000', unit: 'ml', description: '1 Litre Bottle' },
    ],
    downloads: [],
    faq: [
      { question: 'Do you supply in bulk to temples?', answer: 'Yes, we supply to temples and institutions. Visit our temple supply page at /temple-supply for details on institutional pricing and arrangements.' }
    ],
    images: ['/images/products/rose-water-placeholder.png'],
    featured: false,
    exportAvailable: false,
    status: 'active',
    order: 45,
    seo: {
      metaTitle: 'Kalasam Rose Water 1 Litre | Pure Pooja Rose Water',
      metaDescription: 'Kalasam pure rose water, 1000ml bottle. Ideal for temples, retail stock, and bulk household use. From Theni, India.',
      keywords: 'rose water 1 litre, wholesale pooja rose water, temple rose water bulk'
    }
  },

  // ── Agarbathi ─────────────────────────────────────────────────
  {
    id: 'ka-040',
    name: 'Kalasam AgarBathi Rs5',
    slug: 'kalasam-agarbathi-rs5',
    category: 'Agarbathi',
    shortDescription: 'Entry-level incense stick pack, five sticks per box, available in five fragrances.',
    description: 'An entry-level incense stick pack available in five distinct fragrances, sized for everyday household pooja use and easy retail-shop restocking.',
    specifications: [
      { label: 'Packing', value: 'Five Sticks Per Box' },
      { label: 'Flavours', value: 'Rose, Lavender, Black, Jasmine, Pineapple' },
      { label: 'Custom Packing', value: 'Available' },
    ],
    applications: [
      'Daily household pooja',
      'Retail shop stock',
      'Home and office fragrance',
      'Religious ceremonies',
    ],
    benefits: [
      'Five fragrance options in one format',
      'Entry price point for household use',
      'Easy retail shelf restocking',
      'Manufactured in Theni, Tamil Nadu',
    ],
    packaging: [
      { size: '5', unit: 'sticks', description: 'Five Sticks Per Box' },
    ],
    downloads: [],
    faq: [
      { question: 'Which flavours are available in the Rs5 pack?', answer: 'The Rs5 pack is available in Rose, Lavender, Black, Jasmine, and Pineapple fragrance options.' }
    ],
    variants: [
      {
        id: 'ka-040-v1',
        sku: 'KA041',
        attributes: { flavour: 'Rose' },
        packingType: 'Five Sticks Per Box',
        materialType: 'Rose Agarbathi',
        customPackingAvailable: true,
        sortOrder: 1
      },
      {
        id: 'ka-040-v2',
        sku: 'KA042',
        attributes: { flavour: 'Lavender' },
        packingType: 'Five Sticks Per Box',
        materialType: 'Lavender Agarbathi',
        customPackingAvailable: true,
        sortOrder: 2
      },
      {
        id: 'ka-040-v3',
        sku: 'KA043',
        attributes: { flavour: 'Black' },
        packingType: 'Five Sticks Per Box',
        materialType: 'Black Agarbathi',
        customPackingAvailable: true,
        sortOrder: 3
      },
      {
        id: 'ka-040-v4',
        sku: 'KA044',
        attributes: { flavour: 'Jasmine' },
        packingType: 'Five Sticks Per Box',
        materialType: 'Jasmine Agarbathi',
        customPackingAvailable: true,
        sortOrder: 4
      },
      {
        id: 'ka-040-v5',
        sku: 'KA045',
        attributes: { flavour: 'Pineapple' },
        packingType: 'Five Sticks Per Box',
        materialType: 'Pineapple Agarbathi',
        customPackingAvailable: true,
        sortOrder: 5
      }
    ],
    images: ['/images/products/agarbathi-placeholder.png'],
    featured: false,
    exportAvailable: false,
    status: 'active',
    order: 50,
    seo: {
      metaTitle: 'Kalasam Agarbathi Rs5 | Incense Sticks — 5 Flavours',
      metaDescription: 'Kalasam Agarbathi Rs5 pack, five sticks per box. Available in Rose, Lavender, Black, Jasmine, and Pineapple. Made in Theni, India.',
      keywords: 'agarbathi Rs5, Kalasam incense sticks, rose agarbathi, jasmine agarbathi, pooja incense sticks India'
    }
  },
  {
    id: 'ka-046',
    name: 'Kalasam AgarBathi Rs10',
    slug: 'kalasam-agarbathi-rs10',
    category: 'Agarbathi',
    shortDescription: 'Mid-range incense stick pack, ten sticks per box, available in five fragrances.',
    description: 'A step-up incense stick pack with more sticks per box across the same five fragrance options, suited to regular household or shop use.',
    specifications: [
      { label: 'Packing', value: 'Ten Sticks Per Box' },
      { label: 'Flavours', value: 'Rose, Lavender, Black, Jasmine, Pineapple' },
      { label: 'Custom Packing', value: 'Available' },
    ],
    applications: [
      'Regular household pooja',
      'Retail shop stock',
      'Home and office fragrance',
      'Religious ceremonies and events',
    ],
    benefits: [
      'More sticks per box for regular users',
      'Five fragrance options',
      'Good value household/shop format',
      'Manufactured in Theni, Tamil Nadu',
    ],
    packaging: [
      { size: '10', unit: 'sticks', description: 'Ten Sticks Per Box' },
    ],
    downloads: [],
    faq: [
      { question: 'Which flavours are available in the Rs10 pack?', answer: 'The Rs10 pack is available in Rose, Lavender, Black, Jasmine, and Pineapple fragrance options.' }
    ],
    variants: [
      {
        id: 'ka-046-v1',
        sku: 'KA047',
        attributes: { flavour: 'Rose' },
        packingType: 'Ten Sticks Per Box',
        materialType: 'Rose Agarbathi',
        customPackingAvailable: true,
        sortOrder: 1
      },
      {
        id: 'ka-046-v2',
        sku: 'KA048',
        attributes: { flavour: 'Lavender' },
        packingType: 'Ten Sticks Per Box',
        materialType: 'Lavender Agarbathi',
        customPackingAvailable: true,
        sortOrder: 2
      },
      {
        id: 'ka-046-v3',
        sku: 'KA049',
        attributes: { flavour: 'Black' },
        packingType: 'Ten Sticks Per Box',
        materialType: 'Black Agarbathi',
        customPackingAvailable: true,
        sortOrder: 3
      },
      {
        id: 'ka-046-v4',
        sku: 'KA050',
        attributes: { flavour: 'Jasmine' },
        packingType: 'Ten Sticks Per Box',
        materialType: 'Jasmine Agarbathi',
        customPackingAvailable: true,
        sortOrder: 4
      },
      {
        id: 'ka-046-v5',
        sku: 'KA051',
        attributes: { flavour: 'Pineapple' },
        packingType: 'Ten Sticks Per Box',
        materialType: 'Pineapple Agarbathi',
        customPackingAvailable: true,
        sortOrder: 5
      }
    ],
    images: ['/images/products/agarbathi-placeholder.png'],
    featured: false,
    exportAvailable: false,
    status: 'active',
    order: 51,
    seo: {
      metaTitle: 'Kalasam Agarbathi Rs10 | Incense Sticks — 5 Flavours',
      metaDescription: 'Kalasam Agarbathi Rs10 pack, ten sticks per box. Available in Rose, Lavender, Black, Jasmine, and Pineapple. Made in Theni, India.',
      keywords: 'agarbathi Rs10, incense sticks 10 pack, Kalasam agarbathi flavours, lavender agarbathi India'
    }
  },
  {
    id: 'ka-052',
    name: 'Kalasam AgarBathi Rs50',
    slug: 'kalasam-agarbathi-rs50',
    category: 'Agarbathi',
    shortDescription: 'Larger 100g incense stick box, available in Black and Pineapple — ideal for regular users, shops, and temples.',
    description: 'A larger 100g box format aimed at buyers who go through incense sticks regularly — shops, temples, or bulk household stock — currently available in Black and Pineapple. See our <a href="/wholesale">wholesale</a> and <a href="/retail-supply">retail supply</a> pages for trade pricing.',
    specifications: [
      { label: 'Packing', value: '100g Per Box' },
      { label: 'Flavours', value: 'Black, Pineapple' },
      { label: 'Custom Packing', value: 'Available' },
    ],
    applications: [
      'Regular shop and temple use',
      'Wholesale and retail trade stock',
      'Bulk household incense use',
    ],
    benefits: [
      '100g bulk-friendly box format',
      'Black and Pineapple fragrance options',
      'Suitable for shop/institutional buyers',
      'Manufactured in Theni, Tamil Nadu',
    ],
    packaging: [
      { size: '100', unit: 'g', description: '100g Per Box' },
    ],
    downloads: [],
    faq: [
      { question: 'Which flavours are available in the Rs50 pack?', answer: 'The Rs50 (100g) pack is currently available in Black and Pineapple fragrance options.' },
      { question: 'Is wholesale pricing available for this size?', answer: 'Yes, please visit our wholesale and retail supply pages for trade pricing and ordering details.' }
    ],
    variants: [
      {
        id: 'ka-052-v1',
        sku: 'KA053',
        attributes: { flavour: 'Black' },
        packingType: '100g Per Box',
        materialType: 'Black Agarbathi',
        customPackingAvailable: true,
        sortOrder: 1
      },
      {
        id: 'ka-052-v2',
        sku: 'KA054',
        attributes: { flavour: 'Pineapple' },
        packingType: '100g Per Box',
        materialType: 'Pineapple Agarbathi',
        customPackingAvailable: true,
        sortOrder: 2
      }
    ],
    images: ['/images/products/agarbathi-placeholder.png'],
    featured: false,
    exportAvailable: false,
    status: 'active',
    order: 52,
    seo: {
      metaTitle: 'Kalasam Agarbathi Rs50 | 100g Incense Sticks',
      metaDescription: 'Kalasam Agarbathi Rs50 pack, 100g per box. Available in Black and Pineapple. Bulk-friendly incense sticks from Theni, India.',
      keywords: 'agarbathi 100g, bulk incense sticks India, Kalasam agarbathi Rs50, wholesale agarbathi box'
    }
  }
];
