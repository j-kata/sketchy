import { useState } from 'react';
import { EditorContext } from '../contexts/EditorContext';
import { Point } from '../types/Point';
import { useContextSafe } from './useContextSafe';
import { createFigure, resize } from '../utils/figures';

export function useDrawingCanvas() {
  const [id, setId] = useState<number>(0);

  const { tool, options, current, dispatch } = useContextSafe(EditorContext);

  function startDrawing(point: Point) {
    const figure = createFigure(id, tool, options, point);
    dispatch({ type: 'add_current', figure });
    setId(id + 1);
  }

  function updateDrawing(point: Point) {
    if (!current) return;

    const figure = resize(current, point);
    dispatch({ type: 'update_current', figure: figure });
  }

  function endDrawing() {
    dispatch({ type: 'end_current' });
  }

  return { startDrawing, updateDrawing, endDrawing };
}
