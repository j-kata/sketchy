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

type CanvasProps = {
  width?: number;
  height?: number;
  action: string;
};

export default function Canvas({
  action,
  width = window.innerWidth,
  height = window.innerHeight,
}: CanvasProps) {
  const { tool, setTool } = useContext(ToolsContext) as ToolsContextType;
  const { options } = useContext(OptionsContext) as OptionsContextType;

  const backCanvasRef = useRef<HTMLCanvasElement>(null);
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });

  const [current, setCurrent] = useState<Figure | null>(null);
  const [store, setStore] = useState<Figure[]>([]);

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
  }, [current]);

  useEffect(() => {
    const canvasFront = frontCanvasRef.current!;
    const contextFront = canvasFront.getContext('2d')!;
    contextFront.clearRect(0, 0, width, height);
    current?.draw(rough.canvas(canvasFront));

    const canvasBack = backCanvasRef.current!;
    const contextBack = canvasBack.getContext('2d')!;
    contextBack.clearRect(0, 0, width, height);
    contextBack.save();
    contextBack.translate(offset.x, offset.y);
    contextBack.scale(scale, scale);
    store.forEach((figure) => figure.draw(rough.canvas(canvasBack)));
    contextBack.restore();

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [scale, offset, store, current]);

  function handleMouseDown(event: MouseEvent) {
    if (event.target !== frontCanvasRef.current) return;
    const { pageX: x, pageY: y } = event;

    if (action == 'paint') {
      const figure = FigureFactory.createFigure(tool, options, {
        x: x,
        y: y,
      });
      setCurrent(figure);
    }
  }

  function handleWheel(event: any) {
    event.preventDefault();

    if (store.length == 0) return;

    if (event.ctrlKey) {
      const wheel = event.deltaY < 0 ? 1 : -1;
      const zoom = Math.exp(wheel * 0.1);
      let newScale = scale * zoom;
      setScale(newScale);

      const realX = (event.pageX - offset.x) / scale;
      const realY = (event.pageY - offset.y) / scale;

      const x = Math.round(event.pageX - realX * newScale),
        y = Math.round(event.pageY - realY * newScale);
      setOffset({
        x: x,
        y: y,
      });
    } else {
      setOffset({
        x: offset.x - event.deltaX / scale,
        y: offset.y - event.deltaY / scale,
      });
    }
  }

  function handleMouseMove({ pageX, pageY }: MouseEvent) {
    if (action == 'paint') {
      if (current) {
        const copy = current.clone();
        copy.resize({ x: pageX, y: pageY });
        setCurrent(copy);
      }
    }
  }

  function handleMouseUp() {
    if (action == 'paint') {
      if (current) {
        const copy = current.clone();
        copy.point1 = {
          x: (copy.point1.x - offset.x) / scale,
          y: (copy.point1.y - offset.y) / scale,
        };
        copy.point2 = {
          x: (copy.point2.x - offset.x) / scale,
          y: (copy.point2.y - offset.y) / scale,
        };
        setStore([...store, copy]);
        setCurrent(null);
        setTool(Tool.SELECT);
      }
    }
  }

  return (
    <div className='relative'>
      <canvas ref={backCanvasRef} width={width} height={height}></canvas>
      <canvas
        id='canvas'
        ref={frontCanvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        width={width}
        height={height}
        className='absolute inset-0'
      ></canvas>
    </div>
  );

  // function handleTouchStart({ touches }: TouchEvent) {
  //   if (touches.length == 1) {
  //     setTouchMode('single');
  //   } else {
  //     setTouchMode('double');
  //   }
  //   setTouchCoords({ touch1: touches[0], touch2: touches[1] });
  // }

  // function handleTouchMove({ touches }: TouchEvent) {
  //   console.log(touches);
  //   const currentTouch: TouchCoords = {
  //     touch1: touches[0],
  //     touch2: touches[1],
  //   };

  //   if (touchMode == 'double') {
  //     const prevTouch = touchCoords;
  //     const newScale = scale * zoom(prevTouch as TouchCoords, currentTouch);
  //     setScale(newScale);
  //     const newPan = pan(prevTouch as TouchCoords, currentTouch);

  //     setOffset({
  //       x: offset.x + newPan.x / newScale,
  //       y: offset.y + newPan.y / newScale,
  //     });
  //   }
  //   setTouchCoords(currentTouch);
  // }

  // function touchDistance(touches: TouchCoords) {
  //   const squareX = Math.pow(touches.touch1.pageX - touches.touch2.pageX, 2);
  //   const squareY = Math.pow(touches.touch1.pageY - touches.touch2.pageY, 2);
  //   return Math.sqrt(squareX + squareY);
  // }

  // function touchMiddle(coord1: number, coord2: number) {
  //   return (coord1 + coord2) / 2;
  // }

  // function zoom(prevTouch: TouchCoords, curTouch: TouchCoords) {
  //   const distancePrevious = touchDistance(prevTouch);
  //   const distanceCurrent = touchDistance(curTouch);
  //   return distanceCurrent / distancePrevious;
  // }

  // function pan(prevTouch: TouchCoords, curTouch: TouchCoords) {
  //   const midX = touchMiddle(curTouch.touch1.pageX, curTouch.touch2.pageX);
  //   const midY = touchMiddle(curTouch.touch1.pageY, curTouch.touch2.pageY);

  //   const prevMidX = touchMiddle(
  //     prevTouch.touch1.pageX,
  //     prevTouch.touch2.pageX
  //   );
  //   const prevMidY = touchMiddle(
  //     prevTouch.touch1.pageY,
  //     prevTouch.touch2.pageY
  //   );
  //   const panX = midX - prevMidX;
  //   const panY = midY - prevMidY;
  //   return { x: panX, y: panY };
  // }
}
