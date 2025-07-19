'use client';

import { LOGO } from '@/constants';
import Image from 'next/image';

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-green-600 via-green-700 to-green-800 flex flex-col items-center justify-center space-y-4">
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 rounded-full border-4 border-t-emerald-400 border-b-lime-300 border-l-transparent border-r-transparent animate-spin-slow" />
        <div className="flex items-center justify-center h-full w-full rounded-full bg-green-800 z-10">
          <Image
            src={LOGO}
            alt="Logo"
            width={60}
            height={60}
            className="object-contain rounded-full"
          />
        </div>
      </div>
      <p className="text-white text-sm font-medium tracking-wide animate-pulse">Growing green...</p>
    </div>
  );
};
