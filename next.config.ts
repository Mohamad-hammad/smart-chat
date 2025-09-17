import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // AWS Amplify specific configuration
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // External packages for server components
  serverExternalPackages: ['typeorm', 'pg'],
  
  // Transpile packages that need to be processed
  transpilePackages: ['recharts'],
  
  // Environment variables validation
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Image optimization for Amplify
  images: {
    domains: ['localhost'],
    unoptimized: true, // Disable image optimization for Amplify compatibility
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
