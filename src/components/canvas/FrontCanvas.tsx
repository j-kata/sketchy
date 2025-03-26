import { MouseEvent, useState, useEffect, useRef, useContext } from 'react';

import { Tool } from '../tools/types';
import rough from 'roughjs';
import Figure from '../../models/Figure';
import { FigureFactory } from '../../models/FigureFactory';
import {
  OptionsContext,
  OptionsContextType,
} from '../../context/OptionsContext';
import { ToolsContext, ToolsContextType } from '../../context/ToolsContext';
import { CanvasProps } from './types';
import { useCanvas } from './useCanvas';

type FrontCanvasProps = CanvasProps & {
  onDrawingFinished: (figure: Figure) => void;
};

export default function FrontCanvas({
  width,
  height,
  onDrawingFinished,
}: FrontCanvasProps) {
  const { tool } = useContext(ToolsContext) as ToolsContextType;
  const { options } = useContext(OptionsContext) as OptionsContextType;
  const { shiftedCoords } = useCanvas();
  const [current, setCurrent] = useState<Figure | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // To catch events outside screen
  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [current]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    context.clearRect(0, 0, width, height);
    current?.draw(rough.canvas(canvas));
  }, [current]);

  function handleMouseDown({ target, pageX: x, pageY: y }: MouseEvent) {
    if (target !== canvasRef.current || !isPaintable()) return;

    const figure = FigureFactory.createFigure(tool, options, { x, y });
    setCurrent(figure);
  }

  function handleMouseMove({ pageX: x, pageY: y }: MouseEvent) {
    if (!isPaintable || !current) return;

    const copy = current.clone();
    copy.resize({ x, y });
    setCurrent(copy);
  }

  function handleMouseUp() {
    if (!isPaintable || !current) return;

    const copy = current.clone();
    copy.point1 = shiftedCoords({ x: copy.point1.x, y: copy.point1.y });
    copy.point2 = shiftedCoords({ x: copy.point2.x, y: copy.point2.y });
    setCurrent(null);
    onDrawingFinished(copy);
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
