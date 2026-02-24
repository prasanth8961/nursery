import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Plant } from '@/types';

interface ProductState {
  plants: Plant[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  plants: [],
  total: 0,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setPlants: (state, action: PayloadAction<{ plants: Plant[]; total: number }>) => {
      state.plants = action.payload.plants;
      state.total = action.payload.total;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
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

export const { setPlants, addPlant, updatePlant, removePlant, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;
