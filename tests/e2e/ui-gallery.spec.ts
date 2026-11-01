import { test, expect } from '@playwright/test';

test.describe('UI Primitives Gallery (/_dev/ui)', () => {
  test('renders all primitive sections and controls', async ({ page }) => {
    await page.goto('/_dev/ui');
    await expect(page.locator('h1')).toHaveText('UI Primitives Gallery');
    await expect(page.getByRole('heading', { name: 'Buttons' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Form Controls' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Badges & Status Chips' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Dialog & Sheet' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Accordion (FAQ)' })).toBeVisible();
  });

  test('verifies keyboard and interactive states for dialog and accordion', async ({ page }) => {
    await page.goto('/_dev/ui');

    // Accordion test
    const accordionTrigger = page.getByRole('button', {
      name: /What is the minimum order quantity/i,
    });
    await expect(accordionTrigger).toBeVisible();
    await accordionTrigger.click();
    await expect(page.getByText(/MOQs vary by product category/i)).toBeVisible();

    // Dialog test
    const dialogTrigger = page.getByRole('button', {
      name: /Open Sample Dialog/i,
    });
    await dialogTrigger.click();
    await expect(page.getByRole('heading', { name: 'Request Production Sample' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(
      page.getByRole('heading', { name: 'Request Production Sample' }),
    ).not.toBeVisible();

    // Sheet test
    const sheetTrigger = page.getByRole('button', {
      name: /Open Navigation Sheet/i,
    });
    await sheetTrigger.click();
    await expect(page.getByRole('heading', { name: 'Navigation Menu' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('heading', { name: 'Navigation Menu' })).not.toBeVisible();
  });

  test('captures screenshots at 360px and 1280px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/_dev/ui');
    await page.screenshot({
      path: 'screenshots/T-011-ui-360.png',
      fullPage: true,
    });

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/_dev/ui');
    await page.screenshot({
      path: 'screenshots/T-011-ui-1280.png',
      fullPage: true,
    });
  });
});
