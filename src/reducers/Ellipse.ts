import { RoughCanvas } from 'roughjs/bin/canvas';
import { Element } from '../types';
import * as Figure from './canvasUtils';

export function draw(element: Element, canvas: RoughCanvas) {
  const { x1, y1, options } = element;
  const width = Figure.width(element);
  const height = Figure.height(element);
  const centerX = x1 + width / 2;
  const centerY = y1 + height / 2;
  return canvas.ellipse(centerX, centerY, width, height, options);
}
