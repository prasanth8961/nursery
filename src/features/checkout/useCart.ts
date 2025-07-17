'use client';

import { useEffect, useState } from "react";
import { plantsData } from "@/seeds/plantData";
import { Plant, UseCartReturn } from "@/types";
import { keys } from "@/constants";



export const useCart = (user: { id?: string } | null): UseCartReturn => {
  const [cartIds, setCartIds] = useState<number[]>([]);

  useEffect(() => {
    if (user?.id) {
      // TODO: Fetch user's cart IDs from the database
    } else {
      const local = localStorage.getItem(keys.Cart);
      if (local) {
        try {
          const parsed = JSON.parse(local) as number[];
          setCartIds(parsed);
        } catch {
          localStorage.removeItem(keys.Cart);
        }
      }
    }
  }, [user?.id]);

  const syncLocal = (updated: number[]) : void => {
    setCartIds(updated);
    localStorage.setItem(keys.Cart, JSON.stringify(updated));
  };

  const toggleCart = (plant: Plant) : void => {
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
    localStorage.removeItem(keys.Cart);
  };

  const cart: Plant[] = plantsData.filter(plant => cartIds.includes(plant.id));
  const totalAmount : number = cart.reduce((sum, item) => sum + item.price, 0);

  return { cart, toggleCart, isInCart, clearCart, totalAmount };
};
