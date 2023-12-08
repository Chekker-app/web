/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost:3000/*',
      '192.168.1.100',
      'https://app.chekker.com.br/*',
      'app.chekker.com.br/*',
      'http://app.chekker.com.br/*',
      'https://app.chekker.com.br/*',
    ],
  },
};

module.exports = nextConfig;
