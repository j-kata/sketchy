import Figure from '../../models/Figure';
import { Point } from '../../shared/types';
import { elementByPoint } from './utils';

type Action =
  | {
      type: 'add';
      figure: Figure;
    }
  | {
      type: 'select';
      point: Point;
    }
  | {
      type: 'move';
      point: Point;
    };

type State = Figure[];

export default function figuresReducer(figures: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      return [action.figure, ...figures];
    }
    case 'select': {
      const nextFigures = figures.map((f) =>
        f.selected ? f.clone({ selected: false }) : f
      );
      const { x, y } = action.point;
      const selected = elementByPoint(figures, { x, y });
      if (selected) {
        const copy = selected.clone({
          offset: { x: x - selected.x1, y: y - selected.y1 },
          position: selected.cursorPosition({ x, y }),
          selected: true,
        });
        return nextFigures.map((f) => (f.id === copy.id ? copy : f));
      }
      return nextFigures;
    }
    case 'move': {
      const selected = figures.find((f) => f.selected);
      if (selected) {
        const copy = selected.clone();
        copy.update(action.point);
        return figures.map((f) => (f.id === copy.id ? copy : f));
      }
      return figures;
    }
    default:
      return figures;
  }
}

export type FigureDispatchType = React.Dispatch<Action>;
