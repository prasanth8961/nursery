'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { CartItem, PlantVariant, UseCartReturn, Plant } from '@/types';
import { keys } from '@/constants';

export const useCart = (user: { id?: string } | null): UseCartReturn => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (user?.id) {
      // TODO: Fetch cart from backend
    } else {
      try {
        const local = localStorage.getItem(keys.Cart);
        if (local) {
          const parsed = JSON.parse(local) as CartItem[];
          setCart(parsed);
        }
      } catch {
        localStorage.removeItem(keys.Cart);
      }
    }
  }, [user?.id]);

  const syncLocal = useCallback((updated: CartItem[]) => {
    setCart(updated);
    localStorage.setItem(keys.Cart, JSON.stringify(updated));
  }, []);

  const toggleCart = useCallback(
    (plant: Plant, variant: PlantVariant) => {
      const exists = cart.some(item => item.variantId === variant.id);

      const updated = exists
        ? cart.filter(item => item.variantId !== variant.id)
        : [
            ...cart,
            {
              variantId: variant.id,
              plantId: plant.id,
              name: plant.name,
              tamilName: plant.tamilName,
              subName: plant.subName,
              baseImageUrl: plant.baseImageUrl,
              category: plant.category,
              variant,
            } satisfies CartItem,
          ];

      if (user?.id) {
        // TODO: Sync with backend (e.g., POST /cart)
      } else {
        syncLocal(updated.reverse());
      }
    },
    [cart, user, syncLocal]
  );

  const isInCart = useCallback(
    (variantId: string) => cart.some(item => item.variantId === variantId),
    [cart]
  );

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem(keys.Cart);
  }, []);

  const totalAmount = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = typeof item.variant?.price === 'number' ? item.variant.price : 0;
      return sum + price;
    }, 0);
  }, [cart]);

  return {
    cart,
    toggleCart,
    isInCart,
    clearCart,
    totalAmount,
  };
};
