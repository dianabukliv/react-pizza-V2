import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// Імпортуємо локальний JSON з піцами
import pizzas from '/src/pizzas'; 
import { RootState } from '../store';

type Pizza = {
  id: string;
  title: string; 
  price: number;
  imageUrl: string; 
  sizes: number[];
  types: number[];
  rating: number;
}

interface PizzaSliceState {
  items: Pizza[];
  status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
  items: [],
  status: 'loading',
};

// Заміняємо fetchPizzas на локальне завантаження
export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: Record<string, string>) => {
  const { sortType, currentPage, categoryId } = params;

  // Фільтруємо та сортуємо піци з локального JSON
  let filteredPizzas = pizzas;

  // Фільтрація за категорією
  if (categoryId > 0) {
    filteredPizzas = filteredPizzas.filter(pizza => pizza.category === Number(categoryId));
  }

  // Сортування
  filteredPizzas = filteredPizzas.sort((a, b) => b[sortType.sortProperty] - a[sortType.sortProperty]);

  // Пагінація
  const startIndex = (currentPage - 1) * 4;
  const paginatedPizzas = filteredPizzas.slice(startIndex, startIndex + 4);

  return paginatedPizzas as Pizza[];
});

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

