import { Point } from '../types/Point';
import { CursorPosition } from '../types/CursorPosition';
import { Options } from '../types/options';

export type FigureProps = {
  id?: number;
  selected?: boolean;
  point1: Point;
  point2?: Point;
  options: Options;
  position?: CursorPosition;
  seed?: number;
  offset?: Point;
};

export type PartialFigureProps = Partial<FigureProps>;
