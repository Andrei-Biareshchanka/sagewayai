import type { NextConfig } from 'next';
import path from 'path';

const config: NextConfig = {
  serverExternalPackages: ['pg'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'sagewayai.com' }],
  },
  webpack(webpackConfig) {
    // Prisma 7 with provider="prisma-client" emits only .ts source on Linux
    // (no pre-compiled .js), so we can't externalize the package — Node.js
    // can't load .ts files at runtime. Instead, bundle it directly: the alias
    // without an extension lets webpack resolve index.ts or index.js.
    webpackConfig.resolve.alias['@prisma/generated-client'] =
      path.resolve('./app/generated/prisma/index');
    return webpackConfig;
  },
};

export default config;
