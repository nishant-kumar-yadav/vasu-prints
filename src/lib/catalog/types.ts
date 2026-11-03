import type { Category, Product } from '@/schemas/catalog';

export interface CatalogRepository {
  listCategories(opts?: { includeDrafts?: boolean }): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  listProducts(opts?: { categorySlug?: string; includeDrafts?: boolean }): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getRelatedProducts(product: Product, limit?: number): Promise<Product[]>;
  getRedirect(fromSlug: string): Promise<string | null>;
}
