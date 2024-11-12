import Rectangle from './Rectangle';
import { RoughCanvas } from 'roughjs/bin/canvas';

export default class Ellipse extends Rectangle {
  clone(figure: Ellipse = this) {
    return new Ellipse(figure);
  }

  draw(canvas: RoughCanvas) {
    if (!this.drawable) {
      const width = this.width();
      const height = this.height();
      const centerX = this.x1 + width / 2;
      const centerY = this.y1 + height / 2;
      this.drawable = canvas.ellipse(
        centerX,
        centerY,
        width,
        height,
        this.options
      );
    } else {
      canvas.draw(this.drawable);
    }
  }
}
