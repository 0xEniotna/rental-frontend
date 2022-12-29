/** @type {import('next').NextConfig} */

require("dotenv").config;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_ERC721_ADDRESS: process.env.NEXT_PUBLIC_ERC721_ADDRESS,
    API_KEY: process.env.API_KEY,
    API_KEY: process.env.API_KEY,
    API_KEY: process.env.API_KEY,
    API_KEY: process.env.API_KEY,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-testnet.aspect.co',
        port: '',
        pathname: '/contracts/custom/**/**',
      },
    ],
  },
}

module.exports = nextConfig
