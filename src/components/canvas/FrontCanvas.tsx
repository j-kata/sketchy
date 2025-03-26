import { MouseEvent, useState, useEffect, useRef } from 'react';

import { Options } from '../options/types';
import { Tool } from '../tools/types';
import { Point } from '../../shared/types';
import rough from 'roughjs';
import Figure from '../../models/Figure';
import { FigureFactory } from '../../models/FigureFactory';
import {
  OptionsContext,
  OptionsContextType,
} from '../../context/OptionsContext';
import { ToolsContext, ToolsContextType } from '../../context/ToolsContext';

import { useContext } from 'react';
import { CanvasProps } from './types';

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

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [current, setCurrent] = useState<Figure | null>(null);

  // To catch events outside screen
  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [current]);

  // useEffect(() => {
  //   window.addEventListener('wheel', handleWheel, { passive: false });
  //   return () => window.removeEventListener('wheel', handleWheel);
  // }, [current, scale, offset]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const contextFront = canvas.getContext('2d')!;
    contextFront.clearRect(0, 0, width, height);
    current?.draw(rough.canvas(canvas));
  }, [current]);

  // function handleWheel(event: any) {
  //   event.preventDefault();

  //   if (store.length == 0) return;

  //   if (event.ctrlKey) {
  //     const wheel = event.deltaY < 0 ? 1 : -1;
  //     const zoom = Math.exp(wheel * 0.1);
  //     let newScale = scale * zoom;
  //     setScale(newScale);

  //     const realX = (event.pageX - offset.x) / scale;
  //     const realY = (event.pageY - offset.y) / scale;

  //     const x = Math.round(event.pageX - realX * newScale),
  //       y = Math.round(event.pageY - realY * newScale);
  //     setOffset({
  //       x: x,
  //       y: y,
  //     });
  //   } else {
  //     setOffset({
  //       x: offset.x - event.deltaX / scale,
  //       y: offset.y - event.deltaY / scale,
  //     });
  //   }
  // }

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
    // copy.point1 = {
    //   x: (copy.point1.x - offset.x) / scale,
    //   y: (copy.point1.y - offset.y) / scale,
    // };
    // copy.point2 = {
    //   x: (copy.point2.x - offset.x) / scale,
    //   y: (copy.point2.y - offset.y) / scale,
    // };
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
