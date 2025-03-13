import { RoughCanvas } from 'roughjs/bin/canvas';
import { Element } from '../shared/types';
import * as Figure from './canvasUtils';

export function draw(element: Element, canvas: RoughCanvas) {
  const { x1, y1, options } = element;
  return canvas.rectangle(
    x1,
    y1,
    Figure.width(element),
    Figure.height(element),
    options
  );
}
