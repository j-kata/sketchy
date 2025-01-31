import { RoughCanvas } from 'roughjs/bin/canvas';
import Figure from './Figure';
import { Options } from 'roughjs/bin/core';

export class Line extends Figure {
  draw(canvas: RoughCanvas) {
    if (!this.drawable) {
      this.drawable = canvas.line(
        this.x1,
        this.y1,
        this.x2,
        this.y2,
        this.options as Options
      );
    } else {
      canvas.draw(this.drawable);
    }
  }

  clone() {
    return new Line({ ...this });
  }
}
