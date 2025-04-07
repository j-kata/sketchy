import { Mode } from '../types/Mode';
import { Tool } from '../types/Tool';
import { figureByPoint } from '../utils/canvas';
import { replaceFigure, unselectAll } from '../utils/canvas';
import { EditorAction } from './EditorAction';
import { EditorState } from './EditorState';

export default function editorReducer(
  state: EditorState,
  action: EditorAction
): EditorState {
  switch (action.type) {
    case 'add_figure': {
      return {
        ...state,
        mode: Mode.SELECT,
        tool: Tool.SELECT,
        figures: [...state.figures, action.figure],
      };
    }
    case 'select_figure': {
      const figures = unselectAll(state.figures);
      const selected = figureByPoint(figures, action.point);
      const copy = selected ? selected.select(action.point) : null;

      return {
        ...state,
        mode: selected ? Mode.SELECT : Mode.IDLE,
        figures: replaceFigure(figures, copy),
      };
    }
    case 'drag_figure': {
      const selected = state.figures.find((f) => f.selected);
      const copy = selected ? selected.update(action.point) : null;

      return {
        ...state,
        figures: replaceFigure(state.figures, copy),
      };
    }

    case 'change_options': {
      const { options } = action;
      const selected = state.figures.find((f) => f.selected);
      const copy = selected ? selected.clone({ options }) : null;
      return {
        ...state,
        options: action.options,
        figures: replaceFigure(state.figures, copy),
      };
    }
    case 'change_tool': {
      const drawing = action.tool !== Tool.SELECT;
      return {
        ...state,
        mode: drawing ? Mode.DRAW : Mode.IDLE,
        tool: action.tool,
        figures: drawing ? unselectAll(state.figures) : state.figures,
      };
    }
    default:
      return state;
  }
}

export type EditorDispatchType = React.Dispatch<EditorAction>;
