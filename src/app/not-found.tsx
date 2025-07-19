'use client';

import { useRoute } from '@/routes';
import { FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';
import { LOGO } from '@/constants';

export default function NotFound() {
  const { goToHome } = useRoute();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6 bg-[var(--color-background)]">
      <div className="animate-bounce mb-6">
        <Image
          src={LOGO}
          alt="Nursery Logo"
          width={80}
          height={80}
          className="object-contain rounded-full shadow-lg"
        />
      </div>

      <h1 className="text-3xl font-extrabold text-[var(--color-primary-dark)] mb-2">
        404 - Page Not Found
      </h1>

      <p className="text-[var(--color-secondary)] text-sm mb-6 max-w-md">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to
        nature.
      </p>

      <button
        onClick={goToHome}
        className="flex items-center gap-2 bg-green-600 hover:bg-[var(--color-accent-mid)] text-white px-6 py-3 rounded-tl-xl rounded-br-xl shadow-md transition duration-300 ease-in-out"
      >
        <FaArrowLeft />
        <span>Go Home</span>
      </button>
    </div>
  );
}
