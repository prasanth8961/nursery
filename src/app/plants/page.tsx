import { Suspense } from 'react';
import ProductListClient from '@/components/layout/ProductListClient';

export default function PlantsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-10">
      <div className="flex items-center space-x-3">
        <div className="h-5 w-5 rounded-full bg-green-600 animate-bounce [animation-delay:-0.3s]" />
        <div className="h-5 w-5 rounded-full bg-green-500 animate-bounce [animation-delay:-0.15s]" />
        <div className="h-5 w-5 rounded-full bg-green-400 animate-bounce" />
        <span className="ml-3 text-green-700 text-sm font-medium">Loading plants...</span>
      </div>
    </div>
    }>
      <ProductListClient />
    </Suspense>
  );
}

