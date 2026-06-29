import type { NextConfig } from 'next';
import path from 'path';

const config: NextConfig = {
  serverExternalPackages: ['pg'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'sagewayai.com' }],
  },
  webpack(webpackConfig) {
    // Prisma 7 "prisma-client" provider on Linux emits .ts source files only
    // (no pre-compiled index.js). @prisma/client is intentionally empty in
    // Prisma 7 — runtime ships inside the generated output directory.
    //
    // Fix: bundle both entry points directly from the generated directory.
    // client.ts exists on all platforms; runtime/client.js is pre-compiled
    // CJS and also exists on all platforms.
    const generated = path.resolve('./app/generated/prisma');
    webpackConfig.resolve.alias['@prisma/generated-client'] =
      path.join(generated, 'client');
    webpackConfig.resolve.alias['@prisma/client/runtime/client'] =
      path.join(generated, 'runtime', 'client');
    return webpackConfig;
  },
};

export default config;
