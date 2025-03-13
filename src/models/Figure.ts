import { CursorPosition, Point } from '../shared/types';
import { FigureInterface } from './FigureIterface';
import { Drawable } from 'roughjs/bin/core';
import { FigureProps } from './FigureProps';
import { RoughCanvas } from 'roughjs/bin/canvas';
import { Line } from './Line';
import { Options } from 'roughjs/bin/core';

export default abstract class Figure implements FigureInterface {
  id: number;
  point1: Point;
  point2: Point;
  selected: boolean;
  position: CursorPosition;
  offset: Point;
  options: Options;
  drawable: Drawable | null;
  INITIAL_OFFSET = Object.freeze({ x: 0, y: 0 });
  INITIAL_OPTIONS = Object.freeze({ seed: 1 + Math.random() * 200 });

  constructor(props: FigureProps) {
    this.id = 0;
    this.point1 = props.point1;
    this.point2 = props.point2 ?? props.point1;
    this.selected = true;
    this.position = CursorPosition.RB;
    this.offset = this.INITIAL_OFFSET;
    this.options = { ...props.options, ...this.INITIAL_OPTIONS };
    this.drawable = null;
  }

  get x1() {
    return this.point1.x;
  }
  get y1() {
    return this.point1.y;
  }
  get x2() {
    return this.point2.x;
  }
  get y2() {
    return this.point2.y;
  }

  get centerX() {
    return this.x1 + this.width / 2;
  }

  get centerY() {
    return this.y1 + this.height / 2;
  }

  get width() {
    return this.x2 - this.x1;
  }

  get height() {
    return this.y2 - this.y1;
  }

  resize(point: Point, position: CursorPosition = CursorPosition.RB) {
    switch (position) {
      case CursorPosition.LT: {
        this.point1 = point;
        break;
      }
      case CursorPosition.LB: {
        this.point1 = { x: point.x, y: this.y1 };
        this.point2 = { x: this.x2, y: point.y };
        break;
      }
      case CursorPosition.RT: {
        this.point1 = { x: this.x1, y: point.y };
        this.point2 = { x: point.x, y: this.y2 };
        break;
      }
      case CursorPosition.RB: {
        this.point2 = point;
        break;
      }
    }
    //this.clone({...this, point1, point2})
  }

  abstract draw(canvas: RoughCanvas): void;
  abstract clone(): Figure;
}
