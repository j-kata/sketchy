export interface Point {
  x: number;
  y: number;
}
export interface Position {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export type Cursor = {
  position?: string;
  offset?: Point;
};

export enum Tool {
  SELECT = 'select',
  LINE = 'line',
  SQUARE = 'square',
  ELLIPSE = 'ellipse',
}
