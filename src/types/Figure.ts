import { CursorPosition } from './CursorPosition';
import { Options } from './options';
import { Point } from './Point';
import { Tool } from './Tool';

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
  position: CursorPosition;
  offset: Point;
};

export const toolToFigureTypeMap: Record<Tool, FigureType | null> = {
  [Tool.SELECT]: null,
  [Tool.LINE]: FigureType.LINE,
  [Tool.RECTANGLE]: FigureType.RECTANGLE,
  [Tool.ELLIPSE]: FigureType.ELLIPSE,
};
