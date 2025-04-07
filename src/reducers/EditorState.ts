import Figure from '../models/Figure';
import { Mode } from '../types/Mode';
import { Options } from '../types/options';
import { Tool } from '../types/Tool';

export type EditorState = {
  mode: Mode;
  tool: Tool;
  options: Options;
  figures: Figure[];
};
