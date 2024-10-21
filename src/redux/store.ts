import { configureStore } from '@reduxjs/toolkit';
import optionReducer from './optionSlice';

export const store = configureStore({
  reducer: { options: optionReducer },
});

export type RootState = ReturnType<typeof store.getState>;
