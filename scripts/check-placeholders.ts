import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { business, PLACEHOLDER } from '../src/config/business';

export interface PlaceholderResult {
  file: string;
  field?: string;
  snippet: string;
}

export function findBusinessPlaceholders(
  obj: Record<string, unknown>,
  prefix = 'business',
): PlaceholderResult[] {
  const results: PlaceholderResult[] = [];
  for (const [key, val] of Object.entries(obj)) {
    const fieldPath = `${prefix}.${key}`;
    if (val === PLACEHOLDER) {
      results.push({
        file: 'src/config/business.ts',
        field: fieldPath,
        snippet: `${key}: PLACEHOLDER`,
      });
    } else if (Array.isArray(val)) {
      val.forEach((item, idx) => {
        if (item === PLACEHOLDER) {
          results.push({
            file: 'src/config/business.ts',
            field: `${fieldPath}[${idx}]`,
            snippet: `${key}[${idx}]: PLACEHOLDER`,
          });
        }
      });
    } else if (val && typeof val === 'object') {
      results.push(...findBusinessPlaceholders(val as Record<string, unknown>, fieldPath));
    }
  }
  return results;
}

export function scanContentForPlaceholders(contentDir: string): PlaceholderResult[] {
  const results: PlaceholderResult[] = [];
  if (!fs.existsSync(contentDir)) return results;

  function scan(target: string) {
    const stat = fs.statSync(target);
    if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(target)) {
        scan(path.join(target, entry));
      }
    } else if (target.endsWith('.ts') || target.endsWith('.tsx') || target.endsWith('.md')) {
      const content = fs.readFileSync(target, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.includes('__PLACEHOLDER__')) {
          results.push({
            file: target,
            field: `line ${index + 1}`,
            snippet: line.trim(),
          });
        }
      });
    }
  }

  scan(contentDir);
  return results;
}

export function checkPlaceholders(options?: {
  rootDir?: string;
  allowPlaceholders?: boolean;
  isBuildGate?: boolean;
}): { ok: boolean; placeholders: PlaceholderResult[] } {
  const root = options?.rootDir || process.cwd();
  const contentDir = path.join(root, 'src/content');

  const placeholders: PlaceholderResult[] = [
    ...findBusinessPlaceholders(business as unknown as Record<string, unknown>),
    ...scanContentForPlaceholders(contentDir),
  ];

  const allow = options?.allowPlaceholders ?? process.env.ALLOW_PLACEHOLDERS === 'true';
  const isBuild = options?.isBuildGate ?? false;

  if (placeholders.length > 0) {
    if (isBuild && allow) {
      console.warn(
        `⚠️  Found ${placeholders.length} placeholder(s), but ALLOW_PLACEHOLDERS=true is set. Allowing build.`,
      );
      return { ok: true, placeholders };
    }
    return { ok: false, placeholders };
  }

  return { ok: true, placeholders: [] };
}

// Check if running as direct CLI script
const currentFile = fileURLToPath(import.meta.url).toLowerCase();
const scriptArg = process.argv[1] ? path.resolve(process.argv[1]).toLowerCase() : '';
const isDirectRun =
  scriptArg === currentFile ||
  (process.argv[1] && process.argv[1].endsWith('check-placeholders.ts'));

if (isDirectRun) {
  const isBuildGate = process.argv.includes('--build-gate');
  const isProd = process.env.NODE_ENV === 'production';

  // If in build gate mode, only enforce when NODE_ENV=production
  if (isBuildGate && !isProd) {
    process.exit(0);
  }

  const result = checkPlaceholders({ isBuildGate });

  if (!result.ok) {
    console.error(
      `\n❌ Placeholder check failed: ${result.placeholders.length} unfilled business detail(s) found:`,
    );
    result.placeholders.forEach((p) => {
      console.error(`  - ${p.file} (${p.field}): ${p.snippet}`);
    });
    console.error(
      '\nFill actual details in src/config/business.ts or set ALLOW_PLACEHOLDERS=true for showcase deployments.\n',
    );
    process.exit(1);
  } else {
    console.log('✅ No placeholders found. Configuration is clean.');
    process.exit(0);
  }
}
