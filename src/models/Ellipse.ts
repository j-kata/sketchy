import { RoughCanvas } from 'roughjs/bin/canvas';
import { Rectangle } from './Rectangle';
export class Ellipse extends Rectangle {
  draw(canvas: RoughCanvas) {
    if (!this.drawable) {
      this.drawable = canvas.ellipse(
        this.centerX,
        this.centerY,
        this.width,
        this.height,
        this.roughOptions
      );
    } else {
      canvas.draw(this.drawable);
    }
  }

  clone() {
    return new Ellipse({ ...this });
  }
}
