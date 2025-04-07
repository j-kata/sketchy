import { createContext, ReactNode, useReducer } from 'react';
import editorReducer, { EditorDispatchType } from '../reducers/editorReducer';
import { Mode } from '../types/Mode';
import { Tool } from '../types/Tool';
import { Fill, FillStyle, Stroke, StrokeWidth } from '../types/options';
import { EditorState } from '../reducers/EditorState';

type EditorContextType = EditorState & {
  dispatch: EditorDispatchType;
};

const initialValues = {
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

export const EditorContext = createContext<EditorContextType | null>(null);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialValues);

  return (
    <EditorContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}
