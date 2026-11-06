import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    inlineCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer && config.resolve) {
      config.resolve.alias = {
        ...(config.resolve.alias ?? {}),
        '../build/polyfills/polyfill-module': false,
        'next/dist/build/polyfills/polyfill-module': false,
        'next/dist/build/polyfills/polyfill-module.js': false,
      };
    }
    return config;
  },
};

export default nextConfig;
