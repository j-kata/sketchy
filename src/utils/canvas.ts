import Figure from '../models/Figure';
import { CursorPosition } from '../types/CursorPosition';
import { Point } from '../types/Point';

export function realCoords(point: Point, offset: Point, scale: number) {
  return {
    x: (point.x - offset.x) / scale,
    y: (point.y - offset.y) / scale,
  };
}

export function figureByPoint(elements: Figure[], point: Point) {
  return elements.find((el) => el.isWithinElement(point));
}

export function cursorByPoint(elements: Figure[], point: Point) {
  const element = figureByPoint(elements, point);
  if (element) {
    const position = element.cursorPosition(point);
    return cursorStyle(position);
  } else {
    return 'default';
  }
}

export function cursorStyle(position: CursorPosition): string {
  switch (position) {
    case CursorPosition.RT:
    case CursorPosition.LB: {
      return 'nesw-resize';
    }
    case CursorPosition.LT:
    case CursorPosition.RB: {
      return 'nwse-resize';
    }
    case CursorPosition.L:
    case CursorPosition.R: {
      return 'ew-resize';
    }
    case CursorPosition.T:
    case CursorPosition.B: {
      return 'ns-resize';
    }
    case CursorPosition.IN: {
      return 'move';
    }
    default: {
      return 'default';
    }
  }
}
