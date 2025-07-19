'use client';

import { useRoute } from '@/routes';
import { FaLeaf, FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
  const { goToBack } = useRoute();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      <div className="animate-bounce text-[var(--color-accent)] mb-6">
        <FaLeaf size={64} />
      </div>

      <h1 className="text-4xl font-bold text-[var(--color-primary-dark)] mb-2">
        404 - Page Not Found
      </h1>

      <p className="text-gray-500 mb-6 max-w-md">
        We couldn't find the page you're looking for. It might have been removed, renamed, or
        doesn't exist.
      </p>

      <button
        onClick={goToBack}
        className="flex items-center gap-2 bg-[var(--color-primary-dark)] hover:bg-[var(--color-accent-mid)] text-white px-6 py-3 rounded-tl-xl rounded-br-xl shadow-md transition"
      >
        <FaArrowLeft />
        Go Back
      </button>
    </div>
  );
}
