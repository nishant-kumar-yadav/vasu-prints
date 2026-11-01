export const siteConfig = {
  name: 'VasuPrint',
  shortName: 'VasuPrint',
  description:
    'Custom packaging boxes, custom stickers, DTF transfers, UV DTF transfers and tags for Indian businesses.',
  url: process.env.SITE_URL || 'https://vasuprint.com',
  links: {
    whatsapp: 'https://wa.me/',
  },
  mainNav: [
    { title: 'Products', href: '/#products' },
    { title: 'About Us', href: '/about' },
    { title: 'Contact Us', href: '/contact' },
  ],
} as const;
