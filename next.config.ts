import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* configs options here */
  // reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
};

export default nextConfig;
