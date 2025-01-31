import { RoughCanvas } from 'roughjs/bin/canvas';
import Figure from './Figure';
import { Options } from 'roughjs/bin/core';

export class Rectangle extends Figure {
  draw(canvas: RoughCanvas) {
    if (!this.drawable) {
      this.drawable = canvas.rectangle(
        this.x1,
        this.y1,
        this.width,
        this.height,
        this.options as Options
      );
    } else {
      canvas.draw(this.drawable);
    }
  }

  clone() {
    return new Rectangle({ ...this });
  }
}
