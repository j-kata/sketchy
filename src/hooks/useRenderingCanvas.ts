import { useContextSafe } from './useContextSafe';
import { EditorContext } from '../contexts/EditorContext';
import { findById, findByPoint } from '../utils/figuresCollection';
import { move, resize, select } from '../utils/figures';
import { Point } from '../types/Point';
import { CursorPosition } from '../types/CursorPosition';

export function useRenderingCanvas() {
  const { figures, selectedIds, dispatch } = useContextSafe(EditorContext);

  function selectFigure(point: Point) {
    const selected = findByPoint(figures, point);
    if (selected) {
      const copy = select(selected, point);
      if (copy.id == selectedIds[0]) {
        copy.position !== CursorPosition.IN
          ? dispatch({ type: 'resize_selected', figure: copy })
          : dispatch({ type: 'drag_selected', figure: copy });
      } else {
        dispatch({ type: 'drag_selected', figure: copy });
      }
    } else {
      dispatch({ type: 'reset_selected' });
    }
  }

  function dragFigure(point: Point) {
    const selected = findById(figures, selectedIds[0]);
    if (selected) {
      const copy = move(selected, point);
      dispatch({ type: 'drag_selected', figure: copy });
    }
  }

  function resizeFigure(point: Point) {
    const selected = findById(figures, selectedIds[0]);
    if (selected) {
      const copy = resize(selected, point);
      dispatch({ type: 'resize_selected', figure: copy });
    }
  }

  function endAction() {
    dispatch({ type: 'finish_selected' });
  }

  return { selectFigure, dragFigure, resizeFigure, endAction };
}
