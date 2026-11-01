import { describe, it, expect } from 'vitest';
import {
  checkPlaceholders,
  scanContentForPlaceholders,
  findBusinessPlaceholders,
} from '../../../scripts/check-placeholders';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

describe('Placeholder Checker (check-placeholders.ts)', () => {
  it('detects placeholders in business.ts', () => {
    const result = checkPlaceholders({ allowPlaceholders: false });
    expect(result.ok).toBe(false);
    expect(result.placeholders.length).toBeGreaterThan(0);
    expect(result.placeholders.some((p) => p.snippet.includes('PLACEHOLDER'))).toBe(true);
  });

  it('allows placeholders when isBuildGate=true and allowPlaceholders=true', () => {
    const result = checkPlaceholders({ allowPlaceholders: true, isBuildGate: true });
    expect(result.ok).toBe(true);
    expect(result.placeholders.length).toBeGreaterThan(0);
  });

  it('passes cleanly when content directory has no placeholders', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'clean-check-'));
    try {
      const cleanFile = path.join(tmpDir, 'clean.ts');
      fs.writeFileSync(
        cleanFile,
        "export const business = { brandName: 'VasuPrint', phone: '+919876543210' };",
      );

      const placeholders = scanContentForPlaceholders(tmpDir);
      expect(placeholders).toEqual([]);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it('returns empty when business object has all placeholders filled', () => {
    const filledBusiness = {
      brandName: 'VasuPrint',
      legalName: 'VasuPrint Pvt Ltd',
      phone: '+919876543210',
      address: {
        city: 'Mumbai',
      },
    };
    const placeholders = findBusinessPlaceholders(filledBusiness);
    expect(placeholders).toEqual([]);
  });

  it('exits with code 1 when executed via CLI on a tree with placeholders', () => {
    let exitCode = 0;
    const tsxBin =
      process.platform === 'win32'
        ? path.resolve(process.cwd(), 'node_modules/.bin/tsx.cmd')
        : path.resolve(process.cwd(), 'node_modules/.bin/tsx');
    const scriptPath = path.resolve(process.cwd(), 'scripts/check-placeholders.ts');

    try {
      execFileSync(tsxBin, [scriptPath], {
        shell: true,
        stdio: 'pipe',
        env: { ...process.env, ALLOW_PLACEHOLDERS: 'false' },
      });
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'status' in err) {
        exitCode = Number(err.status);
      }
    }
    expect(exitCode).toBe(1);
  }, 30000);
});
