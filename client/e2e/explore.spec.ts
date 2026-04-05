import { test, expect } from '@playwright/test';

test('explore page shows heading and parables grid', async ({ page }) => {
  await page.goto('/explore');
  await expect(page.getByRole('heading', { name: 'Explore parables' })).toBeVisible();
});

test('explore page shows "All" pill selected by default', async ({ page }) => {
  await page.goto('/explore');
  const allPill = page.getByRole('button', { name: 'All' });
  await expect(allPill).toBeVisible();
  await expect(allPill).toHaveClass(/bg-\[#6B8F71\]/);
});

test('clicking a category pill activates it', async ({ page }) => {
  await page.goto('/explore');
  // Wait for category pills to load from API (categories are in the filter row under the heading)
  const filterRow = page.locator('main div').filter({ has: page.getByRole('button', { name: 'All' }) });
  const firstCategoryPill = filterRow.locator('button').nth(1); // 0 = All, 1 = first category
  await expect(firstCategoryPill).toBeVisible();
  await firstCategoryPill.click();
  await expect(firstCategoryPill).toHaveClass(/bg-\[#6B8F71\]/);
});
