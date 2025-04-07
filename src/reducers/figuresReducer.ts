import Figure from '../models/Figure';
import { Options } from '../types/options';
import { Point } from '../types/Point';
import { figureByPoint } from '../utils/canvas';

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
      type: 'drag';
      point: Point;
    }
  | {
      type: 'redraw';
      options: Options;
    };

type State = Figure[];

export default function figuresReducer(figures: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      return [action.figure, ...figures];
    }
    case 'select': {
      const { x, y } = action.point;
      const nextFigures = figures.map((f) =>
        f.selected ? f.clone({ selected: false }) : f
      );
      const selected = figureByPoint(figures, { x, y });
      if (!selected) return nextFigures;

      const copy = selected.clone({
        offset: { x: x - selected.x1, y: y - selected.y1 },
        position: selected.cursorPosition({ x, y }),
        selected: true,
      });
      return nextFigures.map((f) => (f.id === copy.id ? copy : f));
    }
    case 'drag': {
      const selected = figures.find((f) => f.selected);
      if (!selected) return figures;

      const copy = selected.clone();
      copy.update(action.point);
      return figures.map((f) => (f.id === copy.id ? copy : f));
    }
    case 'redraw': {
      const selected = figures.find((f) => f.selected);
      if (!selected) return figures;

      const copy = selected.clone({ options: action.options });
      return figures.map((f) => (f.id === copy.id ? copy : f));
    }
    default:
      return figures;
  }
}

export type FigureDispatchType = React.Dispatch<Action>;
