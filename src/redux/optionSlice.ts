import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Background, Color, Width, Style, Options } from '../types';
import { RootState } from './store';

const initialState: Options = {
  stroke: Color.BLACK,
  fill: Background.TRANSPARENT,
  strokeWidth: Width.XS,
  fillStyle: Style.SOLID,
};

export const optionSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setStrokeColor: (state, action: PayloadAction<Color>) => {
      state.stroke = action.payload;
    },
    setBackgroundColor: (state, action: PayloadAction<Background>) => {
      state.fill = action.payload;
    },
    setStrokeWidth: (state, action: PayloadAction<Width>) => {
      state.strokeWidth = action.payload;
    },
    setFillStyle: (state, action: PayloadAction<Style>) => {
      state.fillStyle = action.payload;
    },
  },
});

export const strokeColorSelector = (state: RootState) => state.options.stroke;
export const backgroundSelector = (state: RootState) => state.options.fill;
export const strokeWidthSelector = (state: RootState) =>
  state.options.strokeWidth;
export const fillStyleSelector = (state: RootState) => state.options.fillStyle;

export const {
  setStrokeColor,
  setBackgroundColor,
  setStrokeWidth,
  setFillStyle,
} = optionSlice.actions;

export default optionSlice.reducer;
