import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    SECRET_KEY: process.env.SECRET_KEY,
  },
};

export default nextConfig;
