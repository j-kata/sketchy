import { RoughCanvas } from 'roughjs/bin/canvas';
import { Options, Point, CursorPosition } from '../shared/types';
import { Drawable } from 'roughjs/bin/core';

export interface FigureInterface {
  id: number;
  point1: Point;
  point2: Point;
  selected: boolean;
  offset: Point;
  position: CursorPosition;
  options: Options;
  drawable: Drawable | null;
  draw: (canvas: RoughCanvas) => void;
}
