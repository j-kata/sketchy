import { Drawable, Options } from 'roughjs/bin/core';
import Figure, { FigureOptions, FigureProps } from './Figure';
import { Point, Position } from '../types';
import rough from 'roughjs';
import { RoughCanvas } from 'roughjs/bin/canvas';

export default class Line extends Figure {
  drawable: Drawable;

  constructor(options: FigureProps) {
    super(options);
    const { x1, y1, x2, y2 } = options;
    this.drawable = rough.generator().line(x1, y1, x2, y2);
  }

  clone(figure: Figure = this) {
    return new Line(figure);
  }

  isWithinElement({ x, y }: Point): boolean {
    const a = { x: this.x1, y: this.y1 };
    const b = { x: this.x2, y: this.y2 };
    const c = { x, y };
    const offset =
      this.distance(a, b) - (this.distance(a, c) + this.distance(b, c));
    return Math.abs(offset) < 1;
  }

  cursorPosition(coords: Point): string {
    const { x1, y1, x2, y2 } = this;
    if (!this.isWithinElement(coords)) {
      return Figure.POSITION.OUT;
    } else if (this.isNearPoint(coords, { x: x1, y: y1 })) {
      return Figure.POSITION.LT;
    } else if (this.isNearPoint(coords, { x: x2, y: y2 })) {
      return Figure.POSITION.RB;
    } else {
      return Figure.POSITION.IN;
    }
  }

  protected orderCoords(): Position {
    const { x1, x2, y1, y2 } = this;
    if (x2 < x1 || (x1 === x2 && y2 < y1)) {
      return { x1: x2, y1: y2, x2: x1, y2: y1 };
    } else {
      return { x1, y1, x2, y2 };
    }
  }

  private distance(a: Point, b: Point): number {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }

  draw(canvas: RoughCanvas, options: FigureOptions = {}) {
    canvas.line(this.x1, this.y1, this.x2, this.y2, options as Options);
  }
}
