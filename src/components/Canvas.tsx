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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers/store';
import { drawMove, drawStart, drawEnd } from '../reducers/drawingSlice';
import * as Figure from '../reducers/canvasUtils';
import { Point } from '../types';
import rough from 'roughjs';

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
  const current = useSelector((state: RootState) => state.drawing.current);
  const dispatch = useDispatch();

  const [touchCoords, setTouchCoords] = useState<TouchCoords | null>(null);
  const [touchMode, setTouchMode] = useState<'single' | 'double'>('single');
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });

  useEffect(() => {
    if (current) {
      const canvas = frontCanvasRef.current!;
      const context = canvas.getContext('2d')!;
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(offset.x, offset.y);
      context.scale(scale, scale);
      Figure.draw(current, rough.canvas(canvas));
      context.restore();
    }
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [scale, offset, current]);

  const currentAction: CanvasAction = tool == Tool.SELECT ? 'select' : 'draw';

  function handleTouchStart({ touches }: TouchEvent) {
    if (touches.length == 1) {
      setTouchMode('single');
    } else {
      setTouchMode('double');
    }
    setTouchCoords({ touch1: touches[0], touch2: touches[1] });
  }

  function handleMouseDown(event: MouseEvent) {
    const { clientX: x, clientY: y } = event;

    if (currentAction == 'draw') {
      dispatch(drawStart({ point: { x, y }, tool, options }));
    }
  }

  function handleWheel(event: any) {
    event.preventDefault();

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

  function handleTouchMove({ touches }: TouchEvent) {
    console.log(touches);
    const currentTouch: TouchCoords = {
      touch1: touches[0],
      touch2: touches[1],
    };

    if (touchMode == 'double') {
      const prevTouch = touchCoords;
      const newScale = scale * zoom(prevTouch as TouchCoords, currentTouch);
      setScale(newScale);
      const newPan = pan(prevTouch as TouchCoords, currentTouch);

      setOffset({
        x: offset.x + newPan.x / newScale,
        y: offset.y + newPan.y / newScale,
      });
    }
    setTouchCoords(currentTouch);
  }

  function handleMouseMove(event: MouseEvent) {
    const { clientX: x, clientY: y } = event;
    if (currentAction == 'draw') {
      dispatch(drawMove({ x, y }));
    }
  }

  function handleMouseUp() {
    if (currentAction == 'draw') {
      dispatch(drawEnd());
      setTool(Tool.SELECT);
    }
  }

  function touchDistance(touches: TouchCoords) {
    const squareX = Math.pow(touches.touch1.pageX - touches.touch2.pageX, 2);
    const squareY = Math.pow(touches.touch1.pageY - touches.touch2.pageY, 2);
    return Math.sqrt(squareX + squareY);
  }

  function touchMiddle(coord1: number, coord2: number) {
    return (coord1 + coord2) / 2;
  }

  function zoom(prevTouch: TouchCoords, curTouch: TouchCoords) {
    const distancePrevious = touchDistance(prevTouch);
    const distanceCurrent = touchDistance(curTouch);
    return distanceCurrent / distancePrevious;
  }

  function pan(prevTouch: TouchCoords, curTouch: TouchCoords) {
    const midX = touchMiddle(curTouch.touch1.pageX, curTouch.touch2.pageX);
    const midY = touchMiddle(curTouch.touch1.pageY, curTouch.touch2.pageY);

    const prevMidX = touchMiddle(
      prevTouch.touch1.pageX,
      prevTouch.touch2.pageX
    );
    const prevMidY = touchMiddle(
      prevTouch.touch1.pageY,
      prevTouch.touch2.pageY
    );
    const panX = midX - prevMidX;
    const panY = midY - prevMidY;
    return { x: panX, y: panY };
  }

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
