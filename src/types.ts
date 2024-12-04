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
  WHITE = '#FFF',
  RED = '#F00',
  GREEN = '#0F0',
  BLUE = '#00F',
}

export enum Background {
  TRANSPARENT = 'transparent',
  BLACK = '#000',
  RED = '#F00',
  GREEN = '#0F0',
  BLUE = '#00F',
}

export enum Width {
  XS = '1',
  SM = '2',
  MD = '3',
  LG = '4',
  XL = '5',
}

export type WidthValues = `${Width}`;

export enum Style {
  SOLID = 'solid',
  ZIGZAG = 'zigzag',
  CROSS = 'cross-hatch',
  DOTS = 'dots',
  DASHED = 'dashed',
}

export type SupportedOptionEnum =
  | typeof Color
  | typeof Background
  | typeof Width
  | typeof Style;

export type SupportedOption = Color | Background | Width | Style;

export type Element = {
  id?: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  offset?: Point;
  position?: CursorPosition;
  selected?: boolean;
  tool: Tool;
  options: Options;
};

export enum CursorPosition {
  LT = 'LEFT_TOP',
  LB = 'LEFT_BOTTOM',
  RT = 'RIGHT_TOP',
  RB = 'RIGHT_BOTTOM',
  OUT = 'OUTSIDE',
  IN = 'INSIDE',
}
