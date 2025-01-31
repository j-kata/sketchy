import { RoughCanvas } from 'roughjs/bin/canvas';
import Figure from './Figure';
import { Options } from 'roughjs/bin/core';

export class Ellipse extends Figure {
  draw(canvas: RoughCanvas) {
    if (!this.drawable) {
      this.drawable = canvas.ellipse(
        this.centerX,
        this.centerY,
        this.width,
        this.height,
        this.options as Options
      );
    } else {
      canvas.draw(this.drawable);
    }
  }

  clone() {
    return new Ellipse({ ...this });
  }
}
