import { configureStore } from '@reduxjs/toolkit';
import filter from '/src/components/redux/slices/filterSlice';
import cart from '/src/components/redux/slices/cartSlice';
import pizza from '/src/components/redux/slices/pizzasSlice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});
