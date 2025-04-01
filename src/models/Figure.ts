import { CursorPosition, Point } from '../shared/types';
import { FigureInterface } from './FigureIterface';
import { FigureProps, PartialFigureProps } from './FigureProps';
import { RoughCanvas } from 'roughjs/bin/canvas';
import { Options } from '../components/options/types';

export default abstract class Figure implements FigureInterface {
  id: number;
  point1: Point;
  point2: Point;
  selected: boolean;
  position: CursorPosition;
  offset: Point;
  seed: number;
  options: Options;
  SEED = 1 + Math.random() * 200;
  OFFSET = Object.freeze({ x: 0, y: 0 });
  MAX_DISTANCE = 5;
  static counter = 0;
  static nextID = () => Figure.counter++;

  constructor(props: FigureProps) {
    this.id = props.id || Figure.nextID();
    this.selected = props.selected ?? true;
    this.point1 = props.point1;
    this.point2 = props.point2 ?? props.point1;
    this.options = { ...props.options };
    this.position = props.position || CursorPosition.RB;
    this.seed = props.seed || this.SEED;
    this.offset = props.offset || this.OFFSET;
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

  get roughOptions() {
    return {
      ...this.options,
      strokeWidth: parseInt(this.options.strokeWidth),
      seed: this.seed,
    };
  }

  update(coords: Point) {
    if (this.position === CursorPosition.IN) {
      return this.move(coords, this.offset);
    } else {
      return this.resize(coords, this.position);
    }
  }

  move(point: Point, offset: Point = { x: 0, y: 0 }) {
    const x1 = point.x - offset.x;
    const y1 = point.y - offset.y;
    const x2 = x1 + this.width;
    const y2 = y1 + this.height;
    this.point1 = { x: x1, y: y1 };
    this.point2 = { x: x2, y: y2 };
  }

  resize(point: Point, position: CursorPosition = CursorPosition.RB) {
    switch (position) {
      case CursorPosition.L: {
        this.point1 = { x: point.x, y: this.y1 };
        break;
      }
      case CursorPosition.R: {
        this.point2 = { x: point.x, y: this.y2 };
        break;
      }
      case CursorPosition.T: {
        this.point1 = { x: this.x1, y: point.y };
        break;
      }
      case CursorPosition.B: {
        this.point2 = { x: this.x2, y: point.y };
        break;
      }
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

  protected isNearPoint(point1: Point, point2: Point): boolean {
    return (
      Math.abs(point1.x - point2.x) < this.MAX_DISTANCE &&
      Math.abs(point1.y - point2.y) < this.MAX_DISTANCE
    );
  }

  protected isNearLine(point: Point, startPoint: Point, endPoint: Point) {
    const offset =
      this.distance(startPoint, endPoint) -
      this.distance(startPoint, point) -
      this.distance(endPoint, point);
    return Math.abs(offset) < 1;
  }

  protected distance(a: Point, b: Point): number {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }

  abstract draw(canvas: RoughCanvas, offset: Point, scale: number): void;
  abstract clone(values?: PartialFigureProps): Figure;
  abstract isWithinElement(point: Point): boolean;
  abstract cursorPosition(point: Point): CursorPosition;
}
