import { Mode } from '../types/Mode';
import { Tool } from '../types/Tool';
import { EditorAction } from './EditorAction';
import { EditorState } from './EditorState';

export default function editorReducer(
  state: EditorState,
  action: EditorAction
): EditorState {
  switch (action.type) {
    case 'add_current': {
      return {
        ...state,
        mode: Mode.DRAWING,
        current: action.figure,
      };
    }
    case 'update_current': {
      return {
        ...state,
        current: action.figure,
      };
    }
    case 'end_current': {
      return {
        ...state,
        mode: Mode.SELECT,
        tool: Tool.SELECT,
        figures: [...state.figures, state.current!],
        selectedIds: [state.current!.id],
        current: null,
      };
    }
    case 'drag_selected': {
      return {
        ...state,
        mode: Mode.DRAGGING,
        tool: Tool.SELECT,
        selectedIds: [action.figure.id],
        figures: state.figures.map((f) =>
          f.id == action.figure.id ? action.figure : f
        ),
      };
    }
    case 'resize_selected': {
      return {
        ...state,
        mode: Mode.RESIZING,
        tool: Tool.SELECT,
        selectedIds: [action.figure.id],
        figures: state.figures.map((f) =>
          f.id == action.figure.id ? action.figure : f
        ),
      };
    }
    case 'finish_selected': {
      return {
        ...state,
        mode: state.selectedIds.length ? Mode.SELECT : Mode.IDLE,
        tool: Tool.SELECT,
      };
    }
    case 'reset_selected': {
      return {
        ...state,
        mode: Mode.IDLE,
        tool: Tool.SELECT,
        selectedIds: [],
      };
    }
    case 'change_options': {
      return {
        ...state,
        options: action.options,
      };
    }
    case 'change_tool': {
      if (action.tool == Tool.SELECT) {
        return {
          ...state,
          mode: Mode.IDLE,
          tool: Tool.SELECT,
        };
      } else {
        return {
          ...state,
          mode: Mode.READY_TO_DRAW,
          tool: action.tool,
          selectedIds: [],
        };
      }
    }
    default:
      return state;
  }
}

export type EditorDispatchType = React.Dispatch<EditorAction>;
