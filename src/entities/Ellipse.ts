import { Options } from 'roughjs/bin/core';
import { FigureOptions } from './Figure';
import Rectangle from './Rectangle';
import { RoughCanvas } from 'roughjs/bin/canvas';

export default class Ellipse extends Rectangle {
  clone(figure: Ellipse = this) {
    return new Ellipse(figure);
  }

  draw(canvas: RoughCanvas, options: FigureOptions = {}) {
    const width = this.width();
    const height = this.height();
    const centerX = this.x1 + width / 2;
    const centerY = this.y1 + height / 2;
    canvas.ellipse(centerX, centerY, width, height, options as Options);
  }
}
