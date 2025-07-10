'use client';

import { useEffect, useState } from "react";
import { plantsData } from "@/seeds/plantData";
import { Plant } from "@/types";

interface UseCartReturn {
  cart: Plant[];
  toggleCart: (plant: Plant) => void;
  isInCart: (plantId: number) => boolean;
  clearCart: () => void;
  totalAmount: number;
}

export const useCart = (user: { id?: string } | null): UseCartReturn => {
  const [cartIds, setCartIds] = useState<number[]>([]);

  useEffect(() => {
    if (user?.id) {
      // TODO: Fetch user's cart IDs from the database
    } else {
      const local = localStorage.getItem("guest_cart_ids");
      if (local) {
        try {
          const parsed = JSON.parse(local) as number[];
          setCartIds(parsed);
        } catch {
          localStorage.removeItem("guest_cart_ids");
        }
      }
    }
  }, [user?.id]);

  const syncLocal = (updated: number[]) => {
    setCartIds(updated);
    localStorage.setItem("guest_cart_ids", JSON.stringify(updated));
  };

  const toggleCart = (plant: Plant) => {
    const exists = cartIds.includes(plant.id);
    let updated: number[];

    if (exists) {
      updated = cartIds.filter(id => id !== plant.id);
      if (user?.id) {
        // TODO: DELETE from database
      } else {
        syncLocal(updated);
      }
    } else {
      updated = [...cartIds, plant.id];
      if (user?.id) {
        // TODO: POST to database
      } else {
        syncLocal(updated);
      }
    }

    setCartIds(updated);
  };

  const isInCart = (plantId: number) => cartIds.includes(plantId);

  const clearCart = () => {
    setCartIds([]);
    localStorage.removeItem("guest_cart_ids");
  };

  const cart: Plant[] = plantsData.filter(plant => cartIds.includes(plant.id));
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return { cart, toggleCart, isInCart, clearCart, totalAmount };
};
