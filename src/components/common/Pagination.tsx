'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const pagesToShow = 4;
  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  let endPage = startPage + pagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - pagesToShow + 1);
  }

  return (
    <div className={`flex justify-center items-center gap-1 md:gap-2 py-6 flex-wrap ${className}`}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md border border-[var(--color-primary)] bg-[var(--color-accent-ultralight)] font-semibold text-sm hover:bg-[var(--color-primary-light)] disabled:opacity-50"
      >
        Prev
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const page = startPage + i;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition border ${
              currentPage === page
                ? 'bg-[var(--color-primary-dark)] text-[var(--color-primary-light)] border-[var(--color-primary)]'
                : 'border-[var(--color-primary)] hover:bg-[var(--color-accent-ultralight)]'
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md border border-[var(--color-primary)] bg-[var(--color-accent-ultralight)] font-semibold text-sm hover:bg-[var(--color-primary-light)] disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
