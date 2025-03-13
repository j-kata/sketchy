import Figure from '../entities/Figure';
import { Options, Tool } from '../shared/types';

import {
  replaceElement,
  createElement,
  getSelectedElement,
  getElementByPoint,
  replaceHistory,
} from './canvasUtils';

type Action =
  | {
      type: 'draw';
      tool: Tool;
      x: number;
      y: number;
      options: Options;
    }
  | {
      type: 'move' | 'grab';
      x: number;
      y: number;
    }
  | {
      type: 'release' | 'undo' | 'redo' | 'clear';
    };

type State = {
  history: Array<Figure[]>;
  currentStep: number;
};

export default function figureReducer(state: State, action: Action): State {
  let { history, currentStep } = state;
  let elements = history[currentStep];

  switch (action.type) {
    case 'draw': {
      const element = createElement(
        elements,
        action.tool,
        action,
        action.options
      );
      elements = [...elements, element];
      history = replaceHistory(history, elements, currentStep + 1);
      currentStep++;
      break;
    }
    case 'grab': {
      const element = getElementByPoint(elements, action);
      if (element) {
        elements = replaceElement(elements, element.grab(action));
        history = replaceHistory(history, elements, currentStep + 1);
        currentStep++;
      }
      break;
    }
    case 'move': {
      const element = getSelectedElement(elements);
      if (element) {
        elements = replaceElement(elements, element.update(action));
        history = replaceHistory(history, elements, currentStep);
      }
      break;
    }
    case 'release': {
      const element = getSelectedElement(elements);
      if (element) {
        elements = replaceElement(elements, element.release());
        history = replaceHistory(history, elements, currentStep);
      }
      break;
    }
    case 'undo': {
      if (currentStep > 0) currentStep--;
      break;
    }
    case 'redo': {
      if (currentStep < history.length - 1) currentStep++;
      break;
    }
    case 'clear': {
      currentStep = 0;
      break;
    }
  }

  return { history, currentStep };
}
