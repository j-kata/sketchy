import { MouseEvent, useState, useEffect, useRef, useContext } from 'react';

import { Tool } from '../../types/Tool';
import rough from 'roughjs';
import Figure from '../../models/Figure';
import { FigureFactory } from '../../models/FigureFactory';
import {
  OptionsContext,
  OptionsContextType,
} from '../../contexts/OptionsContext';
import { ToolsContext, ToolsContextType } from '../../contexts/ToolsContext';
import { CanvasProps } from './types';
import { useCanvas } from '../../hooks/useCanvas';
import { useFigures } from '../../hooks/useFigures';

import { cursorByPoint, realCoords } from '../../utils/canvas';

export default function FrontCanvas({ width, height }: CanvasProps) {
  const { tool, setTool } = useContext(ToolsContext) as ToolsContextType;
  const { options } = useContext(OptionsContext) as OptionsContextType;
  const { offset, scale } = useCanvas();
  // const { store, setStore } = useStore();
  const [current, setCurrent] = useState<Figure | null>(null);
  const [action, setAction] = useState<string>('select');
  const { figures, dispatch } = useFigures();
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

  function handleMouseDown({ target, pageX, pageY }: MouseEvent) {
    if (target !== canvasRef.current) return;
    const { x, y } = realCoords({ x: pageX, y: pageY }, offset, scale);

    if (isPaintable()) {
      const figure = FigureFactory.createFigure(tool, options, { x, y });
      setCurrent(figure);
    } else {
      dispatch({ type: 'select', point: { x, y } });
      setAction('selected');
    }
  }

  function handleMouseMove({ target, pageX, pageY }: MouseEvent) {
    const { x, y } = realCoords({ x: pageX, y: pageY }, offset, scale);
    if (isPaintable()) {
      if (current) {
        const copy = current.clone();
        copy.resize({ x, y });
        setCurrent(copy);
      }
    } else {
      const currentTarget = target as HTMLElement;
      currentTarget.style.cursor = cursorByPoint(figures, { x, y });

      if (action == 'selected') {
        dispatch({ type: 'move', point: { x, y } });
      }
    }
  }

  function handleMouseUp() {
    if (isPaintable()) {
      current && dispatch({ type: 'add', figure: current });
      setCurrent(null);
      setTimeout(() => {
        setTool(Tool.SELECT);
      }, 2000);
    } else {
      setAction('released');
    }
  }

  function isPaintable() {
    return tool !== Tool.SELECT;
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
