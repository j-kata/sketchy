import { createContext, ReactNode, useEffect, useState } from 'react';
import { Tool } from '../types/Tool';
import { Action } from '../types/Action';

type EditorContextType = {
  tool: Tool;
  action: Action;
  setTool: (tool: Tool) => void;
  setAction: (action: Action) => void;
};

const initialValues = {
  tool: Tool.SELECT,
  action: Action.SELECT,
  setTool: () => {},
  setAction: () => {},
};

export const EditorContext = createContext<EditorContextType>(initialValues);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [tool, setTool] = useState<Tool>(initialValues.tool);
  const [action, setAction] = useState<Action>(initialValues.action);

  useEffect(() => {
    if (action == Action.SELECT) {
      setTool(Tool.SELECT);
    }
  }, [action]);

  useEffect(() => {
    if (tool !== Tool.SELECT) {
      setAction(Action.DRAW);
    }
  }, [tool]);

  return (
    <EditorContext.Provider value={{ tool, action, setTool, setAction }}>
      {children}
    </EditorContext.Provider>
  );
}
