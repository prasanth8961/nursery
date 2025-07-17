'use client';

import { useRoute } from '@/routes'; // Your custom route hook
import { FaSearch } from 'react-icons/fa';

interface NotFoundProps {
    message?: string;
    showButton?: boolean;
    buttonLabel?: string;
}

export default function NotFound({
    message = 'Item not found',
    showButton = true,
    buttonLabel = 'Go Home',
}: NotFoundProps) {
    const { goToHome } = useRoute();

    return (
        <div className="flex flex-col items-center justify-center h-screen px-4 py-10 text-center">
            <div className="text-red-600 mb-4">
                <FaSearch size={48} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {message}
            </h2>
            <p className="text-gray-600 text-sm md:text-base mb-6">
                Sorry, we couldn’t find what you were looking for.
            </p>
            {showButton && (
                <button
                    onClick={goToHome}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-tl-lg rounded-br-lg text-sm font-medium shadow transition-all"
                >
                    {buttonLabel}
                </button>
            )}
        </div>
    );
}
