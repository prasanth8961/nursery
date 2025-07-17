import { useEffect, useState } from "react";
import { plantsData } from "@/seeds/plantData";
import { Plant, UseWishlistReturn } from "@/types";
import { getLocalStorage, setLocalStorage, removeLocalStorage } from "@/lib/localStorage";
import { keys } from "@/constants";


export const useWishlist = (user: { id?: string } | null): UseWishlistReturn => {
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);

  useEffect(() => {
    if (user?.id) {
      // TODO: Fetch user's wishlist IDs from the database
    } else {
      const local = getLocalStorage<number[]>(keys.Wishlist);
      if (Array.isArray(local)) {
        setWishlistIds(local);
      } else {
        removeLocalStorage(keys.Wishlist);
      }
    }
  }, [user?.id]);

  const syncLocal = (updated: number[]) => {
    setWishlistIds(updated);
    setLocalStorage<number[]>(keys.Wishlist, updated);
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
