import { NextResponse } from 'next/server';
import { COMPANY, SITE_URL, SITE_NAME, CERTIFICATIONS } from '@/lib/constants';

export async function GET() {
  const content = `# ${SITE_NAME}

> ${COMPANY.tagline}

${COMPANY.description}

## Company Details

- **Founded**: ${COMPANY.founded}
- **Location**: ${COMPANY.location.address}
- **Phone**: ${COMPANY.contact.phone}
- **Business Hours**: ${COMPANY.businessHours}
- **Brands**: Kalasam, Temple Dharisana

## Products

### Industrial Chemicals
- [Synthetic Camphor](${SITE_URL}/products/synthetic-camphor) — Pharmaceutical, industrial, and food-grade (96%–99.9% purity)
- [D-Camphor](${SITE_URL}/products/d-camphor) — Natural dextro-camphor for pharmaceutical applications
- [Isoborneol Powder](${SITE_URL}/products/isoborneol-powder) — High-purity intermediate for chemical synthesis
- [Isoborneol Flakes](${SITE_URL}/products/isoborneol-flakes) — Industrial-grade flaked form
- [Camphor Oil](${SITE_URL}/products/camphor-oil) — Pure camphor essential oil

### Pooja & Temple Products
- Camphor Tablets — Premium pooja-grade camphor cubes
- Agarbathi (Incense Sticks) — Flora, sandalwood, jasmine, rose varieties
- Cup Sambrani — Traditional dhoop cups
- Lamp Oil — Gingelly and sesame deepam oil
- Rose Water — Paneer rose water, food and cosmetic grade

## Key Pages

- [About Us](${SITE_URL}/about)
- [All Products](${SITE_URL}/products)
- [Export Division](${SITE_URL}/export) — Serving 17+ countries across Asia, Middle East, Africa
- [Manufacturing](${SITE_URL}/manufacturing)
- [Quality Control](${SITE_URL}/quality-control)
- [OEM & Private Label](${SITE_URL}/oem-manufacturing)
- [Certificates](${SITE_URL}/certificates)
- [FAQ](${SITE_URL}/faq)
- [Contact](${SITE_URL}/contact)
- [Blog](${SITE_URL}/blog)

## Certifications

${CERTIFICATIONS.map((c) => `- ${c}`).join('\n')}

## Industries Served

- Pharmaceutical
- Fragrance & Flavor
- Cosmetics & Personal Care
- Chemical Manufacturing
- Food & Beverage
- Temple & Religious
- Household & FMCG
- Plastics & Polymers

## Export Markets

Bangladesh, Sri Lanka, Malaysia, Singapore, Nepal, UAE, Saudi Arabia, Oman, Qatar, Kuwait, Indonesia, Vietnam, Thailand, Nigeria, Kenya, United States.
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
