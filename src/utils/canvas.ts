import Figure from '../models/Figure';
import { CursorPosition } from '../types/CursorPosition';
import { Point } from '../types/Point';

const MAX_DISTANCE = 5;

export function realCoords(point: Point, offset: Point, scale: number) {
  return {
    x: (point.x - offset.x) / scale,
    y: (point.y - offset.y) / scale,
  };
}

export function isNearPoint(point1: Point, point2: Point): boolean {
  return (
    Math.abs(point1.x - point2.x) < MAX_DISTANCE &&
    Math.abs(point1.y - point2.y) < MAX_DISTANCE
  );
}

export function isNearLine(point: Point, startPoint: Point, endPoint: Point) {
  const offset =
    distance(startPoint, endPoint) -
    distance(startPoint, point) -
    distance(endPoint, point);
  return Math.abs(offset) < 1;
}

export function distance(a: Point, b: Point): number {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
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
