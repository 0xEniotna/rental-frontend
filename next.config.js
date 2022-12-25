/** @type {import('next').NextConfig} */

require("dotenv").config;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_KEY: process.env.API_KEY,
    API_KEY: process.env.API_KEY,
    API_KEY: process.env.API_KEY,
    API_KEY: process.env.API_KEY,
    API_KEY: process.env.API_KEY,
  }
}

module.exports = nextConfig
