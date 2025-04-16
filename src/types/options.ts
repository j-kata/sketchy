export enum Stroke {
  BLACK = '#000',
  WHITE = '#FFF',
  RED = '#F00',
  GREEN = '#0F0',
  BLUE = '#00F',
}

export enum StrokeWidth {
  XS = 1,
  SM = 2,
  MD = 3,
  LG = 4,
  XL = 5,
}

export enum Fill {
  TRANSPARENT = 'transparent',
  BLACK = '#000',
  RED = '#F00',
  GREEN = '#0F0',
  BLUE = '#00F',
}

export enum FillStyle {
  SOLID = 'solid',
  ZIGZAG = 'zigzag',
  CROSS = 'cross-hatch',
  DOTS = 'dots',
  DASHED = 'dashed',
}

export type Options = {
  stroke: Stroke;
  strokeWidth: StrokeWidth;
  fill: Fill;
  fillStyle: FillStyle;
};

export type Option = Stroke | StrokeWidth | Fill | FillStyle;
export type OptionKey = keyof Options;

export type OptionType =
  | typeof Stroke
  | typeof StrokeWidth
  | typeof Fill
  | typeof FillStyle;

type OptionKeys<T> = { [P in keyof Required<T>]: OptionType };

export const OptionValues: OptionKeys<Options> = {
  stroke: Stroke,
  strokeWidth: StrokeWidth,
  fill: Fill,
  fillStyle: FillStyle,
};
