import { MouseEvent, useEffect, useRef } from 'react';
import rough from 'roughjs';

import { Mode } from '../../types/Mode';
import { cursorStyle, realCoords } from '../../utils/canvas';
import { CanvasContext } from '../../contexts/CanvasContext';
import { useContextSafe } from '../../hooks/useContextSafe';
import { EditorContext } from '../../contexts/EditorContext';
import { Size } from '../../types/Size';
import { cursorPosition, draw } from '../../utils/figures';
import { useDrawingCanvas } from '../../hooks/useDrawingCanvas';
import { findByPoint } from '../../utils/figuresCollection';
import { useRenderingCanvas } from '../../hooks/useRenderingCanvas';

export default function FrontCanvas({ width, height }: Size) {
  const { offset, scale } = useContextSafe(CanvasContext);
  const { mode, current, figures, selectedIds } = useContextSafe(EditorContext);

  const { startDrawing, updateDrawing, endDrawing } = useDrawingCanvas();
  const { selectFigure, dragFigure, resizeFigure, endAction } =
    useRenderingCanvas();
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
    current && draw(current, rough.canvas(canvas), offset, scale);
    // const selectedEl = figures.find((f) => f.selected);

    // if (selectedEl) {
    //   context.beginPath();
    //   context.strokeStyle = '#74c0f8';
    //   context.lineWidth = 1;
    //   context.globalAlpha = 0.5;
    //   context.rect(
    //     selectedEl.x1 * scale + offset.x - 4,
    //     selectedEl.y1 * scale + offset.y - 4,
    //     selectedEl.width * scale + 8,
    //     selectedEl.height * scale + 8
    //   );
    //   context.stroke();
    // }
  }, [current, figures, offset, scale]);

  function handleMouseDown({ target, pageX, pageY }: MouseEvent) {
    if (target !== canvasRef.current) return;

    const point = realCoords({ x: pageX, y: pageY }, offset, scale);

    if (mode === Mode.READY_TO_DRAW) {
      startDrawing(point);
    } else {
      selectFigure(point);
    }
  }

  function handleMouseMove({ target, pageX, pageY }: MouseEvent) {
    const point = realCoords({ x: pageX, y: pageY }, offset, scale);

    if (mode === Mode.DRAWING) {
      updateDrawing(point);
    } else if (mode == Mode.DRAGGING) {
      dragFigure(point);
    } else if (mode == Mode.RESIZING) {
      resizeFigure(point);
    } else if (mode == Mode.SELECT || mode == Mode.IDLE) {
      const currentTarget = target as HTMLElement;
      const hovered = findByPoint(figures, point);
      if (hovered) {
        if (hovered.id == selectedIds[0]) {
          const position = cursorPosition(hovered, point);
          currentTarget.style.cursor = cursorStyle(position);
        } else {
          currentTarget.style.cursor = 'move';
        }
      } else {
        currentTarget.style.cursor = 'default';
      }
    }
  }

  function handleMouseUp({ target }: Event) {
    if (target !== canvasRef.current) return;

    if (mode === Mode.DRAWING) {
      endDrawing();
    } else {
      endAction();
    }
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
