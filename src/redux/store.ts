import { configureStore } from '@reduxjs/toolkit';
import optionReducer from './optionSlice';
import toolReducer from './toolSlice';

export const store = configureStore({
  reducer: {
    options: optionReducer,
    tool: toolReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
