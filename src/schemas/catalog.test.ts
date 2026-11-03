import { describe, it, expect } from 'vitest';
import { slug, RESERVED_SLUGS } from './common';
import { categorySchema, productSchema, validateCatalogIntegrity, type Product } from './catalog';
import { fixtureCategories, fixtureProducts, StaticCatalog } from '@/lib/catalog';

describe('Catalog Schemas & Integrity', () => {
  describe('slug schema', () => {
    it('accepts valid kebab-case lowercase slugs', () => {
      expect(slug.safeParse('packaging-boxes').success).toBe(true);
      expect(slug.safeParse('mono-carton-boxes').success).toBe(true);
      expect(slug.safeParse('sbs-400-gsm').success).toBe(true);
    });

    it('rejects all reserved slugs', () => {
      for (const reserved of RESERVED_SLUGS) {
        const result = slug.safeParse(reserved);
        expect(result.success).toBe(false);
      }

      // Explicitly test custom refine error message on a regex-valid reserved slug
      const aboutResult = slug.safeParse('about');
      expect(aboutResult.success).toBe(false);
      if (!aboutResult.success) {
        expect(aboutResult.error.issues[0]?.message).toBe('This URL is reserved');
      }
    });

    it('rejects invalid slug formats', () => {
      expect(slug.safeParse('Mono-Carton').success).toBe(false);
      expect(slug.safeParse('mono carton').success).toBe(false);
      expect(slug.safeParse('mono_carton').success).toBe(false);
      expect(slug.safeParse('mono--carton').success).toBe(false);
      expect(slug.safeParse('ab').success).toBe(false);
    });
  });

  describe('categorySchema and productSchema', () => {
    it('successfully parses official fixtures', () => {
      for (const cat of fixtureCategories) {
        expect(categorySchema.safeParse(cat).success).toBe(true);
      }
      for (const prod of fixtureProducts) {
        expect(productSchema.safeParse(prod).success).toBe(true);
      }
    });

    it('enforces product constraints', () => {
      const first = fixtureProducts[0];
      if (!first) throw new Error('Missing fixture product');

      const invalidProduct = {
        ...first,
        features: [], // requires min 3
      };
      const result = productSchema.safeParse(invalidProduct);
      expect(result.success).toBe(false);
    });
  });

  describe('validateCatalogIntegrity', () => {
    it('passes for valid fixtures', () => {
      const errors = validateCatalogIntegrity(fixtureCategories, fixtureProducts);
      expect(errors).toHaveLength(0);
    });

    it('detects duplicate slug across category and product', () => {
      const first = fixtureProducts[0];
      if (!first) throw new Error('Missing fixture product');

      const collidingProduct: Product = {
        ...first,
        slug: 'packaging-boxes',
      };
      const errors = validateCatalogIntegrity(fixtureCategories, [collidingProduct]);
      expect(errors.some((e) => e.type === 'SLUG_COLLISION')).toBe(true);
    });

    it('detects missing categorySlug reference', () => {
      const first = fixtureProducts[0];
      if (!first) throw new Error('Missing fixture product');

      const orphanProduct: Product = {
        ...first,
        slug: 'custom-carton',
        categorySlug: 'non-existent-category',
      };
      const errors = validateCatalogIntegrity(fixtureCategories, [orphanProduct]);
      expect(errors.some((e) => e.type === 'MISSING_CATEGORY')).toBe(true);
    });

    it('detects self-referencing relatedSlugs', () => {
      const first = fixtureProducts[0];
      if (!first) throw new Error('Missing fixture product');

      const selfRelatedProduct: Product = {
        ...first,
        slug: 'mono-carton-boxes',
        relatedSlugs: ['mono-carton-boxes'],
      };
      const errors = validateCatalogIntegrity(fixtureCategories, [selfRelatedProduct]);
      expect(errors.some((e) => e.type === 'SELF_RELATED_SLUG')).toBe(true);
    });

    it('detects invalid related product slugs', () => {
      const first = fixtureProducts[0];
      if (!first) throw new Error('Missing fixture product');

      const invalidRelatedProduct: Product = {
        ...first,
        slug: 'mono-carton-boxes',
        relatedSlugs: ['ghost-product'],
      };
      const errors = validateCatalogIntegrity(fixtureCategories, [invalidRelatedProduct]);
      expect(errors.some((e) => e.type === 'INVALID_RELATED_SLUG')).toBe(true);
    });
  });

  describe('StaticCatalog Repository', () => {
    const catalog = new StaticCatalog();

    it('lists categories ordered by sortOrder', async () => {
      const categories = await catalog.listCategories();
      expect(categories.length).toBeGreaterThan(0);
      expect(categories[0]?.slug).toBe('packaging-boxes');
    });

    it('finds category by slug', async () => {
      const cat = await catalog.getCategoryBySlug('packaging-boxes');
      expect(cat).not.toBeNull();
      expect(cat?.name).toBe('Packaging Boxes');

      const missing = await catalog.getCategoryBySlug('unknown-category');
      expect(missing).toBeNull();
    });

    it('lists products and filters by category', async () => {
      const all = await catalog.listProducts();
      expect(all.length).toBe(2);

      const filtered = await catalog.listProducts({
        categorySlug: 'packaging-boxes',
      });
      expect(filtered.length).toBe(2);

      const empty = await catalog.listProducts({ categorySlug: 'stickers' });
      expect(empty.length).toBe(0);
    });

    it('finds product by slug', async () => {
      const prod = await catalog.getProductBySlug('mono-carton-boxes');
      expect(prod).not.toBeNull();
      expect(prod?.name).toBe('Mono Carton Boxes');
    });

    it('resolves related products without self', async () => {
      const prod = await catalog.getProductBySlug('mono-carton-boxes');
      if (!prod) throw new Error('Product not found');

      const related = await catalog.getRelatedProducts(prod);
      expect(related.length).toBeGreaterThan(0);
      expect(related.some((r) => r.slug === prod.slug)).toBe(false);
      expect(related[0]?.slug).toBe('sbs-boxes');
    });
  });
});
