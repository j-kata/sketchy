import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Figure from '../entities/Figure';
import { Options, Point, Tool } from '../types';
import { createElement } from './canvasUtils';

interface DrawingState {
  current: Figure | null;
}

interface DrawingPayload {
  point: Point;
  tool: Tool;
  options: Options;
}

export const drawingSlice = createSlice({
  name: 'canvas',
  initialState: {
    current: null,
  } as DrawingState,
  reducers: {
    drawStart: (state, action: PayloadAction<DrawingPayload>) => {
      console.log('sss');
      const { tool, options, point } = action.payload;
      state.current = createElement(point, tool, options);
    },
    drawMove: (state, action: PayloadAction<Point>) => {
      state.current = state.current && state.current.update(action.payload);
    },
    drawEnd: (state) => {
      state.current = null;
    },
  },
});

export const { drawStart, drawMove, drawEnd } = drawingSlice.actions;

export default drawingSlice.reducer;
