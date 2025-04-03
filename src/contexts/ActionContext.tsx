import { createContext, ReactNode, useState } from 'react';
import { Action } from '../types/Action';

type ActionContextType = {
  action: Action;
  setAction: (action: Action) => void;
};

const initValues = {
  action: Action.DRAW,
  setAction: () => {},
};

export const ActionContext = createContext<ActionContextType>(initValues);

export function ActionProvider({ children }: { children: ReactNode }) {
  const [action, setAction] = useState<Action>(initValues.action);

  return (
    <ActionContext.Provider value={{ action, setAction }}>
      {children}
    </ActionContext.Provider>
  );
}
