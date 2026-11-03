import type { Product } from '@/schemas/catalog';

export const fixtureProducts: Product[] = [
  {
    slug: 'mono-carton-boxes',
    name: 'Mono Carton Boxes',
    categorySlug: 'packaging-boxes',
    heading: 'Mono Carton Boxes for Retail, Pharma & FMCG Brands',
    summary:
      'Custom printed mono carton boxes made from single-layer paperboard — lightweight, sharp to print and sized exactly to your product.',
    intro: [
      'Mono cartons are folding boxes made from a single layer of paperboard. They are the most widely used retail packaging for cosmetics, medicines, food and personal care products because they print beautifully, fold flat for storage and protect the product without adding bulk.',
      'We make mono cartons to your exact dimensions on SBS board or duplex board, printed in full color and finished with lamination, spot UV, foil stamping or embossing. Choose a box style that suits your packing line and shelf display.',
    ],
    features: [
      {
        icon: 'Ruler',
        title: 'Exact-fit sizing',
        body: "Every carton is made to your product's dimensions for a clean, secure fit.",
      },
      {
        icon: 'Palette',
        title: 'Sharp full-color print',
        body: 'Offset printing in CMYK with Pantone spot colors for brand accuracy.',
      },
      {
        icon: 'Sparkles',
        title: 'Premium finishing',
        body: 'Matte, gloss or soft-touch lamination, spot UV, foil and embossing.',
      },
      {
        icon: 'Package',
        title: 'Flat-packed delivery',
        body: 'Supplied flat to save storage space; quick to erect on your packing line.',
      },
    ],
    specs: [
      {
        label: 'Board',
        value: 'SBS or duplex board, approx. 250–400 GSM',
      },
      {
        label: 'Printing',
        value: 'Offset CMYK, Pantone spot colors, inside printing on request',
      },
      {
        label: 'Lamination',
        value: 'Matte, gloss, soft-touch',
      },
      {
        label: 'Embellishments',
        value: 'Spot UV, hot foil stamping (gold, silver, colored), embossing, debossing',
      },
      {
        label: 'Box styles',
        value: 'Reverse tuck end, straight tuck end, crash-lock bottom, sleeve, custom',
      },
      {
        label: 'Supply',
        value: 'Flat-packed, die-cut and glued',
      },
    ],
    options: {
      materials: ['SBS board', 'Duplex board (grey back)', 'Duplex board (white back)'],
      printing: ['CMYK offset', 'Pantone spot colors', 'Inside printing'],
      finishes: [
        'Matte lamination',
        'Gloss lamination',
        'Soft-touch lamination',
        'Spot UV',
        'Hot foil stamping',
        'Embossing',
      ],
      formats: ['Reverse tuck end', 'Straight tuck end', 'Crash-lock bottom', 'Sleeve'],
    },
    applications: [
      'Cosmetics & skincare',
      'Pharmaceuticals & nutraceuticals',
      'Food & confectionery',
      'Personal care',
      'Perfumes & fragrances',
    ],
    faqs: [
      {
        q: 'What is a mono carton box?',
        a: "A mono carton is a folding box made from a single sheet of paperboard (not corrugated). It's light, prints very well and is the standard choice for retail product packaging.",
      },
      {
        q: 'Which board is best for mono cartons?',
        a: "SBS gives a bright white, premium surface for cosmetics and luxury items. Duplex is more economical for FMCG and everyday products. We'll recommend a board and thickness based on your product's weight and positioning.",
      },
      {
        q: 'What do I need to share for a quote?',
        a: 'Box dimensions (L × W × H), quantity, board preference, number of print colors, finishes and delivery city. Artwork or a sample photo helps.',
      },
    ],
    images: [
      {
        src: '/images/products/mono-carton-boxes/1.webp',
        alt: 'Matte-laminated mono carton boxes with gold foil detailing on a light grey background',
        width: 800,
        height: 600,
      },
    ],
    relatedSlugs: ['sbs-boxes'],
    quoteHints: {
      size: 'e.g. 120 × 80 × 40 mm (L × W × H)',
      quantity: 'e.g. 5,000 boxes',
      material: 'e.g. 350 GSM SBS',
    },
    seo: {
      title: 'Custom Mono Carton Boxes Manufacturer | VasuPrint',
      description:
        'Custom printed mono carton boxes for cosmetics, pharma and retail products. Offset printed with matte, gloss, foil and spot UV finishes.',
    },
    featured: true,
    sortOrder: 1,
    status: 'published',
  },
  {
    slug: 'sbs-boxes',
    name: 'SBS Boxes',
    categorySlug: 'packaging-boxes',
    heading: 'SBS Boxes — Premium Solid Bleached Sulphate Packaging',
    summary:
      'Premium boxes made from solid bleached sulphate board — bright white through and through, for crisp print and a luxury finish.',
    intro: [
      'SBS (Solid Bleached Sulphate) is a premium paperboard made from bleached virgin pulp. It is white on both sides and through the core, with a smooth coated surface that reproduces fine detail, rich colors and metallic finishes beautifully.',
      'That makes SBS the board of choice for cosmetics, fragrances, premium food and gift packaging, where the box is part of the product experience.',
    ],
    features: [
      {
        icon: 'Sun',
        title: 'Bright white surface',
        body: 'Clean white inside and out, so colors look vivid and true.',
      },
      {
        icon: 'Gem',
        title: 'Luxury presentation',
        body: 'Ideal base for foil, embossing and soft-touch finishes.',
      },
      {
        icon: 'ShieldCheck',
        title: 'Strong and rigid',
        body: 'Holds shape well and protects lightweight premium products.',
      },
    ],
    specs: [
      {
        label: 'Board',
        value: 'Solid bleached sulphate (SBS), approx. 250–450 GSM',
      },
      {
        label: 'Surface',
        value: 'Coated, white on both sides',
      },
      {
        label: 'Printing',
        value: 'Offset CMYK, Pantone spot colors',
      },
    ],
    options: {
      materials: ['SBS board', 'Food-grade SBS (on request)'],
      printing: ['CMYK offset', 'Pantone spot colors'],
      finishes: ['Matte lamination', 'Gloss lamination', 'Spot UV', 'Hot foil'],
      formats: ['Tuck end', 'Crash-lock bottom', 'Sleeve'],
    },
    applications: ['Cosmetics & makeup', 'Perfumes & fragrances', 'Premium skincare'],
    faqs: [
      {
        q: 'What does SBS stand for?',
        a: 'Solid Bleached Sulphate — a paperboard made entirely from bleached chemical pulp, so it is white throughout.',
      },
      {
        q: 'How is SBS different from duplex board?',
        a: 'SBS is white through the core and has a smoother, brighter surface, giving a more premium look. Duplex usually has a grey or white back and is more economical.',
      },
      {
        q: 'Is SBS suitable for food packaging?',
        a: 'Food-grade SBS grades are available. Mention that your product is food so we can quote the right board.',
      },
      {
        q: 'Can SBS boxes have foil and embossing together?',
        a: 'Yes. SBS is an excellent base for combining foil stamping, embossing and spot UV.',
      },
    ],
    images: [
      {
        src: '/images/products/sbs-boxes/1.webp',
        alt: 'Bright white SBS box with soft-touch finish and silver foil on a light grey background',
        width: 800,
        height: 600,
      },
    ],
    relatedSlugs: ['mono-carton-boxes'],
    quoteHints: {
      size: 'e.g. 60 × 60 × 150 mm (L × W × H)',
      quantity: 'e.g. 3,000 boxes',
      material: 'e.g. 400 GSM SBS',
    },
    seo: {
      title: 'Custom SBS Boxes Manufacturer | VasuPrint',
      description:
        'Premium solid bleached sulphate (SBS) boxes with pure white core and luxury finishing for cosmetics, perfumes, and premium retail packaging.',
    },
    featured: false,
    sortOrder: 2,
    status: 'published',
  },
];
