import { RoughCanvas } from 'roughjs/bin/canvas';
import { Element, Options, Point, Tool, CursorPosition } from '../types';
import * as Line from './Line';
import * as Rectangle from './Rectangle';
import * as Ellipse from './Ellipse';
import { Drawable } from 'roughjs/bin/core';

export function create({ x, y }: Point, tool: Tool, options: Options): Element {
  const seed = 1 + Math.random() * 200;
  return { x1: x, y1: y, x2: x, y2: y, options: { ...options, seed }, tool };
}

export function update(element: Element, point: Point): Element {
  const position = element.position ?? CursorPosition.IN;
  if (position === CursorPosition.IN) {
    return move(element, point);
  } else {
    return resize(element, point, position);
  }
}

export function move(
  element: Element,
  point: Point,
  offset: Point = { x: 0, y: 0 }
): Element {
  const x1 = point.x - offset.x;
  const y1 = point.y - offset.y;
  const x2 = x1 + width(element);
  const y2 = y1 + height(element);
  return { ...element, x1, y1, x2, y2 };
}

export function resize(
  element: Element,
  point: Point,
  position: CursorPosition = CursorPosition.RB
): Element {
  const { x1, y1, x2, y2 } = element;

  switch (position) {
    case CursorPosition.LT:
      return { ...element, x1: point.x, y1: point.y, x2, y2 };
    case CursorPosition.LB:
      return { ...element, x1: point.x, y1, x2, y2: point.y };
    case CursorPosition.RT:
      return { ...element, x1: x1, y1: point.y, x2: point.x, y2 };
    case CursorPosition.RB:
      return { ...element, x1: x1, y1: y1, x2: point.x, y2: point.y };
    default:
      return element;
  }
}

export function draw(element: Element, canvas: RoughCanvas): Drawable {
  switch (element.tool) {
    case Tool.SQUARE:
      return Rectangle.draw(element, canvas);
    case Tool.ELLIPSE:
      return Ellipse.draw(element, canvas);
    default:
      return Line.draw(element, canvas);
  }
}

export function height(element: Element): number {
  return element.y2 - element.y1;
}

export function width(element: Element): number {
  return element.x2 - element.x1;
}
