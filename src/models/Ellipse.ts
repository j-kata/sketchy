import { RoughCanvas } from 'roughjs/bin/canvas';
import { Rectangle } from './Rectangle';
import { Point } from '../shared/types';
import { PartialFigureProps } from './FigureProps';
export class Ellipse extends Rectangle {
  draw(canvas: RoughCanvas, offset: Point, scale: number) {
    canvas.ellipse(
      this.centerX * scale + offset.x,
      this.centerY * scale + offset.y,
      this.width * scale,
      this.height * scale,
      this.roughOptions
    );
  }

  clone(values: PartialFigureProps = {}) {
    return new Ellipse({ ...this, ...values });
  }
}
