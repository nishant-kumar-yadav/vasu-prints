import type { CatalogRepository } from './types';
import { staticCatalog } from './static';

export * from './types';
export * from './static';
export * from './fixtures';

export function getCatalogRepository(): CatalogRepository {
  const source = process.env.CATALOG_SOURCE || 'static';
  if (source === 'mongo') {
    // MongoCatalog will be implemented in P3 (T-050 / T-060)
    return staticCatalog;
  }
  return staticCatalog;
}

export const catalog: CatalogRepository = getCatalogRepository();
