import { createContext, ReactNode, useState } from 'react';
import { Point } from '../types/Point';

export type CanvasContextType = {
  scale: number;
  changeScale: (point: Point, delta: number) => void;
  offset: Point;
  changeOffset: (point: Point) => void;
};

const initialValues = {
  scale: 1,
  offset: { x: 0, y: 0 },
  changeScale: () => {},
  changeOffset: () => {},
};

export const CanvasContext = createContext<CanvasContextType>(initialValues);

export function CanvasProvider({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState<number>(initialValues.scale);
  const [offset, setOffset] = useState<Point>(initialValues.offset);

  function changeOffset(point: Point) {
    setOffset({
      x: offset.x - point.x / scale,
      y: offset.y - point.y / scale,
    });
  }

  function changeScale(point: Point, delta: number) {
    const wheel = delta < 0 ? 1 : -1;
    const zoom = Math.exp(wheel * 0.1);
    const newScale = scale * zoom;
    setScale(newScale);

    const realX = (point.x - offset.x) / scale;
    const realY = (point.y - offset.y) / scale;

    const x = Math.round(point.x - realX * newScale);
    const y = Math.round(point.y - realY * newScale);

    setOffset({ x, y });
  }

  return (
    <CanvasContext.Provider
      value={{ scale, changeScale, offset, changeOffset }}
    >
      {children}
    </CanvasContext.Provider>
  );
}
