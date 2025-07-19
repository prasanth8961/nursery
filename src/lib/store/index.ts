import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import favReducer from './slices/favSlice';
import productReducer from './slices/productSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    fav: favReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
