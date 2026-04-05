import { defineConfig } from '@playwright/test';

const isCI = Boolean(process.env['CI']);

export default defineConfig({
  testDir: './e2e',
  reporter: isCI ? [['html', { open: 'never' }], ['github']] : [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    actionTimeout: 15000,
    screenshot: isCI ? 'only-on-failure' : 'off',
    trace: isCI ? 'on-first-retry' : 'off',
  },
  expect: {
    timeout: 15000,
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !isCI,
    timeout: 30000,
  },
});
