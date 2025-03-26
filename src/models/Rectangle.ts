import { RoughCanvas } from 'roughjs/bin/canvas';
import Figure from './Figure';

export class Rectangle extends Figure {
  draw(canvas: RoughCanvas) {
    if (!this.drawable) {
      this.drawable = canvas.rectangle(
        this.x1,
        this.y1,
        this.width,
        this.height,
        this.roughOptions
      );
    } else {
      canvas.draw(this.drawable);
    }
  }

  clone() {
    return new Rectangle({ ...this });
  }
}
