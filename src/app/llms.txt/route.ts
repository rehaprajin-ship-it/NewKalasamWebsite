import { NextResponse } from 'next/server';
import { COMPANY, SITE_URL, SITE_NAME, CERTIFICATIONS, INDUSTRIES, EXPORT_COUNTRIES } from '@/lib/constants';
import { getProducts } from '@/lib/firestore';
import { seedProducts } from '@/data/products';

/* ═══════════════════════════════════════════════════════════════
   /llms.txt — Standardized AI/LLM Knowledge Manifest
   Follows the official https://llmstxt.org/ specification:
   - Mandatory H1 title
   - Blockquote summary
   - Informational markdown sections
   - H2 sections with link lists [Title](URL): Description
   ═══════════════════════════════════════════════════════════════ */

export async function GET() {
  // Fetch live products from Firestore, fallback to seed
  let products: any[] = [];
  try {
    products = await getProducts();
  } catch (e) {
    // Fallback gracefully
  }

  if (!products || products.length === 0) {
    products = seedProducts as any[];
  }

  // Group products by the 6 core categories
  const industrialProducts = products.filter(
    (p) => p.category === 'Industrial Product' || p.category === 'Industrial Chemicals'
  );
  const camphorProducts = products.filter((p) => p.category === 'Camphor');
  const lampOilProducts = products.filter((p) => p.category === 'Lamp Oil');
  const agarbathiProducts = products.filter((p) => p.category === 'Agarbathi');
  const sambraniProducts = products.filter((p) => p.category === 'Sambrani');
  const roseWaterProducts = products.filter((p) => p.category === 'Rose Water');

  const content = `# ${SITE_NAME}

> ${COMPANY.tagline}. Leading manufacturer and exporter of synthetic camphor (CAS 76-22-2), D-camphor (CAS 464-49-3), isoborneol (CAS 124-76-5), camphor oil (CAS 8008-51-3), pure pooja camphor tablets, deepam lamp oil, incense sticks (agarbathi), sambrani dhoop cups, and steam-distilled rose water. Operating from Theni, Tamil Nadu, India, supplying wholesale, B2B, temple, OEM, and global export buyers across 17+ countries.

## Overview & Background

${COMPANY.description}

### Company Highlights
- **Founded**: ${COMPANY.founded} (Over 25+ years of manufacturing experience)
- **Headquarters & Manufacturing**: ${COMPANY.location.address}
- **Phone**: ${COMPANY.contact.phone}
- **Email**: ${COMPANY.contact.email} / ${COMPANY.contact.exportEmail}
- **WhatsApp Support**: +${COMPANY.contact.whatsapp}
- **Business Hours**: ${COMPANY.businessHours}
- **Key Brands**: Kalasam, Temple Dharisana
- **Annual Production Capacity**: 10,000+ Metric Tons
- **Purity Standard**: Up to 99.9% batch-tested purity
- **Export Reach**: Serving buyers across Asia, Middle East, Africa, Europe, and North America (${EXPORT_COUNTRIES.map((c) => c.name).join(', ')})
- **Certifications**: ${CERTIFICATIONS.join(', ')}

## Industrial Chemical Products

- [Industrial Chemicals Overview](${SITE_URL}/industrial-chemicals): Bulk industrial chemical catalog, specification downloads, and B2B ordering information
${industrialProducts
  .map((p) => {
    const name = p.name || '';
    const slug = p.slug || '';
    const cas = p.casNumber ? ` (CAS: ${p.casNumber})` : '';
    const purity = p.purity ? `, Assay: ${p.purity}` : '';
    const desc = p.shortDescription ? ` - ${p.shortDescription}` : '';
    return `- [${name}](${SITE_URL}/products/${slug}): ${name}${cas}${purity}${desc}`;
  })
  .join('\n')}

## Camphor & Pooja Products

- [Pooja & Temple Products Overview](${SITE_URL}/pooja-products): Pure refined pooja camphor, Bhimseni karpooram, deepam oils, agarbathi, sambrani, and rose water for domestic and institutional supply
${camphorProducts
  .map((p) => {
    const name = p.name || '';
    const slug = p.slug || '';
    const desc = p.shortDescription ? ` - ${p.shortDescription}` : ' - 100% residue-free pure burning camphor';
    return `- [${name}](${SITE_URL}/products/${slug}): ${desc.replace(/^ - /, '')}`;
  })
  .join('\n')}

## Lamp Oil (Deepam Oil)

${lampOilProducts
  .map((p) => {
    const name = p.name || '';
    const slug = p.slug || '';
    const desc = p.shortDescription ? ` - ${p.shortDescription}` : ' - Pure pooja lamp oil for steady, low-smoke diya lighting';
    return `- [${name}](${SITE_URL}/products/${slug}): ${desc.replace(/^ - /, '')}`;
  })
  .join('\n')}

## Agarbathi (Incense Sticks)

${agarbathiProducts
  .map((p) => {
    const name = p.name || '';
    const slug = p.slug || '';
    const desc = p.shortDescription ? ` - ${p.shortDescription}` : ' - Premium hand-rolled pooja incense sticks in 5 divine fragrances';
    return `- [${name}](${SITE_URL}/products/${slug}): ${desc.replace(/^ - /, '')}`;
  })
  .join('\n')}

## Sambrani (Dhoop & Resin)

${sambraniProducts
  .map((p) => {
    const name = p.name || '';
    const slug = p.slug || '';
    const desc = p.shortDescription ? ` - ${p.shortDescription}` : ' - Natural benzoin resin cup sambrani for pooja and purification';
    return `- [${name}](${SITE_URL}/products/${slug}): ${desc.replace(/^ - /, '')}`;
  })
  .join('\n')}

## Rose Water (Panneer)

${roseWaterProducts
  .map((p) => {
    const name = p.name || '';
    const slug = p.slug || '';
    const desc = p.shortDescription ? ` - ${p.shortDescription}` : ' - 100% pure steam-distilled rose water for deity abhishekam and pooja';
    return `- [${name}](${SITE_URL}/products/${slug}): ${desc.replace(/^ - /, '')}`;
  })
  .join('\n')}

## Business, Supply & Export Divisions

- [Global Export Division](${SITE_URL}/export): Information on international shipping standards, port handling (Chennai, Tuticorin), FOB/CIF terms, and overseas distributor logistics
- [OEM & Contract Manufacturing](${SITE_URL}/oem-manufacturing): Custom formulation, dedicated batch compounding, and large-scale contract manufacturing services
- [Private Label Manufacturing](${SITE_URL}/private-label): Custom retail packaging, blister packs, pouches, and brand customization for retailers and distributors
- [Wholesale & Bulk Supply](${SITE_URL}/wholesale): Volume discount structures, container load shipments, and direct factory pricing for traders and wholesalers
- [Super Stockist Program](${SITE_URL}/super-stockist): Exclusive regional super-stockist distribution partnerships and supply chain infrastructure
- [Distributors Portal](${SITE_URL}/distributors): Distributor application, territorial opportunities, and marketing support
- [Retail Supply](${SITE_URL}/retail-supply): Kirana store, supermarket, and retail chain FMCG supply options
- [Temple & Institutional Supply](${SITE_URL}/temple-supply): Bulk temple supply packages for aarti, havan, and religious trusts with consistent certified purity
- [Industries We Serve](${SITE_URL}/industries-we-serve): Pharmaceuticals, Fragrance & Flavor, Personal Care, Chemical Intermediates, Religious/Pooja, and Household FMCG

## Quality, Facilities & Technical Documentation

- [Quality Control Laboratory](${SITE_URL}/quality-control): In-house testing laboratory, batch testing protocols, chromatography, and purity verification
- [Manufacturing Infrastructure](${SITE_URL}/infrastructure): Modern automated tableting, distillation, and clean-room packaging facilities in Theni
- [Research & Development](${SITE_URL}/research-development): Continuous product improvement, isomer separation, and eco-friendly pooja formulation research
- [Certifications & Compliance](${SITE_URL}/certificates): ISO 9001:2015, GMP, FSSAI, MSME, IEC, and regulatory compliance documents
- [MSDS / SDS Library](${SITE_URL}/msds-library): Material Safety Data Sheets for synthetic camphor, D-camphor, isoborneol, and camphor oil
- [COA Library](${SITE_URL}/coa-library): Certificates of Analysis and technical specification sheets for bulk buyers
- [Technical Downloads](${SITE_URL}/downloads): Product catalogs, brochures, and export compliance specifications

## Key Site Resources

- [About Jaikrishna Industries](${SITE_URL}/about): Corporate history, leadership, vision, and manufacturing milestones since 1995
- [All Products Catalog](${SITE_URL}/products): Complete online interactive catalog across all 6 core categories
- [Frequently Asked Questions](${SITE_URL}/faq): Detailed answers regarding MOQ, shipping, export procedures, samples, and purity standards
- [Inquiry & Quote Request](${SITE_URL}/inquiry): Online B2B inquiry form for bulk quotations and sample requests
- [Contact Sales Team](${SITE_URL}/contact): Direct telephone, email, WhatsApp, and physical factory address details
- [Industry Blog & Articles](${SITE_URL}/blog): Articles on camphor chemistry, export trends, traditional rituals, and spiritual guidance
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
