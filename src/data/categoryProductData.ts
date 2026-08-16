/* ═══════════════════════════════════════════════════════════════
   Category-Specific Product Detail Helpers
   Provides tailored hero stats, specification rows, FAQs,
   and bonus section content for each product category.
   ═══════════════════════════════════════════════════════════════ */

import type { ProductCategory } from '@/types';

// ── Types ──────────────────────────────────────────────────────

export interface HeroStat {
  label: string;
  value: string;
  highlight?: boolean; // renders in green accent
}

export interface SpecRow {
  label: string;
  value: string;
}

export interface CategoryFAQ {
  question: string;
  answer: string;
}

export interface BonusSection {
  icon: string;
  title: string;
  subtitle: string;
  cards: { title: string; items: string[] }[];
  note: string;
  ctaLabel: string;
  accentColor: 'blue' | 'amber' | 'orange' | 'rose' | 'purple' | 'emerald';
}

// ── Hero Stats ─────────────────────────────────────────────────

export function getCategoryHeroStats(product: any): HeroStat[] {
  const cat: ProductCategory = product.category;

  switch (cat) {
    case 'Industrial Product':
      return [
        { label: 'CAS No.', value: product.casNumber || '76-22-2', highlight: true },
        { label: 'Formula', value: product.molecularFormula || 'C₁₀H₁₆O' },
        { label: 'Assay / Purity', value: product.purity || '≥96%', highlight: true },
        { label: 'Mol. Weight', value: product.molecularWeight || '152.23 g/mol' },
      ];

    case 'Camphor':
      return [
        { label: 'Form', value: product.appearance || 'Compressed Tablets' },
        { label: 'Residue', value: 'Zero (Clean Burn)', highlight: true },
        { label: 'Suitable For', value: 'Pooja & Aarti' },
        { label: 'Shelf Life', value: product.shelfLife || '2–3 Years' },
      ];

    case 'Lamp Oil':
      return [
        { label: 'Volume', value: extractVolume(product) },
        { label: 'Flame Quality', value: 'Steady & Bright', highlight: true },
        { label: 'Smoke Level', value: 'Low / Smokeless' },
        { label: 'Suitable For', value: 'All Diya Types' },
      ];

    case 'Agarbathi':
      return [
        { label: 'Fragrances', value: extractFragranceCount(product) },
        { label: 'Sticks/Pack', value: extractStickCount(product) },
        { label: 'Burn Time', value: '25–45 Min', highlight: true },
        { label: 'Stick Length', value: '8–9 Inches' },
      ];

    case 'Sambrani':
      return [
        { label: 'Pcs/Box', value: extractPiecesCount(product) },
        { label: 'Burn Time', value: '20–30 Min', highlight: true },
        { label: 'Fragrance', value: 'Benzoin Resin' },
        { label: 'Cup Type', value: extractCupType(product) },
      ];

    case 'Rose Water':
      return [
        { label: 'Volume', value: extractVolume(product) },
        { label: 'Purity', value: '100% Pure', highlight: true },
        { label: 'Color', value: 'Clear / Transparent' },
        { label: 'Shelf Life', value: product.shelfLife || '12–24 Months' },
      ];

    default:
      return [
        { label: 'Category', value: product.category },
        { label: 'SKU', value: product.sku || 'N/A' },
        { label: 'Status', value: 'Available' },
        { label: 'Packing', value: 'Custom' },
      ];
  }
}

// ── Specification Rows ─────────────────────────────────────────

export function getCategorySpecs(product: any): SpecRow[] {
  const cat: ProductCategory = product.category;

  switch (cat) {
    case 'Industrial Product':
      return [
        { label: 'Chemical Name', value: product.name },
        { label: 'IUPAC Name', value: product.slug?.includes('d-camphor') ? '(1R,4R)-1,7,7-Trimethylbicyclo[2.2.1]heptan-2-one' : product.slug?.includes('camphor-oil') ? 'Camphor Oil (Essential Oil Blend)' : '1,7,7-Trimethylbicyclo[2.2.1]heptan-2-one' },
        { label: 'CAS Registry No', value: product.casNumber || getCASForProduct(product.slug) },
        { label: 'Molecular Formula', value: product.molecularFormula || 'C₁₀H₁₆O' },
        { label: 'Molecular Weight', value: product.molecularWeight || '152.23 g/mol' },
        { label: 'Assay / Purity', value: product.purity || 'Technical Grade (≥96%)' },
        { label: 'Appearance', value: product.appearance || 'White crystalline powder or granules' },
        { label: 'Odor', value: product.odor || 'Characteristic camphoraceous' },
        { label: 'Melting Point', value: product.meltingPoint || '175–179 °C' },
        { label: 'Boiling Point', value: product.boilingPoint || '204–209 °C' },
        { label: 'Density', value: product.density || '0.990–0.996 g/cm³' },
        { label: 'Solubility', value: product.solubility || 'Slightly soluble in water; soluble in ethanol, ether' },
        { label: 'Flash Point', value: '66 °C (closed cup)' },
        { label: 'Storage', value: product.storage || 'Store in cool, dry, well-ventilated area. Keep away from ignition sources.' },
      ];

    case 'Camphor':
      return [
        { label: 'Product Name', value: product.name },
        { label: 'Product Type', value: getCamphorType(product) },
        { label: 'Form / Shape', value: product.appearance || getCamphorForm(product) },
        { label: 'Base Material', value: 'Refined Synthetic Camphor (C₁₀H₁₆O)' },
        { label: 'Burn Residue', value: 'Zero — Burns completely clean with no ash or soot' },
        { label: 'Flame Quality', value: 'Bright, steady, clean flame suitable for aarti' },
        { label: 'Fragrance', value: 'Mild, pure camphor aroma — calms mind and purifies air' },
        { label: 'Color', value: 'Pure White / Translucent' },
        { label: 'Suitable For', value: 'Daily pooja, temple aarti, havan, spiritual ceremonies' },
        { label: 'Packing Format', value: getCamphorPacking(product) },
        { label: 'Shelf Life', value: product.shelfLife || '2–3 Years (in airtight packaging)' },
        { label: 'Storage', value: product.storage || 'Store in airtight container, cool dry place, away from flame and direct sunlight' },
        { label: 'Safety', value: 'Flammable — keep away from children and ignition sources' },
      ];

    case 'Lamp Oil':
      return [
        { label: 'Product Name', value: product.name },
        { label: 'Oil Type', value: 'Pure Pooja Lamp Oil (Deepam Oil)' },
        { label: 'Volume', value: extractVolume(product) },
        { label: 'Composition', value: 'Plant-based oil blend for clean burning' },
        { label: 'Appearance', value: product.appearance || 'Golden yellow to amber liquid' },
        { label: 'Flame Quality', value: 'Steady, bright, consistent flame' },
        { label: 'Smoke Level', value: 'Low-smoke / Smokeless — ideal for indoor worship' },
        { label: 'Soot Formation', value: 'Minimal — keeps diya and surroundings clean' },
        { label: 'Flash Point', value: '>200°C (safe for household use)' },
        { label: 'Suitable Lamps', value: 'Brass diya, clay diya, agal vilakku, bronze lamps, silver lamps' },
        { label: 'Fragrance', value: 'Mild natural oil aroma' },
        { label: 'Shelf Life', value: product.shelfLife || '18–24 Months' },
        { label: 'Storage', value: product.storage || 'Store in cool, dry place. Keep bottle capped tightly.' },
        { label: 'Usage', value: 'External use only — for oil lamps and diyas' },
      ];

    case 'Agarbathi':
      return [
        { label: 'Product Name', value: product.name },
        { label: 'Stick Type', value: 'Hand-rolled / Machine-rolled Masala Agarbathi' },
        { label: 'Available Fragrances', value: extractFragranceList(product) },
        { label: 'Sticks Per Pack', value: extractStickCount(product) },
        { label: 'Stick Length', value: '8–9 Inches (approx. 20–23 cm)' },
        { label: 'Stick Diameter', value: '3–4 mm (including paste coating)' },
        { label: 'Burn Time Per Stick', value: '25–45 minutes (varies by thickness)' },
        { label: 'Smoke Level', value: 'Moderate — even fragrance diffusion' },
        { label: 'Ash Behavior', value: 'Clean, fine ash — drops naturally' },
        { label: 'Base Material', value: 'Bamboo core with charcoal/jigat binding paste' },
        { label: 'Fragrance Type', value: 'Premium perfume oil dipped' },
        { label: 'Packing', value: getAgarbathiPacking(product) },
        { label: 'Shelf Life', value: product.shelfLife || '2–3 Years (in sealed packaging)' },
        { label: 'Storage', value: product.storage || 'Store in dry place, away from moisture. Keep packaging sealed.' },
      ];

    case 'Sambrani':
      return [
        { label: 'Product Name', value: product.name },
        { label: 'Cup Type', value: extractCupType(product) },
        { label: 'Pieces Per Box', value: extractPiecesCount(product) },
        { label: 'Base Ingredient', value: 'Benzoin resin (Sambrani / Loban) from Styrax tree' },
        { label: 'Additional Ingredients', value: 'Natural wood powder, aromatic herbs, binding gum' },
        { label: 'Burn Time Per Cup', value: '20–30 minutes' },
        { label: 'Fragrance Duration', value: '2–3 hours (lingering aroma after burn)' },
        { label: 'Fragrance Intensity', value: 'Medium to Strong — rich, resinous, traditional' },
        { label: 'Smoke Type', value: 'Dense, aromatic white smoke — traditional dhoop style' },
        { label: 'Cup Dimensions', value: 'Approx. 3 cm height × 3 cm diameter' },
        { label: 'Suitable For', value: 'Daily pooja, temple rituals, home purification, meditation' },
        { label: 'How to Use', value: 'Light the cup edge with a match/lighter, blow out flame, place on heat-safe holder' },
        { label: 'Shelf Life', value: product.shelfLife || '2–3 Years' },
        { label: 'Storage', value: product.storage || 'Store in dry place, away from moisture and direct sunlight' },
      ];

    case 'Rose Water':
      return [
        { label: 'Product Name', value: product.name },
        { label: 'Volume', value: extractVolume(product) },
        { label: 'Purity', value: '100% Pure Rose Water (Gulab Jal / Panneer)' },
        { label: 'Source', value: 'Steam-distilled from fresh Rosa damascena petals' },
        { label: 'Color', value: 'Clear / Transparent (no artificial colors)' },
        { label: 'Fragrance', value: 'Natural, mild rose petal aroma' },
        { label: 'pH Level', value: '4.0–5.5 (naturally mild)' },
        { label: 'Additives', value: 'None — free from alcohol, preservatives, synthetic fragrances' },
        { label: 'Suitable For', value: 'Pooja abhishekam, ritual sprinkling, deity bathing, chandan paste mixing' },
        { label: 'Other Uses', value: 'Room freshener, hair care, skin toner, garland moistening' },
        { label: 'Packing', value: getRoseWaterPacking(product) },
        { label: 'Shelf Life', value: product.shelfLife || '12–24 Months' },
        { label: 'Storage', value: product.storage || 'Store in cool, dry place. Refrigerate after opening for best results.' },
      ];

    default:
      return [
        { label: 'Product Name', value: product.name },
        { label: 'Category', value: product.category },
        { label: 'Status', value: 'Available' },
      ];
  }
}

// ── Category FAQs ──────────────────────────────────────────────

export function getCategoryFAQs(product: any): CategoryFAQ[] {
  const cat: ProductCategory = product.category;

  switch (cat) {
    case 'Industrial Product':
      return [
        {
          question: 'What is the minimum order quantity (MOQ) for industrial camphor?',
          answer: 'Standard MOQ is one 30kg bag for synthetic camphor powder. For specialty grades (D-Camphor, Camphor Oil, Isobornyl Acetate), MOQ varies — please contact our sales team for exact quantities. Trial orders for quality evaluation are considered on a case-by-case basis.'
        },
        {
          question: 'Do you provide COA (Certificate of Analysis) and MSDS documentation?',
          answer: 'Yes, we provide batch-wise Certificate of Analysis (COA) and Material Safety Data Sheet (MSDS/SDS) for all industrial products. Third-party lab testing reports are also available on request for export and pharma buyers.'
        },
        {
          question: 'Can you supply pharmaceutical-grade camphor?',
          answer: 'Yes, we supply pharmaceutical-grade synthetic camphor suitable for pharma formulations and compounding facilities. Custom purity specifications (IP/BP/USP grade requirements) can be accommodated — contact our technical sales team for detailed specification sheets.'
        },
        {
          question: 'What packaging options are available for export shipments?',
          answer: 'Standard packing is 30kg HDPE-lined bags. For export, we offer custom packaging including 25kg bags, fibre drums, and full container load (FCL) configurations with palletization. All packaging complies with international shipping and customs standards.'
        },
        {
          question: 'What is the CAS number for synthetic camphor?',
          answer: 'Synthetic camphor (DL-Camphor, racemic mixture) has CAS No. 76-22-2. D-Camphor (dextrorotatory, natural enantiomer) has CAS No. 464-49-3. Camphor Oil (essential oil) has CAS No. 8008-51-3. Always verify the specific CAS number for your application with your COA.'
        },
      ];

    case 'Camphor':
      return [
        {
          question: 'Does Kalasam camphor burn without leaving residue?',
          answer: 'Yes, all Kalasam camphor products — tablets, flakes, and cubes — are manufactured from refined synthetic camphor that burns completely clean. There is zero ash, soot, or black residue left behind, making them ideal for daily pooja and temple aarti.'
        },
        {
          question: 'What is the difference between tablet shapes (small round, big round, square)?',
          answer: 'The camphor composition and burn quality is identical across all shapes. The difference is purely in form factor and packing preference: small round tablets are convenient for daily home use, big round tablets last longer for temple aarti, and square tablets are a traditional format preferred by certain regional buyers.'
        },
        {
          question: 'Is Kalasam camphor suitable for temple use?',
          answer: 'Absolutely. Kalasam camphor is widely used in temples across South India. Our products are specifically manufactured for clean, bright, steady-flame burning during aarti. We also offer bulk temple supply packs (half-kg and 1kg covers) for institutional orders.'
        },
        {
          question: 'How should camphor tablets be stored?',
          answer: 'Store camphor in its original airtight packaging in a cool, dry place away from direct sunlight and heat sources. Camphor naturally sublimates (evaporates from solid to gas) if left exposed to air, so always reseal the pack after use. Keep out of reach of children as it is flammable.'
        },
        {
          question: 'What is the shelf life of Kalasam camphor?',
          answer: 'Kalasam camphor tablets have a shelf life of 2–3 years when stored properly in sealed, airtight packaging. Once opened, use within 6–12 months for optimal fragrance and burn quality.'
        },
      ];

    case 'Lamp Oil':
      return [
        {
          question: 'Is Kalasam lamp oil suitable for brass and clay diyas?',
          answer: 'Yes, Kalasam pure lamp oil is compatible with all traditional lamp types including brass diyas, clay diyas (deepam), agal vilakku (bronze standing lamps), silver lamps, and copper lamps. It produces a clean, steady flame in all lamp formats.'
        },
        {
          question: 'Does this lamp oil produce smoke?',
          answer: 'Kalasam lamp oil is formulated for low-smoke to smokeless burning, making it ideal for indoor worship spaces. Unlike kerosene or paraffin-based oils, our plant-based lamp oil produces minimal soot and keeps your diya and surroundings clean.'
        },
        {
          question: 'How long does one bottle of lamp oil last?',
          answer: 'Burn duration depends on the wick size, diya type, and how many hours you light daily. As a rough guide: a 50ml bottle lasts 5–7 days with single-diya daily use, 100ml lasts about 2 weeks, 200ml lasts about a month, and 500ml/1L bottles are suited for temples or multi-lamp households.'
        },
        {
          question: 'Can Kalasam lamp oil be used in agal vilakku (traditional standing lamps)?',
          answer: 'Yes, Kalasam lamp oil works perfectly in agal vilakku and all traditional South Indian standing lamps. The oil is formulated for steady wicking and bright flame output, which is essential for the multi-wick design of traditional vilakkus.'
        },
        {
          question: 'Is this oil safe for daily indoor use?',
          answer: 'Yes, Kalasam lamp oil is a plant-based oil blend specifically designed for safe indoor use during daily pooja. It has a high flash point (>200°C) for household safety and produces minimal fumes. However, always supervise lit lamps and keep away from flammable materials.'
        },
      ];

    case 'Agarbathi':
      return [
        {
          question: 'Which fragrances are available in Kalasam Agarbathi?',
          answer: 'Kalasam Agarbathi is available in 5 premium fragrances: Rose (sweet floral), Lavender (calming herbal), Black (intense musky), Jasmine (traditional temple fragrance), and Pineapple (fresh fruity). All fragrances are available across Rs5, Rs10, and Rs20 pack sizes.'
        },
        {
          question: 'How long does one agarbathi stick burn?',
          answer: 'Each Kalasam agarbathi stick burns for approximately 25–45 minutes depending on the thickness and room airflow. Thicker premium sticks burn longer. The fragrance typically lingers in the room for 1–2 hours after the stick finishes burning.'
        },
        {
          question: 'Are Kalasam incense sticks safe for indoor use?',
          answer: 'Yes, Kalasam agarbathi sticks are designed for indoor use during pooja and daily worship. For best experience, use in a well-ventilated room. We recommend using a proper incense holder and not placing burning sticks near curtains or flammable materials.'
        },
        {
          question: 'What is the base material of the sticks?',
          answer: 'Kalasam agarbathi uses a bamboo core coated with a charcoal and natural jigat (tree bark gum) binding paste. The sticks are then dipped in premium fragrance oils for long-lasting, even scent release. The bamboo core ensures straight, even burning.'
        },
        {
          question: 'How should I store agarbathi sticks?',
          answer: 'Keep agarbathi packs sealed in their original packaging and store in a dry place away from moisture and direct sunlight. Moisture can affect burn quality and fragrance intensity. Properly stored, Kalasam agarbathi has a shelf life of 2–3 years.'
        },
      ];

    case 'Sambrani':
      return [
        {
          question: 'How do I light a Kalasam sambrani cup?',
          answer: 'Simply hold a match or lighter to the edge of the sambrani cup for 10–15 seconds until it catches. Once the edge glows red, gently blow out any open flame. Place the cup on a heat-resistant holder or plate, and let the aromatic smoke fill the room. No separate charcoal is needed.'
        },
        {
          question: 'How long does a sambrani cup burn?',
          answer: 'Each Kalasam sambrani cup burns for approximately 20–30 minutes, producing thick, fragrant smoke throughout. The rich benzoin resin aroma continues to linger in the room for 2–3 hours after the cup finishes burning.'
        },
        {
          question: 'Do I need charcoal to use sambrani cups?',
          answer: 'No. Kalasam sambrani cups are self-igniting — they contain the combustible base material within the cup itself. Simply light the edge directly. This is what makes cup sambrani more convenient than loose sambrani/loban, which requires separate charcoal.'
        },
        {
          question: 'What is the difference between Cup Sambrani and Computer Sambrani?',
          answer: 'Both are cup-shaped dhoop formats. "Cup Sambrani" refers to the traditional hand-molded cup, while "Computer Sambrani" refers to a machine-pressed/molded format that is uniform in shape and size. Both use benzoin resin as the base ingredient and offer similar fragrance and burn characteristics.'
        },
        {
          question: 'Is sambrani safe for daily use at home?',
          answer: 'Yes, Kalasam sambrani cups are made with natural benzoin resin and are safe for regular household use. For best results, use in a well-ventilated room. Always place on a heat-resistant surface, keep away from children, and never leave burning sambrani unattended.'
        },
      ];

    case 'Rose Water':
      return [
        {
          question: 'Is Kalasam rose water pure and natural?',
          answer: 'Yes, Kalasam rose water is 100% pure, distilled from fresh Rosa damascena rose petals. It contains no artificial colors, synthetic fragrances, alcohol, or chemical preservatives. The clear, transparent color is a sign of genuine purity.'
        },
        {
          question: 'How is rose water used in pooja and rituals?',
          answer: 'Rose water is used for deity abhishekam (ritual bathing), sprinkling on sacred spaces for purification, mixing with chandan (sandalwood) or kumkum paste, moistening flower garlands, and as a general purifying agent during temple and home worship ceremonies.'
        },
        {
          question: 'Can Kalasam rose water be used on skin?',
          answer: 'While our rose water is pure and natural, it is primarily manufactured and positioned for pooja and ritual use. For personal skincare applications, we recommend consulting the label for specific usage directions. It is not marketed as a cosmetic or food-grade product.'
        },
        {
          question: 'What is the shelf life of rose water?',
          answer: 'Kalasam rose water has a shelf life of 12–24 months from the date of manufacturing when stored in a cool, dry place. Once opened, use within 3–6 months for optimal fragrance. Refrigerating after opening helps maintain freshness longer.'
        },
        {
          question: 'What sizes are available in Kalasam rose water?',
          answer: 'Kalasam rose water is available in 100ml, 200ml, 500ml, and 1 Litre bottles. The 100ml–200ml sizes are ideal for daily home pooja, while the 500ml and 1L bottles are suited for temples, event organizers, and retail stockists.'
        },
      ];

    default:
      return [
        {
          question: 'What is the MOQ for this product?',
          answer: 'Please contact our sales team for minimum order quantity details and pricing.'
        },
      ];
  }
}

// ── Bonus Sections ─────────────────────────────────────────────

export function getCategoryBonusSection(product: any): BonusSection | null {
  const cat: ProductCategory = product.category;

  switch (cat) {
    case 'Camphor':
      return {
        icon: '🕉️',
        title: 'For Temple & Pooja Buyers',
        subtitle: 'Kalasam camphor is trusted by thousands of temples and devotees across South India for clean, residue-free burning during daily aarti and special ceremonies. Our camphor is manufactured to deliver a bright, pure flame every time.',
        cards: [
          {
            title: 'Pooja Quality Assurance',
            items: [
              'Zero-residue, soot-free burning guaranteed',
              'Bright, steady flame ideal for aarti',
              'Pure camphor fragrance — calms and purifies',
              'No chemical smell or irritating fumes',
            ]
          },
          {
            title: 'Temple & Bulk Supply',
            items: [
              'Bulk packs: half-kg and 1kg covers available',
              'Special pricing for temple institutional orders',
              'Consistent quality across all batches',
              'Multiple tablet shapes to match regional preferences',
            ]
          },
        ],
        note: 'For bulk temple orders (50kg+), special institutional pricing, or custom packing requirements, please contact our temple supply division directly.',
        ctaLabel: 'Request Temple Supply Quote',
        accentColor: 'amber',
      };

    case 'Lamp Oil':
      return {
        icon: '🪔',
        title: 'Traditional Lamp Lighting Guide',
        subtitle: 'Using the right oil and technique makes all the difference in your diya experience. Kalasam lamp oil is formulated for the cleanest, brightest flame across all traditional Indian lamp types.',
        cards: [
          {
            title: 'Lamp Compatibility',
            items: [
              'Brass diya — perfect for daily home pooja',
              'Clay diya (deepam) — ideal for festivals and special occasions',
              'Agal vilakku — traditional South Indian standing lamp',
              'Bronze and silver lamps — for temple and formal worship',
            ]
          },
          {
            title: 'Best Practices',
            items: [
              'Use a cotton wick for cleanest burning',
              'Trim wick to 5mm above oil level for steady flame',
              'Fill oil to 3/4 capacity — avoid overfilling',
              'Allow lamp to cool completely before cleaning or refilling',
            ]
          },
        ],
        note: 'Kalasam lamp oil is for external use only (oil lamps and diyas). Do not consume. Always supervise lit lamps and keep away from children and flammable materials.',
        ctaLabel: 'Order Lamp Oil in Bulk',
        accentColor: 'orange',
      };

    case 'Agarbathi':
      return {
        icon: '🌸',
        title: 'Fragrance Guide — Choose Your Mood',
        subtitle: 'Each Kalasam agarbathi fragrance is crafted to create a distinct atmosphere. Choose the right scent for your worship, meditation, or home ambiance needs.',
        cards: [
          {
            title: 'Floral & Traditional',
            items: [
              '🌹 Rose — Sweet, romantic floral; ideal for daily pooja and special prayers',
              '🌼 Jasmine — Classic temple fragrance; calming and devotional',
              '💜 Lavender — Herbal, soothing; perfect for meditation and relaxation',
            ]
          },
          {
            title: 'Bold & Fresh',
            items: [
              '🖤 Black — Deep, musky, intense; for evening aarti and strong ambiance',
              '🍍 Pineapple — Fresh, fruity, modern; brightens any room instantly',
              '✨ All fragrances available in Rs5, Rs10, and Rs20 packs',
            ]
          },
        ],
        note: 'Custom fragrance blends and private label manufacturing are available for distributors and retailers with bulk order commitments.',
        ctaLabel: 'Request Fragrance Samples',
        accentColor: 'purple',
      };

    case 'Sambrani':
      return {
        icon: '💨',
        title: 'Ritual Fragrance Guide',
        subtitle: 'Sambrani (benzoin resin) has been used in Indian households and temples for centuries to purify spaces, ward off negative energies, and create a sacred atmosphere during worship.',
        cards: [
          {
            title: 'Traditional Significance',
            items: [
              'Used in daily pooja for space purification and positive energy',
              'Traditional "dhoop" for evening aarti in South Indian homes',
              'Smoke bathing (hair drying after bath) — an ancient wellness ritual',
              'Creates sacred atmosphere for meditation and spiritual practices',
            ]
          },
          {
            title: 'Usage Tips',
            items: [
              'Light the edge, blow out flame, place on heat-safe stand',
              'Use in well-ventilated room for best experience',
              'One cup is sufficient for a standard room (10x12 ft)',
              'Store unused cups in dry place for lasting fragrance',
            ]
          },
        ],
        note: 'Kalasam sambrani cups use natural benzoin resin as the primary ingredient. No synthetic chemicals or harmful accelerants are used.',
        ctaLabel: 'Bulk Order Sambrani',
        accentColor: 'amber',
      };

    case 'Rose Water':
      return {
        icon: '🌹',
        title: 'Multi-Purpose Usage Guide',
        subtitle: 'Kalasam rose water is a versatile, pure product that finds use across pooja rituals, home freshening, and traditional practices. Its natural rose petal fragrance enhances every application.',
        cards: [
          {
            title: 'Pooja & Ritual Uses',
            items: [
              'Abhishekam — ritual bathing of deity idols',
              'Chandan mixing — blend with sandalwood powder for tilak paste',
              'Space purification — sprinkle around pooja area',
              'Garland care — mist on flower garlands to keep them fresh',
            ]
          },
          {
            title: 'Home & Everyday Uses',
            items: [
              'Room freshener — spray for natural rose fragrance',
              'Festival preparation — use in Holi, Navratri, Diwali ceremonies',
              'Guest welcome — sprinkle on guests during auspicious events',
              'Hair rinse — traditional post-wash hair freshening rinse',
            ]
          },
        ],
        note: 'Kalasam rose water is pure and free from artificial additives. It is primarily manufactured for pooja and ritual use. For any other applications, please refer to the product label.',
        ctaLabel: 'Request Rose Water Quote',
        accentColor: 'rose',
      };

    // Industrial Product uses the existing hardcoded pharma section in the component
    default:
      return null;
  }
}

// ── Hero Badge Labels ──────────────────────────────────────────

export function getCategoryBadge(category: ProductCategory): string {
  switch (category) {
    case 'Industrial Product': return 'Export Certified';
    case 'Camphor': return 'Residue-Free Burn';
    case 'Lamp Oil': return 'Smokeless Formula';
    case 'Agarbathi': return '5 Fragrances';
    case 'Sambrani': return 'Self-Igniting';
    case 'Rose Water': return '100% Pure';
    default: return 'Premium Quality';
  }
}

// ── Helper Extractors ──────────────────────────────────────────

function extractVolume(product: any): string {
  const match = product.name?.match(/(\d+)\s*ml/i);
  if (match) return `${match[1]}ml`;
  if (product.packaging?.[0]) {
    return `${product.packaging[0].size} ${product.packaging[0].unit}`;
  }
  if (product.variants?.[0]?.attributes?.volume) {
    return product.variants[0].attributes.volume;
  }
  return 'Custom';
}

function extractFragranceCount(product: any): string {
  if (product.variants && product.variants.length > 1) {
    return `${product.variants.length} Options`;
  }
  return '5 Varieties';
}

function extractFragranceList(product: any): string {
  if (product.variants && product.variants.length > 0) {
    const flavours = product.variants.map((v: any) => v.attributes?.flavour).filter(Boolean);
    if (flavours.length > 0) return flavours.join(', ');
  }
  return 'Rose, Lavender, Black, Jasmine, Pineapple';
}

function extractStickCount(product: any): string {
  if (product.packaging?.[0]) {
    return `${product.packaging[0].size} ${product.packaging[0].unit}`;
  }
  if (product.variants?.[0]?.packingType) {
    return product.variants[0].packingType;
  }
  return 'As labeled';
}

function extractPiecesCount(product: any): string {
  if (product.packaging?.[0]) {
    return `${product.packaging[0].size} pcs`;
  }
  return '12 pcs';
}

function extractCupType(product: any): string {
  if (product.name?.toLowerCase().includes('computer')) return 'Computer (Machine-Pressed)';
  if (product.name?.toLowerCase().includes('cup')) return 'Cup (Traditional)';
  return 'Standard';
}

function getCASForProduct(slug: string): string {
  if (!slug) return '76-22-2';
  if (slug.includes('d-camphor')) return '464-49-3';
  if (slug.includes('camphor-oil')) return '8008-51-3';
  if (slug.includes('isobornyl')) return '125-12-2';
  return '76-22-2';
}

function getCamphorType(product: any): string {
  const name = (product.name || '').toLowerCase();
  if (name.includes('bhimseni') || name.includes('pachi')) return 'Bhimseni / Pachi Karpooram (Traditional Flakes)';
  if (name.includes('rs1')) return 'Budget Pooja Camphor Strip';
  if (name.includes('rs2')) return 'Standard Pooja Camphor Strip';
  if (name.includes('rs5')) return 'Value Pooja Camphor Pack';
  if (name.includes('rs10')) return 'Premium Pooja Camphor Box';
  if (name.includes('half') || name.includes('1kg') || name.includes('bulk')) return 'Bulk Temple Supply Pack';
  return 'Pooja Camphor Tablets';
}

function getCamphorForm(product: any): string {
  if (product.variants && product.variants.length > 0) {
    const shapes = product.variants.map((v: any) => v.attributes?.shape || v.materialType).filter(Boolean);
    if (shapes.length > 0) return shapes.join(', ');
  }
  const name = (product.name || '').toLowerCase();
  if (name.includes('bhimseni') || name.includes('pachi')) return 'Crystalline Flakes';
  return 'Compressed Tablets (White)';
}

function getCamphorPacking(product: any): string {
  if (product.variants && product.variants.length > 0) {
    const packing = product.variants.map((v: any) => v.packingType).filter(Boolean);
    const unique = [...new Set(packing)];
    if (unique.length > 0) return unique.join(' / ');
  }
  return 'Strip / Cover / Box';
}

function getAgarbathiPacking(product: any): string {
  if (product.packaging?.[0]) {
    return `${product.packaging[0].size} ${product.packaging[0].unit} per ${product.packaging[0].description || 'box'}`;
  }
  if (product.variants?.[0]?.packingType) {
    return product.variants[0].packingType;
  }
  return 'Box pack';
}

function getRoseWaterPacking(product: any): string {
  const vol = extractVolume(product);
  return `${vol} Bottle`;
}
