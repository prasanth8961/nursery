'use client';

import { useRoute } from '@/routes';
import { FaLeaf, FaArrowLeft } from 'react-icons/fa';

interface NotFoundProps {
  message?: string;
  showButton?: boolean;
  buttonLabel?: string;
}

export default function NotFound({
  message = 'Oops! Page not found',
  showButton = true,
  buttonLabel = 'Go Back',
}: NotFoundProps) {
  const { goToBack } = useRoute();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      <div className="animate-bounce text-[var(--color-accent)] mb-6">
        <FaLeaf size={64} />
      </div>

      <h1 className="text-4xl font-bold text-[var(--color-primary-dark)] mb-2">404 - {message}</h1>

      <p className="text-gray-500 mb-6 max-w-md">
        We couldn&apos;t find the page you&apos;re looking for. It may have been removed, renamed,
        or never existed.
      </p>
      {showButton && (
        <button
          onClick={goToBack}
          className="flex items-center gap-2 bg-[var(--color-primary-dark)] hover:bg-[var(--color-accent-mid)] text-white px-6 py-3 rounded-tl-xl rounded-br-xl shadow-md transition"
        >
          <FaArrowLeft />
          {buttonLabel}
        </button>
      )}
    </div>
  );
}
