import { createContext, ReactNode, useReducer } from 'react';
import Figure from '../models/Figure';
import editorReducer, { EditorDispatchType } from '../reducers/editorReducer';
import { Mode } from '../types/Mode';
import { Tool } from '../types/Tool';
import {
  Fill,
  FillStyle,
  Options,
  Stroke,
  StrokeWidth,
} from '../types/options';

type EditorReducerType = {
  mode: Mode;
  tool: Tool;
  options: Options;
  figures: Figure[];
};
type EditorContextType = EditorReducerType & {
  dispatch: EditorDispatchType;
};

const initialReducerValues = {
  mode: Mode.IDLE,
  tool: Tool.SELECT,
  options: {
    stroke: Stroke.BLACK,
    strokeWidth: StrokeWidth.XS,
    fill: Fill.TRANSPARENT,
    fillStyle: FillStyle.SOLID,
  },
  figures: [],
};

const initialContextValues = {
  ...initialReducerValues,
  dispatch: () => {},
};

export const EditorContext =
  createContext<EditorContextType>(initialContextValues);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialReducerValues);

  return (
    <EditorContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}
