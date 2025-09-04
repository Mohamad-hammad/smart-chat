import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production optimizations
  output: 'standalone', // For Docker deployment
  experimental: {
    // Enable server components
    serverComponentsExternalPackages: ['typeorm', 'pg'],
  },
  
  // Environment variables validation
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Image optimization
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Redirects for production
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/manager-dashboard',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
