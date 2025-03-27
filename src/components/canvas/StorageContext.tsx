import { createContext, ReactNode, useState } from 'react';
import Figure from '../../models/Figure';

type StorageContextType = {
  store: Figure[];
  setStore: (figures: Figure[]) => void;
};

const initialValues = { store: [], setStore: () => {} };

export const StorageContext = createContext<StorageContextType>(initialValues);

export function StorageProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<Figure[]>([]);

  return (
    <StorageContext.Provider value={{ store, setStore }}>
      {children}
    </StorageContext.Provider>
  );
}
