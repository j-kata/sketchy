import Figure from '../entities/Figure';
import { Cursor } from '../types';

import {
  replaceElement,
  createElement,
  getElementWithPosition,
} from './elementsUtils';

type Action =
  | {
      type: 'draw';
      tool: string;
      x: number;
      y: number;
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
  selected?: Figure | null;
  cursor: Cursor;
};

export default function figureReducer(state: State, action: Action): State {
  let { history, currentStep, selected, cursor } = state;
  let elements = history[currentStep];

  switch (action.type) {
    case 'draw': {
      selected = createElement(
        action.tool,
        elements.length,
        action.x,
        action.y
      );
      history = [...history.slice(0, currentStep + 1), [...elements, selected]];
      currentStep = history.length - 1;
      break;
    }
    case 'grab': {
      ({ element: selected, cursor } = getElementWithPosition(
        action,
        elements
      ));
      if (selected) {
        history = [...history.slice(0, currentStep + 1), elements];
        currentStep = history.length - 1;
      }
      break;
    }
    case 'move': {
      selected = selected?.updateAll(action, cursor.offset, cursor.position);
      elements = replaceElement(elements, selected);
      history[currentStep] = elements;
      break;
    }
    case 'release': {
      selected = selected?.reAdjustCoords();
      elements = replaceElement(elements, selected);
      history[currentStep] = elements;
      selected = null;
      cursor = {};
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

  return { history, selected, cursor, currentStep };
}
