'use client';

import { useEffect, useState, useCallback } from 'react';
import { WishListItem, UseWishlistReturn, PlantVariant, Plant } from '@/types';
import { keys } from '@/constants';

export const useWishlist = (user: { id?: string } | null): UseWishlistReturn => {
  const [wishlist, setWishlist] = useState<WishListItem[]>([]);

  useEffect(() => {
    if (user?.id) {
      // TODO: Fetch wishlist from backend
    } else {
      try {
        const local = localStorage.getItem(keys.Wishlist);
        if (local) {
          const parsed = JSON.parse(local) as WishListItem[];
          setWishlist(parsed);
        }
      } catch {
        localStorage.removeItem(keys.Wishlist);
      }
    }
  }, [user?.id]);

  const syncLocal = useCallback((updated: WishListItem[]) => {
    setWishlist(updated);
    localStorage.setItem(keys.Wishlist, JSON.stringify(updated));
  }, []);

  const toggleWishlist = (plant: Plant, variant: PlantVariant) => {
    const exists = wishlist.some(item => item.variantId === variant.id);

    const updated = exists
      ? wishlist.filter(item => item.variantId !== variant.id)
      : [
          ...wishlist,
          {
            variantId: variant.id,
            plantId: plant.id,
            name: plant.name,
            tamilName: plant.tamilName,
            subName: plant.subName,
            baseImageUrl: plant.baseImageUrl,
            category: plant.category,
            variant,
          } satisfies WishListItem,
        ];

    if (user?.id) {
      // TODO: Sync with backend
    } else {
      syncLocal(updated.reverse());
    }
  };

  const isInWishlist = useCallback(
    (variantId: string) => wishlist.some(item => item.variantId === variantId),
    [wishlist]
  );

  const clearWishlist = useCallback(() => {
    setWishlist([]);
    localStorage.removeItem(keys.Wishlist);
  }, []);

  return {
    wishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };
};
