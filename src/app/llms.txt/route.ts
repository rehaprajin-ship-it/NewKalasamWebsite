import { NextResponse } from 'next/server';
import { COMPANY, SITE_URL, SITE_NAME, CERTIFICATIONS, INDUSTRIES, EXPORT_COUNTRIES } from '@/lib/constants';
import { getProducts } from '@/lib/firestore';
import { seedProducts } from '@/data/products';

/* ═══════════════════════════════════════════════════════════════
   /llms.txt — AI-readable site summary
   Auto-generated from CMS product data + constants.
   Stays current as new products are added via admin.
   ═══════════════════════════════════════════════════════════════ */

export async function GET() {
  // Fetch live products from Firestore, fallback to seed
  let products: any[] = [];
  try {
    products = await getProducts();
  } catch (e) {}

  if (!products || products.length === 0) {
    products = seedProducts as any[];
  }

  // Group products by category
  const industrialChemicals = products.filter(
    (p) => p.category === 'Industrial Chemicals' || p.casNumber
  );
  const poojaProducts = products.filter(
    (p) =>
      !p.casNumber &&
      p.category !== 'Industrial Chemicals'
  );

  const content = `# ${SITE_NAME}

> ${COMPANY.tagline}

${COMPANY.description}

## Company Details

- **Founded**: ${COMPANY.founded}
- **Location**: ${COMPANY.location.address}
- **Phone**: ${COMPANY.contact.phone}
- **Email**: ${COMPANY.contact.email}
- **Business Hours**: ${COMPANY.businessHours}
- **Brands**: Kalasam, Temple Dharisana

## Products

### Industrial Chemicals
${industrialChemicals
  .map((p) => {
    const name = p.name || p.title || '';
    const slug = p.slug || '';
    const cas = p.casNumber ? ` (CAS ${p.casNumber})` : '';
    const purity = p.purity ? ` — ${p.purity} purity` : '';
    return `- [${name}](${SITE_URL}/products/${slug})${cas}${purity}`;
  })
  .join('\n')}

### Pooja & Temple Products
${poojaProducts
  .map((p) => {
    const name = p.name || p.title || '';
    const slug = p.slug || '';
    const desc = p.shortDescription ? ` — ${p.shortDescription.substring(0, 80)}` : '';
    return `- [${name}](${SITE_URL}/products/${slug})${desc}`;
  })
  .join('\n')}

## Key Pages

- [About Us](${SITE_URL}/about)
- [All Products](${SITE_URL}/products)
- [Industrial Chemicals](${SITE_URL}/industrial-chemicals)
- [Pooja Products](${SITE_URL}/pooja-products)
- [Export Division](${SITE_URL}/export) — Serving ${EXPORT_COUNTRIES.length}+ countries across Asia, Middle East, Africa
- [Manufacturing](${SITE_URL}/manufacturing)
- [Quality Control](${SITE_URL}/quality-control)
- [Research & Development](${SITE_URL}/research-development)
- [Infrastructure](${SITE_URL}/infrastructure)
- [OEM & Private Label](${SITE_URL}/oem-manufacturing)
- [Private Label](${SITE_URL}/private-label)
- [Wholesale](${SITE_URL}/wholesale)
- [Distributors](${SITE_URL}/distributors)
- [Industries We Serve](${SITE_URL}/industries-we-serve)
- [Certificates](${SITE_URL}/certificates)
- [MSDS Library](${SITE_URL}/msds-library)
- [COA Library](${SITE_URL}/coa-library)
- [Downloads](${SITE_URL}/downloads)
- [FAQ](${SITE_URL}/faq)
- [Contact](${SITE_URL}/contact)
- [Blog](${SITE_URL}/blog)

## Certifications

${CERTIFICATIONS.map((c) => `- ${c}`).join('\n')}

## Industries Served

${INDUSTRIES.map((ind) => `- **${ind.name}**: ${ind.description}`).join('\n')}

## Export Markets

${EXPORT_COUNTRIES.map((c) => c.name).join(', ')}.

## Technical Capabilities

- **Annual Capacity**: 10,000+ MT
- **Purity Standards**: Up to 99.9%
- **Shipping Ports**: Chennai, Tuticorin
- **Packaging**: HDPE drums, fiber drums, jumbo bags, retail packs
- **Payment Terms**: LC, TT, DA/DP
- **Incoterms**: FOB, CIF, CFR available
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
