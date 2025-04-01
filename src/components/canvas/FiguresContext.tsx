import { createContext, ReactNode, useReducer, useState } from 'react';
import Figure from '../../models/Figure';
import figuresReducer, { FigureDispatchType } from './figuresReducer';

type FiguresContextType = {
  figures: Figure[];
  dispatch: FigureDispatchType;
};

const initialValues = { figures: [], dispatch: () => {} };

export const FiguresContext = createContext<FiguresContextType>(initialValues);

export function FiguresProvider({ children }: { children: ReactNode }) {
  const [figures, dispatch] = useReducer(figuresReducer, []);

  return (
    <FiguresContext.Provider value={{ figures, dispatch }}>
      {children}
    </FiguresContext.Provider>
  );
}
