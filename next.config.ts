import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'xvnkhlhjupsuigwikdmh.supabase.co',
      },
    ],
  },

  env: {
    SECRET_KEY: process.env.SECRET_KEY,
  },
};

export default nextConfig;
