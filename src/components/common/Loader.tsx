'use client';

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-green-600 via-green-700 to-green-800 flex flex-col items-center justify-center space-y-4 transition-all duration-300">
      <span className="h-12 w-12 border-4 border-dashed border-white rounded-full animate-spin [animation-duration:1.5s]" />
      <p className="text-white text-sm font-medium tracking-wide">
        Growing green...
      </p>
    </div>
  );
};
