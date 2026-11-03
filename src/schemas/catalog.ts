import { z } from 'zod';
import { slug, image, seo, faq, feature, spec, publishStatus } from './common';

export const categorySchema = z.object({
  slug,
  name: z.string().min(2).max(40),
  heading: z.string().min(10).max(90),
  tagline: z.string().min(10).max(140),
  intro: z.array(z.string().min(20).max(600)).min(1).max(4),
  highlights: z.array(feature).max(6).default([]),
  faqs: z.array(faq).max(8).default([]),
  image,
  seo,
  sortOrder: z.number().int().min(0).default(0),
  status: publishStatus.default('published'),
});

export const productSchema = z.object({
  slug,
  name: z.string().min(2).max(60),
  categorySlug: slug,
  heading: z.string().min(10).max(90),
  summary: z.string().min(40).max(220),
  intro: z.array(z.string().min(20).max(800)).min(1).max(4),
  features: z.array(feature).min(3).max(6),
  specs: z.array(spec).min(3).max(12),
  options: z.object({
    materials: z.array(z.string().max(80)).max(12).default([]),
    printing: z.array(z.string().max(80)).max(10).default([]),
    finishes: z.array(z.string().max(80)).max(14).default([]),
    formats: z.array(z.string().max(80)).max(10).default([]),
  }),
  applications: z.array(z.string().max(80)).min(3).max(12),
  faqs: z.array(faq).min(3).max(8),
  images: z.array(image).min(1).max(6),
  relatedSlugs: z.array(slug).max(4).default([]),
  quoteHints: z
    .object({
      size: z.string().max(80).optional(),
      quantity: z.string().max(80).optional(),
      material: z.string().max(80).optional(),
    })
    .default({}),
  seo,
  featured: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
  status: publishStatus.default('draft'),
});

export type Category = z.infer<typeof categorySchema>;
export type Product = z.infer<typeof productSchema>;

export interface CatalogIntegrityError {
  type:
    | 'DUPLICATE_CATEGORY_SLUG'
    | 'DUPLICATE_PRODUCT_SLUG'
    | 'SLUG_COLLISION'
    | 'MISSING_CATEGORY'
    | 'SELF_RELATED_SLUG'
    | 'INVALID_RELATED_SLUG';
  message: string;
}

export function validateCatalogIntegrity(
  categories: Category[],
  products: Product[],
): CatalogIntegrityError[] {
  const errors: CatalogIntegrityError[] = [];

  const categorySlugs = new Set<string>();
  for (const cat of categories) {
    if (categorySlugs.has(cat.slug)) {
      errors.push({
        type: 'DUPLICATE_CATEGORY_SLUG',
        message: `Duplicate category slug found: "${cat.slug}"`,
      });
    }
    categorySlugs.add(cat.slug);
  }

  const productSlugs = new Set<string>();
  for (const prod of products) {
    if (productSlugs.has(prod.slug)) {
      errors.push({
        type: 'DUPLICATE_PRODUCT_SLUG',
        message: `Duplicate product slug found: "${prod.slug}"`,
      });
    }
    productSlugs.add(prod.slug);

    if (categorySlugs.has(prod.slug)) {
      errors.push({
        type: 'SLUG_COLLISION',
        message: `Slug "${prod.slug}" exists as both a category and a product`,
      });
    }

    if (!categorySlugs.has(prod.categorySlug)) {
      errors.push({
        type: 'MISSING_CATEGORY',
        message: `Product "${prod.slug}" references non-existent category "${prod.categorySlug}"`,
      });
    }

    if (prod.relatedSlugs.includes(prod.slug)) {
      errors.push({
        type: 'SELF_RELATED_SLUG',
        message: `Product "${prod.slug}" cannot reference itself in relatedSlugs`,
      });
    }
  }

  for (const prod of products) {
    for (const rel of prod.relatedSlugs) {
      if (!productSlugs.has(rel)) {
        errors.push({
          type: 'INVALID_RELATED_SLUG',
          message: `Product "${prod.slug}" references unknown related product slug "${rel}"`,
        });
      }
    }
  }

  return errors;
}
