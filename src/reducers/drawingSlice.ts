import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Element, Options, Point, Tool } from '../shared/types';
import * as Figure from './canvasUtils';

interface DrawingState {
  current: Element | null;
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
      const { tool, options, point } = action.payload;
      state.current = Figure.create(point, point, tool, options);
    },
    drawMove: (state, action: PayloadAction<Point>) => {
      state.current =
        state.current && Figure.resize(state.current, action.payload);
    },
    drawEnd: (state) => {
      // state.current = null;
    },
  },
});

export const { drawStart, drawMove, drawEnd } = drawingSlice.actions;

export default drawingSlice.reducer;
