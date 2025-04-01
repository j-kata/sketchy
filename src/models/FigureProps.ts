import { Point, CursorPosition } from '../shared/types';
import { Options } from '../components/options/types';

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
