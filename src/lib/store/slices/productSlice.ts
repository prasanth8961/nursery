import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { plantsData } from '@/seeds/plantData';
import { Plant } from '@/types';

interface ProductState {
  plants: Plant[];
}

const initialState: ProductState = {
  plants: plantsData,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setPlants: (state, action: PayloadAction<Plant[]>) => {
      state.plants = action.payload;
    },
    addPlant: (state, action: PayloadAction<Plant>) => {
      state.plants.push(action.payload);
    },
    updatePlant: (state, action: PayloadAction<Plant>) => {
      const index = state.plants.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.plants[index] = action.payload;
      }
    },
    removePlant: (state, action: PayloadAction<number>) => {
      state.plants = state.plants.filter((p: Plant) => p.id !== action.payload);
    },
  },
});

export const { setPlants, addPlant, updatePlant, removePlant } = productSlice.actions;
export default productSlice.reducer;
