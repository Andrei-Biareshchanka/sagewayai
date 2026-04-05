import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    env: {
      JWT_SECRET: 'test-access-secret',
      JWT_REFRESH_SECRET: 'test-refresh-secret',
      DATABASE_URL: 'postgresql://postgres:postgres@localhost:5433/sagewayai',
    },
  },
});
