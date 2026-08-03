const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'src', 'app', '(public)');

// Map page folder name to background image and titles
const heroData = {
  'about': {
    title: 'Our Story',
    overline: 'About Us',
    description: 'Three decades of manufacturing excellence, innovation, and trust — from a humble beginning in Theni to global markets.',
    image: '/images/hero/factory-campus.png'
  },
  'wholesale': {
    title: 'Wholesale & B2B Distribution',
    overline: 'Partnerships',
    description: 'Connect with our team to secure direct bulk factory pricing and regular wholesale supply chains across India.',
    image: '/images/sections/warehouse.png'
  },
  'research-development': {
    title: 'Research & Development',
    overline: 'Innovation',
    description: 'Advanced laboratories, cutting-edge formulation development, and state-of-the-art testing systems.',
    image: '/images/sections/qc-laboratory.png'
  },
  'quality-control': {
    title: 'Quality Control & QA',
    overline: 'Accreditations',
    description: 'ISO 9001:2015 certified, gas chromatography systems, and strict batch-wise laboratory testing checklists.',
    image: '/images/sections/qc-laboratory.png'
  },
  'products': {
    title: 'B2B Product Catalog',
    overline: 'Our Products',
    description: 'Explore our complete catalog of industrial chemicals, premium camphor, isoborneol flakes, and organic intermediates.',
    image: '/images/hero/factory-campus.png'
  },
  'private-label': {
    title: 'Private Label Manufacturing',
    overline: 'B2B Solutions',
    description: 'Package our premium-grade camphor and incense under your brand with custom box printing, labeling, and design.',
    image: '/images/hero/manufacturing-line.png'
  },
  'oem-manufacturing': {
    title: 'OEM Manufacturing Services',
    overline: 'B2B Contract Manufacturing',
    description: 'Custom formulation and bulk contract manufacturing for chemical and FMCG brands globally.',
    image: '/images/hero/manufacturing-line.png'
  },
  'msds-library': {
    title: 'MSDS Document Library',
    overline: 'Regulatory Compliance',
    description: 'Download official Material Safety Data Sheets (MSDS) for all our chemical grades and compounds.',
    image: '/images/sections/qc-laboratory.png'
  },
  'manufacturing': {
    title: 'Manufacturing Operations',
    overline: 'Excellence in Production',
    description: 'State-of-the-art chemical synthesis facilities, vacuum distillation towers, and clean packing zones.',
    image: '/images/hero/manufacturing-line.png'
  },
  'industries-we-serve': {
    title: 'Industries We Serve',
    overline: 'Global Impact',
    description: 'Powering incense, pharmaceutical, paint, rubber, cosmetics, and fragrance industries worldwide.',
    image: '/images/hero/factory-campus.png'
  },
  'infrastructure': {
    title: 'Factory Infrastructure',
    overline: 'Industrial Scale',
    description: 'Exploring our chemical manufacturing reactors, steam plants, and safety layouts in Theni, Tamil Nadu.',
    image: '/images/hero/factory-campus.png'
  },
  'gallery': {
    title: 'Media Gallery',
    overline: 'Our Facilities',
    description: 'Walk through our manufacturing units, QA laboratory, warehouse facilities, and corporate campus.',
    image: '/images/hero/factory-campus.png'
  },
  'industrial-chemicals': {
    title: 'Industrial Chemicals',
    overline: 'B2B Intermediates',
    description: 'Refined synthetic camphor, D-camphor, isoborneol flakes, and organic compounds for chemical plants.',
    image: '/images/hero/manufacturing-line.png'
  },
  'faq': {
    title: 'Frequently Asked Questions',
    overline: 'Help Center',
    description: 'Frequently asked questions about our products, exports, OEM services, and distributor partnerships.',
    image: '/images/hero/factory-campus.png'
  },
  'export': {
    title: 'Global Export Division',
    overline: 'International Shipments',
    description: 'Exporting premium synthetic camphor and pooja products to 17+ countries with full regulatory documentation.',
    image: '/images/hero/export-port.png'
  },
  'downloads': {
    title: 'Document Downloads',
    overline: 'Resource Center',
    description: 'Access and download our catalogs, brochures, quality certificates, and product datasheets.',
    image: '/images/sections/warehouse.png'
  },
  'distributors': {
    title: 'Distributor Application',
    overline: 'Become a Partner',
    description: 'Join our wholesale distribution network across India. Expand your business with premium pooja brands.',
    image: '/images/sections/warehouse.png'
  },
  'contact': {
    title: 'Contact Us',
    overline: 'Get in Touch',
    description: 'Product inquiries, export quotations, OEM partnerships, or distributor applications — our team is ready to help.',
    image: '/images/hero/factory-campus.png'
  },
  'coa-library': {
    title: 'COA Library',
    overline: 'Quality Certificates',
    description: 'Search and download official Certificates of Analysis (COA) for your specific product batches.',
    image: '/images/sections/qc-laboratory.png'
  },
  'certificates': {
    title: 'Quality & ISO Certificates',
    overline: 'Accreditations',
    description: 'Review our official ISO, quality control compliance certifications, and industry memberships.',
    image: '/images/hero/factory-campus.png'
  },
  'careers': {
    title: 'Careers & Openings',
    overline: 'Join Our Team',
    description: 'Build your career in chemical manufacturing, administration, logistics, and quality assurance.',
    image: '/images/hero/factory-campus.png'
  },
  'blog': {
    title: 'Latest Industry News',
    overline: 'Knowledge Hub',
    description: 'Deep dives into chemical properties, global export trends, temple rituals, and camphor manufacturing.',
    image: '/images/hero/factory-campus.png'
  }
};

// Loop through each folder
Object.entries(heroData).forEach(([folder, data]) => {
  const filePath = path.join(publicDir, folder, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if PageHero is already imported
  if (content.includes('import PageHero') || content.includes('<PageHero')) {
    console.log(`Skipping already modified page: ${folder}`);
    return;
  }

  // Find the hero <section> block
  // Matches: <section className="relative bg-primary-dark... </section>
  const sectionRegex = /<section\s+className=["']relative\s+(?:bg-primary-dark|bg-gradient-to-br)[^]*?<\/section>/;
  if (!sectionRegex.test(content)) {
    console.log(`Could not find inline hero section in: ${folder}`);
    return;
  }

  // Inject import PageHero
  let importAdded = false;
  const importLines = [
    `import PageHero from '@/components/ui/PageHero';`
  ];

  // We can insert the import at the top of the file
  const lines = content.split('\n');
  let insertIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("'use client'") || lines[i].startsWith('"use client"')) {
      insertIndex = i + 1;
    }
  }

  lines.splice(insertIndex, 0, `import PageHero from '@/components/ui/PageHero';`);
  content = lines.join('\n');

  // Replace the inline section with <PageHero />
  const replacement = `<PageHero
        title="${data.title}"
        overline="${data.overline}"
        description="${data.description}"
        backgroundImage="${data.image}"
      />`;

  content = content.replace(sectionRegex, replacement);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated page hero successfully for: ${folder}`);
});

console.log('All hero banners updated successfully!');
