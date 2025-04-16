import { RoughCanvas } from 'roughjs/bin/canvas';
import { CursorPosition } from '../types/CursorPosition';
import { Figure, toolToFigureTypeMap } from '../types/Figure';
import { Options } from '../types/options';
import { Point } from '../types/Point';
import { Tool } from '../types/Tool';
import { isNearLine, isNearPoint } from './canvas';

const ElementTypes = {
  line: {
    draw: drawLine,
    pointWithin: pointWithinLine,
    cursorPosition: cursorPositionLine,
  },
  ellipse: {
    draw: drawEllipse,
    pointWithin: pointWithinRectangle,
    cursorPosition: cursorPositionRectangle,
  },
  rectangle: {
    draw: drawRectangle,
    pointWithin: pointWithinRectangle,
    cursorPosition: cursorPositionRectangle,
  },
};

export function createFigure(
  id: number,
  tool: Tool,
  options: Options,
  point: Point
): Figure | null {
  const type = toolToFigureTypeMap[tool];
  if (!type) return null;

  return {
    id,
    type,
    point1: point,
    point2: point,
    options: { ...options, seed: generateSeed() },
    position: CursorPosition.RB,
    offset: { x: 0, y: 0 },
  };
}

export function select(figure: Figure, { x, y }: Point) {
  const offset = { x: x - figure.point1.x, y: y - figure.point1.y };
  const position = ElementTypes[figure.type]?.cursorPosition(figure, { x, y });
  return { ...figure, offset, position };
}

export function update(figure: Figure, point: Point) {
  if (figure.position === CursorPosition.IN) {
    return move(figure, point);
  } else {
    return resize(figure, point);
  }
}

export function move(figure: Figure, point: Point) {
  const x1 = point.x - figure.offset.x;
  const y1 = point.y - figure.offset.y;
  const x2 = x1 + width(figure);
  const y2 = y1 + height(figure);
  const point1 = { x: x1, y: y1 };
  const point2 = { x: x2, y: y2 };
  return { ...figure, point1, point2 };
}

export function resize(figure: Figure, point: Point) {
  let { point1, point2, position } = figure;
  switch (position) {
    case CursorPosition.L: {
      point1 = { x: point.x, y: point1.y };
      break;
    }
    case CursorPosition.R: {
      point2 = { x: point.x, y: point2.y };
      break;
    }
    case CursorPosition.T: {
      point1 = { x: point1.x, y: point.y };
      break;
    }
    case CursorPosition.B: {
      point2 = { x: point2.x, y: point.y };
      break;
    }
    case CursorPosition.LT: {
      point1 = point;
      break;
    }
    case CursorPosition.LB: {
      point1 = { x: point.x, y: point1.y };
      point2 = { x: point2.x, y: point.y };
      break;
    }
    case CursorPosition.RT: {
      point1 = { x: point1.x, y: point.y };
      point2 = { x: point.x, y: point2.y };
      break;
    }
    case CursorPosition.RB: {
      point2 = point;
      break;
    }
  }
  return { ...figure, point1, point2 };
}

export function draw(
  figure: Figure,
  canvas: RoughCanvas,
  offset: Point,
  scale: number
) {
  ElementTypes[figure.type]?.draw(figure, canvas, offset, scale);
}

export function pointWithin(figure: Figure, point: Point) {
  return ElementTypes[figure.type]?.pointWithin(figure, point);
}

export function cursorPosition(figure: Figure, point: Point) {
  return ElementTypes[figure.type]?.cursorPosition(figure, point);
}

function generateSeed() {
  return 1 + Math.random() * 200;
}

function width(figure: Figure) {
  return figure.point2.x - figure.point1.x;
}

function height(figure: Figure) {
  return figure.point2.y - figure.point1.y;
}

function center(figure: Figure) {
  return {
    x: (figure.point1.x + figure.point2.x) / 2,
    y: (figure.point1.y + figure.point2.y) / 2,
  };
}

function boundaries(figure: Figure) {
  const minX = Math.min(figure.point1.x, figure.point2.x);
  const maxX = Math.max(figure.point1.x, figure.point2.x);
  const minY = Math.min(figure.point1.y, figure.point2.y);
  const maxY = Math.max(figure.point1.y, figure.point2.y);
  return { minX, minY, maxX, maxY };
}

function drawLine(
  figure: Figure,
  canvas: RoughCanvas,
  offset: Point,
  scale: number
) {
  const { point1, point2, options } = figure;
  canvas.line(
    point1.x * scale + offset.x,
    point1.y * scale + offset.y,
    point2.x * scale + offset.x,
    point2.y * scale + offset.y,
    options
  );
}

function drawEllipse(
  figure: Figure,
  canvas: RoughCanvas,
  offset: Point,
  scale: number
) {
  const w = width(figure);
  const h = height(figure);
  const { x: centerX, y: centerY } = center(figure);
  canvas.ellipse(
    centerX * scale + offset.x,
    centerY * scale + offset.y,
    w * scale,
    h * scale,
    figure.options
  );
}

function drawRectangle(
  figure: Figure,
  canvas: RoughCanvas,
  offset: Point,
  scale: number
) {
  const w = width(figure);
  const h = height(figure);
  const { point1, options } = figure;
  canvas.rectangle(
    point1.x * scale + offset.x,
    point1.y * scale + offset.y,
    w * scale,
    h * scale,
    options
  );
}

function pointWithinLine(figure: Figure, point: Point) {
  return isNearLine(point, figure.point1, figure.point2);
}

function pointWithinRectangle(figure: Figure, { x, y }: Point) {
  const { minX, minY, maxX, maxY } = boundaries(figure);
  return x >= minX && x <= maxX && y >= minY && y <= maxY;
}

function cursorPositionLine(figure: Figure, point: Point) {
  if (isNearPoint(point, figure.point1)) {
    return CursorPosition.LT;
  } else if (isNearPoint(point, figure.point2)) {
    return CursorPosition.RB;
  } else if (!pointWithinLine(figure, point)) {
    return CursorPosition.OUT;
  } else {
    return CursorPosition.IN;
  }
}

function cursorPositionRectangle(figure: Figure, point: Point): CursorPosition {
  const { point1, point2 } = figure;
  if (isNearPoint(point, point1)) {
    return CursorPosition.LT;
  } else if (isNearPoint(point, { x: point1.x, y: point2.y })) {
    return CursorPosition.LB;
  } else if (isNearPoint(point, { x: point2.x, y: point1.y })) {
    return CursorPosition.RT;
  } else if (isNearPoint(point, { x: point2.x, y: point2.y })) {
    return CursorPosition.RB;
  } else if (
    isNearLine(
      point,
      { x: point1.x, y: point1.y },
      { x: point1.x, y: point2.y }
    )
  ) {
    return CursorPosition.L;
  } else if (
    isNearLine(
      point,
      { x: point2.x, y: point1.y },
      { x: point2.x, y: point2.y }
    )
  ) {
    return CursorPosition.R;
  } else if (
    isNearLine(
      point,
      { x: point1.x, y: point1.y },
      { x: point2.x, y: point1.y }
    )
  ) {
    return CursorPosition.T;
  } else if (
    isNearLine(
      point,
      { x: point1.x, y: point2.y },
      { x: point2.x, y: point2.y }
    )
  ) {
    return CursorPosition.B;
  } else if (!pointWithinRectangle(figure, point)) {
    return CursorPosition.OUT;
  } else {
    return CursorPosition.IN;
  }
}
