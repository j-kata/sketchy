import {
  MouseEvent,
  useState,
  useContext,
  useEffect,
  useRef,
  TouchEvent,
} from 'react';
import { ToolsContext, ToolsContextType } from '../context/ToolsContext';
import { Tool } from '../types';
import { OptionsContext, OptionsContextType } from '../context/OptionsContext';
import { Point } from '../types';
import rough from 'roughjs';
import Figure from '../models/Figure';
import { Line } from '../models/Line';
import { Rectangle } from '../models/Rectangle';
import { Ellipse } from '../models/Ellipse';
import { FigureFactory } from '../models/FigureFactory';

type CanvasProps = {
  width: number;
  height: number;
};

type TouchCoords = {
  touch1: { pageX: number; pageY: number };
  touch2: { pageX: number; pageY: number };
};

type CanvasAction = 'draw' | 'select';

export default function Canvas({ width, height }: CanvasProps) {
  const backCanvasRef = useRef<HTMLCanvasElement>(null);
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);

  const { tool, setTool } = useContext(ToolsContext) as ToolsContextType;
  const { options } = useContext(OptionsContext) as OptionsContextType;

  const [touchCoords, setTouchCoords] = useState<TouchCoords | null>(null);
  const [touchMode, setTouchMode] = useState<'single' | 'double'>('single');
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });

  const [current, setCurrent] = useState<Figure | null>(null);
  const [store, setStore] = useState<Figure[]>([]);

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

  const currentAction: CanvasAction = tool == Tool.SELECT ? 'select' : 'draw';

  // function handleTouchStart({ touches }: TouchEvent) {
  //   if (touches.length == 1) {
  //     setTouchMode('single');
  //   } else {
  //     setTouchMode('double');
  //   }
  //   setTouchCoords({ touch1: touches[0], touch2: touches[1] });
  // }

  function handleMouseDown(event: MouseEvent) {
    const { clientX: x, clientY: y } = event;

    if (currentAction == 'draw') {
      const figure = FigureFactory.createFigure(tool, options, { x, y });
      setCurrent(figure);
    }
  }

  function handleWheel(event: any) {
    event.preventDefault();

    if (store.length == 0) return;

    let newScale = 1;
    if (event.ctrlKey) {
      const wheel = event.deltaY < 0 ? 1 : -1;
      const zoom = Math.exp(wheel * 0.1);
      newScale = scale * zoom;
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
        x: offset.x - event.deltaX / newScale,
        y: offset.y - event.deltaY / newScale,
      });
    }
  }

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

  function handleMouseMove({ clientX, clientY }: MouseEvent) {
    if (currentAction == 'draw') {
      if (current) {
        const copy = current.clone();
        copy.resize({ x: clientX, y: clientY });
        setCurrent(copy);
      }
    }
  }

  function handleMouseUp() {
    if (currentAction == 'draw') {
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

  return (
    <div className='relative'>
      <canvas ref={backCanvasRef} width={width} height={height}></canvas>
      <canvas
        id='canvas'
        ref={frontCanvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        width={width}
        height={height}
        className='absolute inset-0'
      ></canvas>
    </div>
  );
}
