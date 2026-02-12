import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* configs options here */
  // reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bo-api.medpro.com.vn',
        port: '5000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.medpro.vn',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'resource.medpro.com.vn',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.medpro.com.vn',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-pkh.longvan.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'prod-partner.s3-hcm-r1.longvan.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
