import { test, expect } from '@playwright/test';

test('parable reader shows title, content and moral', async ({ page }) => {
  await page.goto('/explore');

  // Click the first parable card to navigate to reader
  const firstCard = page.locator('a[href^="/parables/"]').first();
  await expect(firstCard).toBeVisible();
  await firstCard.click();

  // Reader must show: back link, h1 title, and moral blockquote
  await expect(page.getByRole('link', { name: /back to explore/i })).toBeVisible();
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('blockquote')).toBeVisible();
});

test('parable reader "Back to explore" navigates back', async ({ page }) => {
  await page.goto('/explore');
  await page.locator('a[href^="/parables/"]').first().click();
  await page.getByRole('link', { name: /back to explore/i }).click();
  await expect(page.getByRole('heading', { name: 'Explore parables' })).toBeVisible();
});
