import { Drawable } from 'roughjs/bin/core';

import Figure, { FigureProps } from './Figure';
import rough from 'roughjs';
import Rectangle from './Rectangle';

export default class Ellipse extends Rectangle {
  drawable: Drawable;

  constructor(options: FigureProps) {
    super(options);
    const { x1, y1 } = options;
    const width = this.width();
    const height = this.height();
    const centerX = x1 + width / 2;
    const centerY = y1 + height / 2;
    this.drawable = rough.generator().ellipse(centerX, centerY, width, height);
  }

  clone(figure: Figure = this) {
    return new Ellipse(figure);
  }
}
