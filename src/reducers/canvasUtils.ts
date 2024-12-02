import Ellipse from '../entities/Ellipse';
import Line from '../entities/Line';
import Rectangle from '../entities/Rectangle';
import { Options, Point, Tool } from '../types';

export function createElement({ x, y }: Point, tool: Tool, options: Options) {
  const [x1, y1] = [x, y];

  switch (tool) {
    case Tool.SQUARE: {
      return new Rectangle({ x1, y1, options });
    }
    case Tool.ELLIPSE: {
      return new Ellipse({ x1, y1, options });
    }
    default: {
      return new Line({ x1, y1, options });
    }
  }
}
