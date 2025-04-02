import { RoughCanvas } from 'roughjs/bin/canvas';
import Figure from './Figure';
import { Point } from '../types/Point';
import { CursorPosition } from '../types/CursorPosition';
import { PartialFigureProps } from './types';

export class Rectangle extends Figure {
  draw(canvas: RoughCanvas, offset: Point, scale: number) {
    canvas.rectangle(
      this.x1 * scale + offset.x,
      this.y1 * scale + offset.y,
      this.width * scale,
      this.height * scale,
      this.roughOptions
    );
  }

  clone(values: PartialFigureProps = {}) {
    return new Rectangle({ ...this, ...values });
  }

  isWithinElement({ x, y }: Point): boolean {
    const { minX, minY, maxX, maxY } = this.boundaries();
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
  }

  cursorPosition(point: Point): CursorPosition {
    const { x1, y1, x2, y2 } = this;
    if (this.isNearPoint(point, { x: x1, y: y1 })) {
      return CursorPosition.LT;
    } else if (this.isNearPoint(point, { x: x1, y: y2 })) {
      return CursorPosition.LB;
    } else if (this.isNearPoint(point, { x: x2, y: y1 })) {
      return CursorPosition.RT;
    } else if (this.isNearPoint(point, { x: x2, y: y2 })) {
      return CursorPosition.RB;
    } else if (this.isNearLine(point, { x: x1, y: y1 }, { x: x1, y: y2 })) {
      return CursorPosition.L;
    } else if (this.isNearLine(point, { x: x2, y: y1 }, { x: x2, y: y2 })) {
      return CursorPosition.R;
    } else if (this.isNearLine(point, { x: x1, y: y1 }, { x: x2, y: y1 })) {
      return CursorPosition.T;
    } else if (this.isNearLine(point, { x: x1, y: y2 }, { x: x2, y: y2 })) {
      return CursorPosition.B;
    } else if (!this.isWithinElement(point)) {
      return CursorPosition.OUT;
    } else {
      return CursorPosition.IN;
    }
  }

  protected boundaries() {
    const minX = Math.min(this.x1, this.x2);
    const maxX = Math.max(this.x1, this.x2);
    const minY = Math.min(this.y1, this.y2);
    const maxY = Math.max(this.y1, this.y2);
    return { minX, minY, maxX, maxY };
  }
}
