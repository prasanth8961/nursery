'use client';

import React from 'react';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  className = '',
}) => {
  return (
    <div className={`flex overflow-x-auto scrollbar-hide gap-4 items-start px-1 ${className}`}>
      {categories.map(category => (
        <div
          key={category}
          onClick={() => onCategoryChange(category)}
          className="flex flex-col items-center pb-2 cursor-pointer"
        >
          <span
            className={`text-sm font-medium transition-colors duration-200 ${
              activeCategory === category
                ? 'text-[var(--color-primary-dark)]'
                : 'text-[var(--color-primary)] hover:text-[var(--color-primary-light)]'
            }`}
          >
            {category}
          </span>
          <div
            className={`h-[2px] mt-1 w-full rounded-full transition-all duration-300 ${
              activeCategory === category ? 'bg-[var(--color-primary)]' : 'bg-transparent'
            }`}
          />
        </div>
      ))}
    </div>
  );
};
