import { RoughCanvas } from 'roughjs/bin/canvas';
import Figure from './Figure';
import { CursorPosition, Point } from '../shared/types';

export class Line extends Figure {
  draw(canvas: RoughCanvas, offset: Point, scale: number) {
    canvas.line(
      this.x1 * scale + offset.x,
      this.y1 * scale + offset.y,
      this.x2 * scale + offset.x,
      this.y2 * scale + offset.y,
      this.roughOptions
    );
  }

  clone() {
    return new Line({ ...this });
  }

  isWithinElement(point: Point): boolean {
    return this.isNearLine(point, this.point1, this.point2);
  }

  cursorPosition(point: Point): CursorPosition {
    if (this.isNearPoint(point, this.point1)) {
      return CursorPosition.LT;
    } else if (this.isNearPoint(point, this.point2)) {
      return CursorPosition.RB;
    } else if (!this.isWithinElement(point)) {
      return CursorPosition.OUT;
    } else {
      return CursorPosition.IN;
    }
  }
}
