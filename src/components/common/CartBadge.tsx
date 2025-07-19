'use client';

import { useAppSelector } from '@/lib/store/helper/index';
import { useEffect, useState } from 'react';

export default function CartBadge() {
  const cartItemCount = useAppSelector(state => state.cart.items.length);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <span className="rounded-sm text-sm font-semibold border-2 border-green-400 flex items-center justify-center h-5 px-1 py-[1px]">
      {cartItemCount || 0}
    </span>
  );
}
