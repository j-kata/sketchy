import { Options, Point, Tool } from '../types';
import { Ellipse } from './Ellipse';
import { Line } from './Line';
import { Rectangle } from './Rectangle';

export class FigureFactory {
  static createFigure(
    type: Tool,
    options: Options,
    point1: Point,
    point2?: Point
  ) {
    switch (type) {
      case Tool.SQUARE: {
        return new Rectangle({ point1, point2, options });
      }
      case Tool.ELLIPSE: {
        return new Ellipse({ point1, point2, options });
      }
      default: {
        return new Line({ point1, point2, options });
      }
    }
  }
}
