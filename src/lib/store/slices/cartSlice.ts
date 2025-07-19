import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Plant, PlantVariant } from '@/types';
import { keys } from '@/constants';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(keys.Cart) || '[]') : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state, action: PayloadAction<{ plant: Plant; variant: PlantVariant }>) {
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

      localStorage.setItem(keys.Cart, JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem(keys.Cart);
    },
  },
});

export const { toggleCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
