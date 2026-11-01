import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Smoke tests', () => {
  test('homepage renders and has no critical axe violations', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/VasuPrint/);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
