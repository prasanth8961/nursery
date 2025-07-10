'use client';

import { useEffect, useState } from "react";
import { plantsData } from "@/seeds/plantData";
import { Plant } from "@/types";
import { getLocalStorage, setLocalStorage, removeLocalStorage } from "@/lib/localStorage";

const WISHLIST_KEY = "guest_wishlist_ids";

interface UseWishlistReturn {
  wishlist: Plant[];
  toggleWishlist: (plant: Plant) => void;
  isInWishlist: (plantId: number) => boolean;
}

export const useWishlist = (user: { id?: string } | null): UseWishlistReturn => {
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);

  useEffect(() => {
    if (user?.id) {
      // TODO: Fetch user's wishlist IDs from the database
    } else {
      const local = getLocalStorage<number[]>(WISHLIST_KEY);
      if (Array.isArray(local)) {
        setWishlistIds(local);
      } else {
        removeLocalStorage(WISHLIST_KEY);
      }
    }
  }, [user?.id]);

  const syncLocal = (updated: number[]) => {
    setWishlistIds(updated);
    setLocalStorage<number[]>(WISHLIST_KEY, updated);
  };

  const toggleWishlist = (plant: Plant) => {
    const exists = wishlistIds.includes(plant.id);
    let updated: number[];

    if (exists) {
      updated = wishlistIds.filter(id => id !== plant.id);
      if (user?.id) {
        // TODO: DELETE from database
      } else {
        syncLocal(updated);
      }
    } else {
      updated = [...wishlistIds, plant.id];
      if (user?.id) {
        // TODO: POST to database
      } else {
        syncLocal(updated);
      }
    }
  };

  const isInWishlist = (plantId: number) => wishlistIds.includes(plantId);

  const wishlist: Plant[] = plantsData.filter(plant => wishlistIds.includes(plant.id));

  return { wishlist, toggleWishlist, isInWishlist };
};
