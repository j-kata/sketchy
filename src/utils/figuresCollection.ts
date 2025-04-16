import { Figure } from '../types/Figure';
import { Point } from '../types/Point';
import { pointWithin } from './figures';

export function findByPoint(figures: Figure[], point: Point) {
  return figures.find((f) => pointWithin(f, point));
}

export function findById(figures: Figure[], id: number) {
  return figures.find((f) => f.id == id);
}
