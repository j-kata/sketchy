import Figure from '../entities/Figure';
import Rectangle from '../entities/Rectangle';
import Line from '../entities/Line';
import Ellipse from '../entities/Ellipse';
import { Point, Tool } from '../types';

export function createElement(
  elements: Figure[],
  type: string,
  { x, y }: Point
) {
  const [x1, y1, x2, y2] = [x, y, x, y];
  const id = nextIndex(elements);

  switch (type) {
    case Tool.SQUARE: {
      return new Rectangle({ id, x1, y1, x2, y2 });
    }
    case Tool.ELLIPSE: {
      return new Ellipse({ id, x1, y1, x2, y2 });
    }
    default: {
      return new Line({ id, x1, y1, x2, y2 });
    }
  }
}

export function getElementByPoint(elements: Figure[], point: Point) {
  return elements.find((el) => el.isIntersected(point));
}

export function getElementPosition(elements: Figure[], point: Point) {
  let position = Figure.POSITION.OUT;
  const element = elements.find((el) => {
    position = el.cursorPosition(point);
    return position !== Figure.POSITION.OUT;
  });
  return element ? position : Figure.POSITION.OUT;
}

export function getSelectedElement(elements: Figure[]) {
  return elements.find((el) => el.selected);
}

export function replaceElement(elements: Figure[], element?: Figure | null) {
  return element == null
    ? elements
    : elements.map((el) => (el.id == element.id ? element : el));
}

export function replaceHistory(
  history: Array<Figure[]>,
  elements: Figure[],
  step: number
) {
  return [...history.slice(0, step), elements];
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

function nextIndex(elements: Figure[]) {
  const length = elements.length;
  return length === 0 ? 0 : elements[length - 1].id + 1;
}
