'use client';

export const ShimmerCard = () => {
  return (
    <div className="flex flex-col rounded-md shadow-sm border border-[var(--color-primary-light)] overflow-hidden">
      <div className="relative w-full aspect-[4/3] bg-gray-200">
        <div className="absolute inset-0 animate-shimmer" />
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div className="h-4 w-3/4 rounded-md bg-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 animate-shimmer" />
        </div>
        <div className="h-3 w-1/2 rounded-sm bg-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 animate-shimmer" />
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="h-4 w-20 bg-gray-200 rounded-sm relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer" />
          </div>
          <div className="h-8 w-8 bg-gray-200 rounded-tl-md rounded-br-md relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};
