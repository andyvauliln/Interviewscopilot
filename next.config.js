/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts'
);

const nextConfig = withNextIntl({
  reactStrictMode: true,
  images: {
    domains: ['uploadthing.com', 'lh3.googleusercontent.com', "uploadthing-prod.s3.us-west-2.amazonaws.com"],
  },
  // rewrites() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/en'
  //     }
  //   ];
  // },
  experimental: {
    appDir: true,
    serverActions: true
  }
});

module.exports = nextConfig;
