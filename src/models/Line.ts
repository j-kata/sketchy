import { RoughCanvas } from 'roughjs/bin/canvas';
import Figure from './Figure';

export class Line extends Figure {
  draw(canvas: RoughCanvas) {
    if (!this.drawable) {
      this.drawable = canvas.line(
        this.x1,
        this.y1,
        this.x2,
        this.y2,
        this.roughOptions
      );
    } else {
      canvas.draw(this.drawable);
    }
  }

  clone() {
    return new Line({ ...this });
  }
}
