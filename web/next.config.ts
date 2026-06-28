import type { NextConfig } from 'next';
import path from 'path';

// Absolute path to the Prisma 7 generated client (resolved at build time).
// Used in the webpack externals function so Node.js handles the module at
// runtime instead of webpack — Node.js supports the #imports field natively
// while webpack does not.
const PRISMA_GENERATED = path.resolve('./app/generated/prisma');

const config: NextConfig = {
  serverExternalPackages: ['pg'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'sagewayai.com' }],
  },
  outputFileTracingIncludes: {
    '/**': ['./app/generated/prisma/**'],
  },
  webpack(webpackConfig, { isServer }) {
    if (isServer) {
      const prev = (
        Array.isArray(webpackConfig.externals)
          ? webpackConfig.externals
          : webpackConfig.externals
          ? [webpackConfig.externals]
          : []
      ) as unknown[];

      webpackConfig.externals = [
        // Must be first so it intercepts before Next.js's own externals try
        // to resolve the package (which fails on Prisma 7's #imports exports).
        (
          ctx: { request?: string },
          callback: (err?: Error | null, result?: string) => void,
        ) => {
          if (ctx.request === '@prisma/generated-client') {
            callback(null, `commonjs ${PRISMA_GENERATED}`);
            return;
          }
          callback();
        },
        ...prev,
      ];
    }
    return webpackConfig;
  },
};

export default config;
