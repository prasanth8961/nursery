import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [],
  },
  env: {
    SECRET_KEY: process.env.SECRET_KEY,
  },
};

export default nextConfig;
