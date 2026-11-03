import { z } from 'zod';

export const RESERVED_SLUGS = [
  'about',
  'contact',
  'get-a-quote',
  'admin',
  'api',
  'privacy-policy',
  'terms-and-conditions',
  'shipping-policy',
  'refund-policy',
  'sitemap.xml',
  'robots.txt',
  'images',
  '_next',
] as const;

export const slug = z
  .string()
  .min(3)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens')
  .refine(
    (s) => !RESERVED_SLUGS.includes(s as (typeof RESERVED_SLUGS)[number]),
    'This URL is reserved',
  );

export const image = z.object({
  src: z.string().min(1),
  alt: z.string().min(5).max(160),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const seo = z.object({
  title: z.string().min(10).max(60),
  description: z.string().min(70).max(160),
  ogImage: image.optional(),
});

export const faq = z.object({
  q: z.string().min(5).max(160),
  a: z.string().min(10).max(800),
});

export const feature = z.object({
  title: z.string().min(2).max(60),
  body: z.string().min(10).max(240),
  icon: z.string().max(40).optional(),
});

export const spec = z.object({
  label: z.string().min(2).max(40),
  value: z.string().min(1).max(200),
});

export const publishStatus = z.enum(['draft', 'published']);

export type Image = z.infer<typeof image>;
export type Seo = z.infer<typeof seo>;
export type Faq = z.infer<typeof faq>;
export type Feature = z.infer<typeof feature>;
export type Spec = z.infer<typeof spec>;
export type PublishStatus = z.infer<typeof publishStatus>;
