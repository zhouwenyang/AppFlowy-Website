const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const environment = process.env.ENVIRONMENT || 'development';
require('./env');
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
];
const rewrites = () => {
  return [
    {
      source: '/crm/v3/:path*',
      destination: 'https://api.hubapi.com/crm/v3/:path*',
    },
    {
      source: '/downloading',
      destination: '/downloaded',
    },
    {
      source: '/whatsnew',
      destination: '/what-is-new',
    },
    {
      source: '/blocks',
      destination: '/appflowy-blocks',
    },
    {
      source: '/careers',
      destination: '/join',
    },
    {
      source: '/blog',
      destination: '/subscribe-newsletter',
    },
  ];
};
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  // Use the CDN in production and localhost for development.
  assetPrefix: isProd ? `https://d3uafhn8yrvdfn.cloudfront.net/website/${environment}` : undefined,
  rewrites,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
