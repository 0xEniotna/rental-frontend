/** @type {import('next').NextConfig} */
const webpack = require('webpack');
require("dotenv").config;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_ERC721_ADDRESS: process.env.NEXT_PUBLIC_ERC721_ADDRESS,
    NEXT_INFURA_GOERLI2: process.env.NEXT_INFURA_GOERLI2,
    NEXT_PUBLIC_ETH_ERC20_ADDRESS: process.env.NEXT_PUBLIC_ETH_ERC20_ADDRESS,
    API_KEY: process.env.API_KEY,
    API_KEY: process.env.API_KEY,
  },

  images: {
    domains: ['cdn-testnet.aspect.co', 'ipfs.io', 'imagedelivery.net'],
    // formats: ['image/avif', 'image/webp'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'cdn-testnet.aspect.co',
    //     port: '',
    //     pathname: '/contracts/custom/**/**',
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'cdn-testnet.aspect.co',
    //     port: '',
    //     pathname: '/images/**',
    //   },
  },
}

module.exports = nextConfig
