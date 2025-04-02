import { RoughCanvas } from 'roughjs/bin/canvas';

import { Options } from '../types/options';
import { Point } from '../types/Point';
import { CursorPosition } from '../types/CursorPosition';

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
