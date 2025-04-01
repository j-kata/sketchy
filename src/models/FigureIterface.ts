import { RoughCanvas } from 'roughjs/bin/canvas';
import { Point, CursorPosition } from '../shared/types';
import { Drawable } from 'roughjs/bin/core';
import { Options } from '../components/options/types';

export interface FigureInterface {
  id: number;
  point1: Point;
  point2: Point;
  selected: boolean;
  offset: Point;
  position: CursorPosition;
  options: Options;
  draw: (canvas: RoughCanvas, offset: Point, scale: number) => void;
}
