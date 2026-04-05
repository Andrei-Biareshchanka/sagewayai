import { test, expect } from '@playwright/test';

test('home page shows the hero heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('home page shows "Parable of the day" badge', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Parable of the day')).toBeVisible();
});

test('home page shows "More parables" section', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'More parables' })).toBeVisible();
});

test('home page shows category pills', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'All' })).toBeVisible();
});
