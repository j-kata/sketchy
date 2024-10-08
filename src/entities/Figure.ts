import { Drawable } from 'roughjs/bin/core';
import { Point, Position } from '../types';

export interface BasicFigure extends Position {
  id: number;
}
export default abstract class Figure {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;

  abstract drawable: Drawable;

  static POSITION = {
    LT: 'LEFT_TOP',
    LB: 'LEFT_BOTTOM',
    RT: 'RIGHT_TOP',
    RB: 'RIGHT_BOTTOM',
    OUT: 'OUTSIDE',
    IN: 'INSIDE',
  };

  constructor({ id, x1, x2, y1, y2 }: BasicFigure) {
    this.id = id;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  updateAll(
    coords: Point,
    offset: Point = { x: 0, y: 0 },
    position: string = Figure.POSITION.RB
  ) {
    if (position === Figure.POSITION.IN) {
      return this.updatePosition(coords, offset);
    } else {
      return this.updateCoords(coords, position);
    }
  }

  updatePosition(coords: Point, offset: Point = { x: 0, y: 0 }): Figure {
    const x1 = coords.x - offset.x;
    const y1 = coords.y - offset.y;
    const x2 = x1 + this.width();
    const y2 = y1 + this.height();
    return this.clone({ ...this, x1, y1, x2, y2 });
  }

  updateCoords(coords: Point, position: string = Figure.POSITION.RB) {
    const { x1, y1, x2, y2 } = this;
    let newPosition = { x1, y1, x2, y2 };

    switch (position) {
      case Figure.POSITION.LT: {
        newPosition = { x1: coords.x, y1: coords.y, x2, y2 };
        break;
      }
      case Figure.POSITION.LB: {
        newPosition = { x1: coords.x, y1, x2, y2: coords.y };
        break;
      }
      case Figure.POSITION.RT: {
        newPosition = { x1: x1, y1: coords.y, x2: coords.x, y2 };
        break;
      }
      case Figure.POSITION.RB: {
        newPosition = { x1: x1, y1: y1, x2: coords.x, y2: coords.y };
        break;
      }
    }
    return this.clone({ ...this, ...newPosition });
  }

  reAdjustCoords(): Figure {
    const coords = this.orderCoords();
    return this.clone({ ...this, ...coords });
  }

  height(): number {
    return this.y2 - this.y1;
  }

  width(): number {
    return this.x2 - this.x1;
  }

  protected isNearPoint(point1: Point, point2: Point): boolean {
    return (
      Math.abs(point1.x - point2.x) < 5 && Math.abs(point1.y - point2.y) < 5
    );
  }

  abstract clone(figure?: Figure): Figure;
  abstract isWithinElement(coords: Point): boolean;
  abstract cursorPosition(coords: Point): string;
  protected abstract orderCoords(): Position;
}
