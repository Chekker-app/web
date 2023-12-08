/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.freeimages.com',
      'localhost',
      '192.168.1.100',
      'app.chekker.com.br',
      'http://app.chekker.com.br',
      'https://app.chekker.com.br',
    ],
  },
};

module.exports = nextConfig;
