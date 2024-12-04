import { RoughCanvas } from 'roughjs/bin/canvas';
import { Element } from '../types';

export function draw(element: Element, canvas: RoughCanvas) {
  const { x1, y1, x2, y2, options } = element;
  return canvas.line(x1, y1, x2, y2, options);
}
