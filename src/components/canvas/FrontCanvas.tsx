import { MouseEvent, useState, useEffect, useRef } from 'react';
import rough from 'roughjs';

import Figure from '../../models/Figure';
import { FigureFactory } from '../../models/FigureFactory';
import { Mode } from '../../types/Mode';
import { cursorByPoint, realCoords } from '../../utils/canvas';
import { CanvasContext } from '../../contexts/CanvasContext';
import { useContextSafe } from '../../hooks/useContextSafe';
import { EditorContext } from '../../contexts/EditorContext';
import { Size } from '../../types/Size';

export default function FrontCanvas({ width, height }: Size) {
  const { offset, scale } = useContextSafe(CanvasContext);
  const { tool, options, mode, figures, dispatch } =
    useContextSafe(EditorContext);

  const [current, setCurrent] = useState<Figure | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // To catch mouse leaving the screen
  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [current, figures]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    context.clearRect(0, 0, width, height);
    current?.draw(rough.canvas(canvas), offset, scale);
    const selectedEl = figures.find((f) => f.selected);

    if (selectedEl) {
      context.beginPath();
      context.strokeStyle = '#74c0f8';
      context.lineWidth = 1;
      context.globalAlpha = 0.5;
      context.rect(
        selectedEl.x1 * scale + offset.x - 4,
        selectedEl.y1 * scale + offset.y - 4,
        selectedEl.width * scale + 8,
        selectedEl.height * scale + 8
      );
      context.stroke();
    }
  }, [current, figures, offset, scale]);

  const isDrawingMode = mode === Mode.DRAW;

  function handleMouseDown({ target, pageX, pageY }: MouseEvent) {
    if (target !== canvasRef.current) return;

    const point = realCoords({ x: pageX, y: pageY }, offset, scale);

    if (isDrawingMode) {
      setCurrent(FigureFactory.createFigure(tool, options, point));
    } else {
      dispatch({ type: 'select_figure', point: point });
    }
  }

  function handleMouseMove({ target, buttons, pageX, pageY }: MouseEvent) {
    const point = realCoords({ x: pageX, y: pageY }, offset, scale);

    if (!isDrawingMode && !buttons) {
      const currentTarget = target as HTMLElement;
      currentTarget.style.cursor = cursorByPoint(figures, point);
      return;
    }

    if (current) {
      setCurrent(current.resize(point));
    } else {
      dispatch({ type: 'drag_figure', point: point });
    }
  }

  function handleMouseUp({ target }: Event) {
    if (!current || target !== canvasRef.current) return;

    dispatch({ type: 'add_figure', figure: current });
    setCurrent(null);
  }

  return (
    <canvas
      id='canvas'
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      width={width}
      height={height}
      className='absolute inset-0'
    ></canvas>
  );
}
