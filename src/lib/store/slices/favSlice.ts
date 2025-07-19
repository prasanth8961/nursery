import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Plant, PlantVariant, CartItem } from '@/types';
import { keys } from '@/constants';

interface FavState {
  items: CartItem[];
}

const initialState: FavState = {
  items:
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(keys.Wishlist) || '[]') : [],
};

const favSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {
    toggleFav(state, action: PayloadAction<{ plant: Plant; variant: PlantVariant }>) {
      const exists = state.items.find(item => item.variantId === action.payload.variant.id);

      if (exists) {
        state.items = state.items.filter(item => item.variantId !== action.payload.variant.id);
      } else {
        state.items.unshift({
          variantId: action.payload.variant.id,
          plantId: action.payload.plant.id,
          name: action.payload.plant.name,
          tamilName: action.payload.plant.tamilName,
          subName: action.payload.plant.subName,
          baseImageUrl: action.payload.plant.baseImageUrl,
          category: action.payload.plant.category,
          variant: action.payload.variant,
        });
      }

      localStorage.setItem(keys.Wishlist, JSON.stringify(state.items));
    },
    clearFav(state) {
      state.items = [];
      localStorage.removeItem(keys.Wishlist);
    },
  },
});

export const { toggleFav, clearFav } = favSlice.actions;
export default favSlice.reducer;
