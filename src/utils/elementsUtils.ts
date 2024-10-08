import Figure from '../entities/Figure';
import Rectangle from '../entities/Rectangle';
import Line from '../entities/Line';
import Ellipse from '../entities/Ellipse';
import { Point } from '../types';

export function getElementById(id: number | null, elements: Figure[]) {
  return id === null ? null : elements.find((el) => el.id === id);
}

export function getElementWithPosition({ x, y }: Point, elements: Figure[]) {
  const cursor = { position: Figure.POSITION.OUT, offset: { x: 0, y: 0 } };
  const element = elements.find((el) => {
    cursor.position = el.cursorPosition({ x, y });
    cursor.offset = { x: x - el.x1, y: y - el.y1 };

    return cursor.position != Figure.POSITION.OUT;
  });
  return { element, cursor };
}

export function replaceElement(elements: Figure[], element?: Figure | null) {
  return element == null
    ? elements
    : elements.map((el) => (el.id == element.id ? element : el));
}

export function createElement(type: string, id: number, x: number, y: number) {
  const [x1, y1, x2, y2] = [x, y, x, y];
  switch (type) {
    case 'rectangle': {
      return new Rectangle({ id, x1, y1, x2, y2 });
    }
    case 'ellipse': {
      return new Ellipse({ id, x1, y1, x2, y2 });
    }
    default: {
      return new Line({ id, x1, y1, x2, y2 });
    }
  }
}

export function cursorStyle(position?: string): string {
  switch (position) {
    case Figure.POSITION.RT:
    case Figure.POSITION.LB: {
      return 'nesw-resize';
    }
    case Figure.POSITION.LT:
    case Figure.POSITION.RB: {
      return 'nwse-resize';
    }
    case Figure.POSITION.IN: {
      return 'move';
    }
    default: {
      return 'default';
    }
  }
}
