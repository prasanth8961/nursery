'use client';

import React from 'react';
import { FaLeaf } from 'react-icons/fa';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <FaLeaf className="text-green-500 text-5xl mb-4" />,
  title,
  message,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center mt-20 text-center text-gray-600 ${className}`}>
      {icon}
      <h2 className="text-xl font-semibold">{title}</h2>
      {message && <p className="text-sm text-gray-500 mt-1">{message}</p>}
    </div>
  );
};
