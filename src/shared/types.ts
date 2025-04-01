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

// export type WidthValues = `${Width}`;
export type ElementOptions = {
  fill?: string;
  fillStyle?: string;
  stroke?: string;
  strokeWidth?: number;
  seed?: number;
};

export type Element = {
  id?: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  offset?: Point;
  position?: CursorPosition;
  selected?: boolean;
  options: ElementOptions;
};

export enum CursorPosition {
  L = 'LEFT',
  R = 'RIGHT',
  T = 'TOP',
  B = 'BOTTOM',
  LT = 'LEFT_TOP',
  LB = 'LEFT_BOTTOM',
  RT = 'RIGHT_TOP',
  RB = 'RIGHT_BOTTOM',
  OUT = 'OUTSIDE',
  IN = 'INSIDE',
}
