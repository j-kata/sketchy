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

export type Options = {
  stroke?: Color;
  fill?: Background;
  strokeWidth?: Width;
  fillStyle?: Style;
  seed?: number;
};

export enum Tool {
  SELECT = 'select',
  LINE = 'line',
  SQUARE = 'square',
  ELLIPSE = 'ellipse',
}

export enum Color {
  BLACK = '#000',
  RED = '#F00',
  GREEN = '#0F0',
  BLUE = '#00F',
  YELLOW = '#FF0',
  MAGENTA = '#F0F',
  CYAN = '#0FF',
  WHITE = '#FFF',
}

export enum Background {
  TRANSPARENT = 'transparent',
  BLACK = '#000',
  RED = '#F00',
  GREEN = '#0F0',
  BLUE = '#00F',
  YELLOW = '#FF0',
  MAGENTA = '#F0F',
  CYAN = '#0FF',
  WHITE = '#FFF',
}

export enum Width {
  XS = 1,
  SM = 2,
  MD = 3,
  LG = 4,
  XL = 5,
}

export type WidthValues = `${Width}`;

export enum Style {
  SOLID = 'solid',
  ZIGZAG = 'zigzag',
  CROSS = 'cross-hatch',
  DOTS = 'dots',
  DASHED = 'dashed',
}
