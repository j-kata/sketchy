import Figure from '../models/Figure';
import { Point } from '../types/Point';
import { Options } from '../types/options';
import { Tool } from '../types/Tool';

export type EditorAction =
  | {
      type: 'add_figure';
      figure: Figure;
    }
  | {
      type: 'select_figure';
      point: Point;
    }
  | {
      type: 'drag_figure';
      point: Point;
    }
  | {
      type: 'change_options';
      options: Options;
    }
  | {
      type: 'change_tool';
      tool: Tool;
    };
