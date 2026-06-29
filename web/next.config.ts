import type { NextConfig } from 'next';

const config: NextConfig = {
  serverExternalPackages: ['pg'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'sagewayai.com' }],
  },
  // Include all Prisma-generated files in every serverless function bundle.
  // This ensures WASM and runtime files survive static file tracing on Vercel.
  outputFileTracingIncludes: {
    '/**': ['./node_modules/@prisma/generated-client/**'],
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
        // Intercept @prisma/generated-client before webpack resolution.
        // Webpack emits require('@prisma/generated-client') — a package name,
        // not an absolute path — so Node.js resolves it from node_modules at
        // runtime inside the serverless function (populated by publish-prisma.js).
        (
          ctx: { request?: string },
          callback: (err?: Error | null, result?: string) => void,
        ) => {
          if (ctx.request === '@prisma/generated-client') {
            callback(null, 'commonjs @prisma/generated-client');
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
