import { CursorPosition } from './CursorPosition';
import { Options } from './options';
import { Point } from './Point';

export enum FigureType {
  RECTANGLE = 'rectangle',
  ELLIPSE = 'ellipse',
  LINE = 'line',
}

export type FigureOptions = Options & {
  seed: number;
};

export type Figure = {
  id: number;
  type: FigureType;
  options: FigureOptions;
  point1: Point;
  point2: Point;
  // width: number;
  // height: number;
  position: CursorPosition;
  offset: Point;
};
