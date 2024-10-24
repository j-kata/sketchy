import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tool } from '../types';

type State = {
  tool: Tool;
};

const initialState: State = {
  tool: Tool.LINE,
};

export const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    setTool: (state, action: PayloadAction<Tool>) => {
      state.tool = action.payload;
    },
  },
});

export const { setTool } = toolSlice.actions;
export default toolSlice.reducer;
