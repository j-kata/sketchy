import Figure from './Figure';
import { Point, Position } from '../types';
import { RoughCanvas } from 'roughjs/bin/canvas';
export default class Rectangle extends Figure {
  clone(figure: Rectangle = this) {
    return new Rectangle(figure);
  }

  isWithinElement({ x, y }: Point): boolean {
    const { minX, minY, maxX, maxY } = this.boundaries();
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
  }

  cursorPosition(coords: Point): string {
    const { x1, y1, x2, y2 } = this;
    if (!this.isWithinElement(coords)) {
      return Figure.POSITION.OUT;
    } else if (this.isNearPoint(coords, { x: x1, y: y1 })) {
      return Figure.POSITION.LT;
    } else if (this.isNearPoint(coords, { x: x1, y: y2 })) {
      return Figure.POSITION.LB;
    } else if (this.isNearPoint(coords, { x: x2, y: y1 })) {
      return Figure.POSITION.RT;
    } else if (this.isNearPoint(coords, { x: x2, y: y2 })) {
      return Figure.POSITION.RB;
    } else {
      return Figure.POSITION.IN;
    }
  }

  protected orderCoords(): Position {
    const { minX, minY, maxX, maxY } = this.boundaries();
    return { x1: minX, y1: minY, x2: maxX, y2: maxY };
  }

  private boundaries() {
    const minX = Math.min(this.x1, this.x2);
    const maxX = Math.max(this.x1, this.x2);
    const minY = Math.min(this.y1, this.y2);
    const maxY = Math.max(this.y1, this.y2);
    return { minX, minY, maxX, maxY };
  }

  draw(canvas: RoughCanvas) {
    if (!this.drawable) {
      this.drawable = canvas.rectangle(
        this.x1,
        this.y1,
        this.width(),
        this.height(),
        this.options
      );
    } else {
      canvas.draw(this.drawable);
    }
  }
}
