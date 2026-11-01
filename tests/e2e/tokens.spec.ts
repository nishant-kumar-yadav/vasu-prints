import { test, expect } from '@playwright/test';

test.describe('Tokens Gallery (/_dev/tokens)', () => {
  test('displays tokens palette, contrast pairs, and type scale', async ({ page }) => {
    await page.goto('/_dev/tokens');
    await expect(page.locator('h1')).toHaveText('VasuPrint Tokens & Styles');
    await expect(page.getByText('Brand Navy Palette')).toBeVisible();
    await expect(page.getByText('Brand Teal Palette')).toBeVisible();
    await expect(page.getByText('Contrast Pairs (DESIGN-SYSTEM §2.2)')).toBeVisible();
    await expect(page.getByText('Type Scale (DESIGN-SYSTEM §3.1)')).toBeVisible();
  });

  test('capture screenshots of tokens gallery at 360px and 1280px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/_dev/tokens');
    await page.screenshot({ path: 'screenshots/T-010-tokens-360.png', fullPage: true });

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.screenshot({ path: 'screenshots/T-010-tokens-1280.png', fullPage: true });
  });
});
