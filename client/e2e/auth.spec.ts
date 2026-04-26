import { test, expect } from '@playwright/test';

test('login page renders form with email and password fields', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
});

test('login page shows link to register', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
});

test('register page renders form correctly', async ({ page }) => {
  await page.goto('/register');
  await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Create account' })).toBeVisible();
});

test('invalid login shows error message', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('nobody@example.com');
  await page.getByLabel('Password').fill('wrongpassword');
  await page.getByRole('button', { name: 'Sign in' }).click();
  // Axios surfaces the HTTP status text; server error body is not extracted by default
  await expect(page.getByText(/request failed with status code 401/i)).toBeVisible();
});

test('/collection redirects to /login when not authenticated', async ({ page }) => {
  await page.goto('/collection');
  await expect(page).toHaveURL('/login');
});

test('register, then see user email in navbar, then logout', async ({ page }) => {
  const email = `test_${Date.now()}@example.com`;

  await page.goto('/register');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel(/password/i).fill('password123');
  await page.getByRole('button', { name: 'Create account' }).click();

  // After registration, redirected to home and email visible in navbar
  await expect(page).toHaveURL('/');
  await expect(page.getByText(email)).toBeVisible();

  // Logout
  await page.getByRole('button', { name: 'Log out' }).click();

  // After logout, "Log in" link appears
  await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
});

test('after login, /collection is accessible', async ({ page }) => {
  const email = `col_${Date.now()}@example.com`;

  // Register a new user
  await page.goto('/register');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel(/password/i).fill('password123');
  await page.getByRole('button', { name: 'Create account' }).click();
  await expect(page).toHaveURL('/');

  // Use client-side navigation to preserve in-memory auth state.
  // page.goto() does a full reload which resets Zustand before the
  // session refresh completes, causing ProtectedRoute to redirect.
  await page.getByRole('banner').getByRole('link', { name: 'My collection' }).click();
  await expect(page.getByRole('heading', { name: 'My collection' })).toBeVisible();
});
