import type { Category, Product } from '@/schemas/catalog';
import type { CatalogRepository } from './types';
import { fixtureCategories, fixtureProducts } from './fixtures';

export class StaticCatalog implements CatalogRepository {
  private categories: Category[];
  private products: Product[];

  constructor(categories: Category[] = fixtureCategories, products: Product[] = fixtureProducts) {
    this.categories = categories;
    this.products = products;
  }

  async listCategories(opts: { includeDrafts?: boolean } = {}): Promise<Category[]> {
    const { includeDrafts = false } = opts;
    return this.categories
      .filter((cat) => includeDrafts || cat.status === 'published')
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const category = this.categories.find((cat) => cat.slug === slug);
    return category || null;
  }

  async listProducts(
    opts: { categorySlug?: string; includeDrafts?: boolean } = {},
  ): Promise<Product[]> {
    const { categorySlug, includeDrafts = false } = opts;
    return this.products
      .filter((prod) => {
        if (!includeDrafts && prod.status !== 'published') return false;
        if (categorySlug && prod.categorySlug !== categorySlug) return false;
        return true;
      })
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const product = this.products.find((prod) => prod.slug === slug);
    return product || null;
  }

  async getRelatedProducts(product: Product, limit: number = 4): Promise<Product[]> {
    const related: Product[] = [];
    const relatedSet = new Set(product.relatedSlugs);

    for (const relSlug of product.relatedSlugs) {
      const match = this.products.find(
        (p) => p.slug === relSlug && p.status === 'published' && p.slug !== product.slug,
      );
      if (match) related.push(match);
      if (related.length >= limit) return related;
    }

    // Fill remaining with same-category published products if available
    for (const p of this.products) {
      if (related.length >= limit) break;
      if (
        p.categorySlug === product.categorySlug &&
        p.slug !== product.slug &&
        p.status === 'published' &&
        !relatedSet.has(p.slug)
      ) {
        related.push(p);
      }
    }

    return related;
  }

  async getRedirect(_fromSlug: string): Promise<string | null> {
    // In StaticCatalog, redirects are empty or could map from a static lookup table
    return null;
  }
}

export const staticCatalog = new StaticCatalog();
