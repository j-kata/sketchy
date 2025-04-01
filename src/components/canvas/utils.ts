import Figure from '../../models/Figure';
import { CursorPosition, Point } from '../../shared/types';

export function elementByPoint(elements: Figure[], point: Point) {
  return elements.find((el) => el.isWithinElement(point));
}

export function cursorByPoint(elements: Figure[], point: Point) {
  const element = elementByPoint(elements, point);
  if (element) {
    const position = element.cursorPosition(point);
    return cursorStyle(position);
  } else {
    return 'default';
  }
}

export function positionOnElement(elements: Figure[], point: Point) {
  let cursorPosition = CursorPosition.OUT;
  elements.find((el) => {
    cursorPosition = el.cursorPosition(point);
    return cursorPosition !== CursorPosition.OUT;
  });
  return cursorPosition;
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

export function realCoords(point: Point, offset: Point, scale: number) {
  return {
    x: (point.x - offset.x) / scale,
    y: (point.y - offset.y) / scale,
  };
}
