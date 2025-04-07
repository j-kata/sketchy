import { createContext, ReactNode, useEffect, useState } from 'react';
import { Tool } from '../types/Tool';
import { Mode } from '../types/Mode';
import {
  Fill,
  FillStyle,
  Options,
  Stroke,
  StrokeWidth,
} from '../types/options';

type EditorContextType = {
  mode: Mode;
  tool: Tool;
  options: Options;
  setMode: (mode: Mode) => void;
  setTool: (tool: Tool) => void;
  setOptions: (options: Options) => void;
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
  setMode: () => {},
  setTool: () => {},
  setOptions: () => {},
};

export const EditorContext = createContext<EditorContextType>(initialValues);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(initialValues.mode);
  const [tool, setTool] = useState<Tool>(initialValues.tool);
  const [options, setOptions] = useState<Options>(initialValues.options);

  useEffect(() => {
    if (mode == Mode.SELECT || mode == Mode.IDLE) {
      setTool(Tool.SELECT);
    }
  }, [mode]);

  useEffect(() => {
    if (tool !== Tool.SELECT) {
      setMode(Mode.DRAW);
    }
  }, [tool]);

  return (
    <EditorContext.Provider
      value={{ mode, tool, options, setMode, setTool, setOptions }}
    >
      {children}
    </EditorContext.Provider>
  );
}
