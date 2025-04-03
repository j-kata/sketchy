import { MouseEvent, useState, useEffect, useRef } from 'react';
import rough from 'roughjs';

import Figure from '../../models/Figure';
import { FigureFactory } from '../../models/FigureFactory';
import { CanvasProps } from './types';
import { Action } from '../../types/Action';
import { cursorByPoint, realCoords } from '../../utils/canvas';
import { OptionsContext } from '../../contexts/OptionsContext';
import { ToolsContext } from '../../contexts/ToolsContext';
import { ActionContext } from '../../contexts/ActionContext';
import { FiguresContext } from '../../contexts/FiguresContext';
import { CanvasContext } from '../../contexts/CanvasContext';
import { useContextSafe } from '../../hooks/useContextSafe';

export default function FrontCanvas({ width, height }: CanvasProps) {
  const { tool } = useContextSafe(ToolsContext);
  const { options } = useContextSafe(OptionsContext);
  const { offset, scale } = useContextSafe(CanvasContext);
  const { action, setAction } = useContextSafe(ActionContext);
  const { figures, dispatch } = useContextSafe(FiguresContext);
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
    // const selectedEl = selected();
    // if (selectedEl) {
    //   context.beginPath();
    //   context.strokeStyle = '#74c0f8';
    //   context.lineWidth = 1;
    //   context.globalAlpha = 0.5;
    //   context.rect(
    //     selectedEl.x1 * scale + offset.x,
    //     selectedEl.y1 * scale + offset.y,
    //     selectedEl.width * scale,
    //     selectedEl.height * scale
    //   );
    //   context.stroke();
    // }
  }, [current, figures, offset, scale]);

  const isDrawing = action === Action.DRAW;
  const isDragging = action == Action.DRAG;

  function handleMouseDown({ target, pageX, pageY }: MouseEvent) {
    if (target !== canvasRef.current) return;
    const { x, y } = realCoords({ x: pageX, y: pageY }, offset, scale);

    if (isDrawing) {
      const figure = FigureFactory.createFigure(tool, options, { x, y });
      setCurrent(figure);
    } else {
      dispatch({ type: 'select', point: { x, y } });
      setAction(Action.DRAG);
    }
  }

  function handleMouseMove({ target, pageX, pageY }: MouseEvent) {
    const { x, y } = realCoords({ x: pageX, y: pageY }, offset, scale);
    if (isDrawing) {
      if (current) {
        const copy = current.clone();
        copy.resize({ x, y });
        setCurrent(copy);
      }
    } else {
      const currentTarget = target as HTMLElement;
      currentTarget.style.cursor = cursorByPoint(figures, { x, y });

      if (isDragging) {
        dispatch({ type: 'drag', point: { x, y } });
      }
    }
  }

  function handleMouseUp() {
    if (isDrawing && current) {
      dispatch({ type: 'add', figure: current });
      setCurrent(null);
    }
    setAction(Action.SELECT);
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
