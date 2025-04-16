import { Figure } from '../types/Figure';
import { Point } from '../types/Point';
import { Options } from '../types/options';
import { Tool } from '../types/Tool';

export type EditorAction =
  | {
      type: 'add_current';
      figure: Figure;
    }
  | {
      type: 'update_current';
      figure: Figure;
    }
  | {
      type: 'end_current';
    }
  | {
      type: 'reset_selected';
    }
  | {
      type: 'drag_selected';
      figure: Figure;
    }
  | {
      type: 'resize_selected';
      figure: Figure;
    }
  | {
      type: 'finish_selected';
    }
  | {
      type: 'change_options';
      options: Options;
    }
  | {
      type: 'change_tool';
      tool: Tool;
    };
