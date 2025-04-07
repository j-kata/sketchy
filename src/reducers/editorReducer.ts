import Figure from '../models/Figure';
import { Mode } from '../types/Mode';
import { Options } from '../types/options';
import { Point } from '../types/Point';
import { Tool } from '../types/Tool';
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
      type: 'change_options';
      options: Options;
    }
  | {
      type: 'change_tool';
      tool: Tool;
    }
  | {
      type: 'unselect';
    };

type State = {
  mode: Mode;
  tool: Tool;
  options: Options;
  figures: Figure[];
};

export default function editorReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      return {
        ...state,
        mode: Mode.SELECT,
        tool: Tool.SELECT,
        figures: [...state.figures, action.figure],
      };
    }
    case 'select': {
      const { x, y } = action.point;
      const { figures } = state;

      const nextFigures = figures.map((f) =>
        f.selected ? f.clone({ selected: false }) : f
      );
      const selected = figureByPoint(figures, { x, y });
      if (!selected)
        return {
          ...state,
          mode: Mode.IDLE,
          figures: nextFigures,
        };

      const copy = selected.clone({
        offset: { x: x - selected.x1, y: y - selected.y1 },
        position: selected.cursorPosition({ x, y }),
        selected: true,
      });
      return {
        ...state,
        mode: Mode.SELECT,
        figures: nextFigures.map((f) => (f.id === copy.id ? copy : f)),
      };
    }
    case 'drag': {
      const { figures } = state;
      const selected = figures.find((f) => f.selected);
      if (!selected)
        return {
          ...state,
          figures: figures,
        };

      const copy = selected.clone();
      copy.update(action.point);
      return {
        ...state,
        figures: figures.map((f) => (f.id === copy.id ? copy : f)),
      };
    }
    case 'change_options': {
      const { figures } = state;

      const selected = figures.find((f) => f.selected);
      if (!selected)
        return {
          ...state,
          options: action.options,
        };

      const copy = selected.clone({ options: action.options });
      return {
        ...state,
        options: action.options,
        figures: figures.map((f) => (f.id === copy.id ? copy : f)),
      };
    }
    case 'change_tool': {
      const { figures } = state;

      if (action.tool !== Tool.SELECT) {
        return {
          ...state,
          mode: Mode.DRAW,
          tool: action.tool,
          figures: figures.map((f) =>
            f.selected ? f.clone({ selected: false }) : f
          ),
        };
      }
      return {
        ...state,
        mode: Mode.IDLE,
        tool: action.tool,
      };
    }
    default:
      return state;
  }
}

export type EditorDispatchType = React.Dispatch<Action>;
