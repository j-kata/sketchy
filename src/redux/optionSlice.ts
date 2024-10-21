import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Background, Color } from '../types';
import { RootState } from './store';

type State = {
  strokeColor: Color;
  backgroundColor: Background;
};

const initialState: State = {
  strokeColor: Color.BLACK,
  backgroundColor: Background.TRANSPARENT,
};

export const optionSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setStrokeColor: (state, action: PayloadAction<Color>) => {
      state.strokeColor = action.payload;
    },
    setBackgroundColor: (state, action: PayloadAction<Background>) => {
      state.backgroundColor = action.payload;
    },
  },
});

export const strokeColorSelector = (state: RootState) =>
  state.options.strokeColor;
export const backgroundSelector = (state: RootState) =>
  state.options.backgroundColor;

export const { setStrokeColor, setBackgroundColor } = optionSlice.actions;

export default optionSlice.reducer;
