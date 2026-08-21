import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'firebase', 'react-hook-form', 'react-icons'],
  },
  async redirects() {
    return [
      // Category URL Migration Redirects
      { source: '/products/category/industrial-chemicals', destination: '/products/category/industrial-product', permanent: true },
      { source: '/products/category/pooja-products', destination: '/products/category/camphor', permanent: true },
      { source: '/products/industrial-product', destination: '/products/category/industrial-product', permanent: true },
      { source: '/products/camphor', destination: '/products/category/camphor', permanent: true },
      { source: '/products/lamp-oil', destination: '/products/category/lamp-oil', permanent: true },
      { source: '/products/agarbathi', destination: '/products/category/agarbathi', permanent: true },
      { source: '/products/sambrani', destination: '/products/category/sambrani', permanent: true },
      { source: '/products/rose-water', destination: '/products/category/rose-water', permanent: true },

      // Legacy Product Variants -> Consolidated Pages
      { source: '/products/jasmine-agarbathi-rs-5', destination: '/products/kalasam-premium-agarbathi', permanent: true },
      { source: '/products/sandalwood-agarbathi-rs-5', destination: '/products/kalasam-premium-agarbathi', permanent: true },
      { source: '/products/black-rose-agarbathi-rs-5', destination: '/products/kalasam-premium-agarbathi', permanent: true },
      { source: '/products/kalasam-rs-5-40-pcs', destination: '/products/kalasam-camphor-rs5', permanent: true },
      { source: '/products/cup-sambrani-jar-new', destination: '/products/kalasam-cup-sambrani', permanent: true },
      { source: '/products/computer-sambrani-new', destination: '/products/kalasam-computer-sambrani', permanent: true },
      { source: '/products/1000-ml-deepam-oil', destination: '/products/temple-dharisana-lamp-oil', permanent: true },
      // Duplicate Blog Post redirects — "Tamil Nadu Chemical Industrial Parks" template family (5 variants → 1 canonical)
      { source: '/blog/tamil-nadu-chemical-industrial-parks-infrastructure-supporting-d-camphor', destination: '/blog/india-camphor-export-market-guide', permanent: true },
      { source: '/blog/tamil-nadu-chemical-industrial-parks-infrastructure-supporting-camphor-tablets', destination: '/blog/india-camphor-export-market-guide', permanent: true },
      { source: '/blog/tamil-nadu-chemical-industrial-parks-infrastructure-supporting-isoborneol-flakes', destination: '/blog/india-camphor-export-market-guide', permanent: true },
      { source: '/blog/tamil-nadu-chemical-industrial-parks-infrastructure-supporting-sambrani-cups', destination: '/blog/india-camphor-export-market-guide', permanent: true },
      { source: '/blog/tamil-nadu-chemical-industrial-parks-infrastructure-supporting-rose-water', destination: '/blog/india-camphor-export-market-guide', permanent: true },
      // Duplicate Blog Post redirects — "Catalytic Isomerization Innovations" template family (6 variants → 1 canonical)
      { source: '/blog/catalytic-isomerization-innovations-for-synthesizing-sambrani-cups', destination: '/blog/what-is-isoborneol-properties-uses', permanent: true },
      { source: '/blog/catalytic-isomerization-innovations-for-synthesizing-isoborneol-flakes', destination: '/blog/what-is-isoborneol-properties-uses', permanent: true },
      { source: '/blog/catalytic-isomerization-innovations-for-synthesizing-camphor-tablets', destination: '/blog/what-is-isoborneol-properties-uses', permanent: true },
      { source: '/blog/catalytic-isomerization-innovations-for-synthesizing-rose-water', destination: '/blog/what-is-isoborneol-properties-uses', permanent: true },
      { source: '/blog/catalytic-isomerization-innovations-for-synthesizing-rose-water-volume-9', destination: '/blog/what-is-isoborneol-properties-uses', permanent: true },
      { source: '/blog/catalytic-isomerization-innovations-for-synthesizing-d-camphor', destination: '/blog/what-is-isoborneol-properties-uses', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com https://vercel.live https://unpkg.com https://translate.google.com https://translate.googleapis.com https://accounts.google.com https://apis.google.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com https://translate.googleapis.com https://accounts.google.com",
              "img-src 'self' data: blob: https://res.cloudinary.com https://lh3.googleusercontent.com https://firebasestorage.googleapis.com https://www.google-analytics.com https://www.googletagmanager.com https://*.basemaps.cartocdn.com https://unpkg.com https://translate.google.com https://www.gstatic.com https://*.gstatic.com https://accounts.google.com",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://api.cloudinary.com https://firestore.googleapis.com https://firebase.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://www.google-analytics.com https://www.googletagmanager.com https://region1.google-analytics.com https://va.vercel-scripts.com https://vitals.vercel-insights.com https://api.resend.com https://translate.googleapis.com https://accounts.google.com https://apis.google.com https://*.firebaseapp.com",
              "frame-src 'self' https://www.google.com https://maps.google.com https://vercel.live https://translate.google.com https://accounts.google.com https://*.firebaseapp.com https://apis.google.com",
              "media-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://accounts.google.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
