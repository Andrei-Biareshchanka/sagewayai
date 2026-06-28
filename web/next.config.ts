import type { NextConfig } from 'next';

const config: NextConfig = {
  serverExternalPackages: ['@prisma/client', 'pg'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sagewayai.com',
      },
    ],
  },
};

export default config;
