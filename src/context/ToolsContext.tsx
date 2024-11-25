import { createContext, ReactNode, useState } from 'react';
import { Tool } from '../types';

export type ToolsContextType = {
  tool: Tool;
  setTool: (tool: Tool) => void;
};

export const ToolsContext = createContext<ToolsContextType | null>(null);

export function ToolsProvider({ children }: { children: ReactNode }) {
  const [tool, setTool] = useState<Tool>(Tool.SELECT);

  return (
    <ToolsContext.Provider value={{ tool, setTool }}>
      {children}
    </ToolsContext.Provider>
  );
}
