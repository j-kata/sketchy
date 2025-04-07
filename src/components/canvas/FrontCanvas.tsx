import { MouseEvent, useState, useEffect, useRef } from 'react';
import rough from 'roughjs';

import Figure from '../../models/Figure';
import { FigureFactory } from '../../models/FigureFactory';
import { Mode } from '../../types/Mode';
import { cursorByPoint, realCoords } from '../../utils/canvas';
import { FiguresContext } from '../../contexts/FiguresContext';
import { CanvasContext } from '../../contexts/CanvasContext';
import { useContextSafe } from '../../hooks/useContextSafe';
import { EditorContext } from '../../contexts/EditorContext';
import { Size } from '../../types/Size';

export default function FrontCanvas({ width, height }: Size) {
  const { offset, scale } = useContextSafe(CanvasContext);
  const { figures, dispatch } = useContextSafe(FiguresContext);
  const { tool, options, mode, setMode } = useContextSafe(EditorContext);

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

  useEffect(() => {
    const selected = figures.find((f) => f.selected);
    selected ? setMode(Mode.SELECT) : setMode(Mode.IDLE);
  }, [figures]);

  useEffect(() => {
    dispatch({ type: 'redraw', options: options });
  }, [options]);

  const isDrawingMode = mode === Mode.DRAW;

  function handleMouseDown({ target, pageX, pageY }: MouseEvent) {
    if (target !== canvasRef.current) return;
    const { x, y } = realCoords({ x: pageX, y: pageY }, offset, scale);

    if (isDrawingMode) {
      const figure = FigureFactory.createFigure(tool, options, { x, y });
      setCurrent(figure);
    } else {
      dispatch({ type: 'select', point: { x, y } });
    }
  }

  function handleMouseMove({ target, buttons, pageX, pageY }: MouseEvent) {
    const { x, y } = realCoords({ x: pageX, y: pageY }, offset, scale);

    if (!buttons) {
      const currentTarget = target as HTMLElement;
      currentTarget.style.cursor = cursorByPoint(figures, { x, y });
      return;
    }

    if (current) {
      const copy = current.clone();
      copy.resize({ x, y });
      setCurrent(copy);
    } else {
      dispatch({ type: 'drag', point: { x, y } });
    }
  }

  function handleMouseUp() {
    if (!current) return;

    dispatch({ type: 'add', figure: current });
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
