import type { Category } from '@/schemas/catalog';

export const fixtureCategories: Category[] = [
  {
    slug: 'packaging-boxes',
    name: 'Packaging Boxes',
    heading: 'Custom Packaging Boxes for Every Business Need',
    tagline:
      'Custom packaging boxes designed to protect your products and enhance your brand presentation.',
    intro: [
      'Make your products look professional with customized packaging boxes. Choose from different materials, sizes and printing options according to your requirements.',
      "We print folding cartons on mono carton, SBS and duplex board — from economical everyday packaging to premium retail boxes with foil, spot UV and embossing. Share your product dimensions and quantity, and we'll recommend the right board and box style.",
    ],
    highlights: [
      {
        icon: 'Ruler',
        title: 'Made to your dimensions',
        body: 'Boxes sized to your product, with styles such as tuck-end, crash-lock bottom and sleeves.',
      },
      {
        icon: 'Palette',
        title: 'Print that sells',
        body: 'Full-color offset printing with Pantone matching for brand-consistent packaging.',
      },
      {
        icon: 'Sparkles',
        title: 'Premium finishes',
        body: 'Lamination, spot UV, foil stamping and embossing to lift your shelf presence.',
      },
      {
        icon: 'Boxes',
        title: 'Bulk-ready',
        body: 'Built for repeat production runs for brands, manufacturers and distributors.',
      },
    ],
    faqs: [
      {
        q: 'What is the minimum order quantity for custom packaging boxes?',
        a: 'Our standard MOQ starts from 500 units for mono cartons and rigid luxury boxes, and 250 units for corrugated shipping cartons.',
      },
      {
        q: 'Can you provide a physical box sample before production?',
        a: 'Yes, we provide blank unprinted structural dieline proofs to test sizing, as well as digitally printed proof sheets.',
      },
    ],
    image: {
      src: '/images/categories/packaging-boxes.webp',
      alt: 'Assorted custom printed folding cartons and retail packaging boxes',
      width: 800,
      height: 600,
    },
    seo: {
      title: 'Custom Packaging Boxes Manufacturer | VasuPrint',
      description:
        'Custom packaging boxes manufacturer in India. Mono cartons, SBS boxes and duplex packaging with offset printing, foil and embossing.',
    },
    sortOrder: 1,
    status: 'published',
  },
];
