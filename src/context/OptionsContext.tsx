import { createContext, ReactNode, useState } from 'react';
import { Background, Color, Options, Style, Width } from '../types';

export type OptionsContextType = {
  options: Options;
  setOptions: (options: Options) => void;
};

const initialOptions = {
  stroke: Color.BLACK,
  fill: Background.TRANSPARENT,
  strokeWidth: Width.XS,
  fillStyle: Style.SOLID,
};

export const OptionsContext = createContext<OptionsContextType | null>(null);

export function OptionsProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<Options>(initialOptions);

  return (
    <OptionsContext.Provider value={{ options, setOptions }}>
      {children}
    </OptionsContext.Provider>
  );
}
