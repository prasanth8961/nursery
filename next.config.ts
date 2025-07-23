import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  env: {
    SECRET_KEY: process.env.SECRET_KEY,
  },
};

export default nextConfig;
