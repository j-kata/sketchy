import { Options, Point, CursorPosition } from '../shared/types';

export type FigureProps = {
  id?: number;
  point1: Point;
  point2?: Point;
  selected?: boolean;
  offset?: Point;
  position?: CursorPosition;
  options?: Options;
};
