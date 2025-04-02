import { createContext, ReactNode, useState } from 'react';
import {
  Options,
  Stroke,
  Fill,
  FillStyle,
  StrokeWidth,
} from '../types/options';

export type OptionsContextType = {
  options: Options;
  setOptions: (options: Options) => void;
};

const initialOptions = {
  stroke: Stroke.BLACK,
  strokeWidth: StrokeWidth.XS,
  fill: Fill.TRANSPARENT,
  fillStyle: FillStyle.SOLID,
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
