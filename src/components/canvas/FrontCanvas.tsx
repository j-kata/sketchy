import {
  MouseEvent,
  useState,
  useEffect,
  useRef,
  useContext,
  ChangeEvent,
} from 'react';

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
import { useStore } from './useStore';
import {
  positionOnElement,
  cursorStyle,
  elementByPoint,
  cursorByPoint,
} from './utils';

export default function FrontCanvas({ width, height }: CanvasProps) {
  const { tool, setTool } = useContext(ToolsContext) as ToolsContextType;
  const { options } = useContext(OptionsContext) as OptionsContextType;
  const { shiftedCoords } = useCanvas();
  const { store, setStore } = useStore();
  const [current, setCurrent] = useState<Figure | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // To catch events outside screen
  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [current, store]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    context.clearRect(0, 0, width, height);
    current?.draw(rough.canvas(canvas));
  }, [current]);

  function handleMouseDown({ target, pageX: x, pageY: y }: MouseEvent) {
    if (target !== canvasRef.current) return;

    if (isPaintable()) {
      const figure = FigureFactory.createFigure(tool, options, { x, y });
      setCurrent(figure);
    } else {
      const element = elementByPoint(store, { x, y });
      if (element) {
        const copy = element.clone();
        copy.offset = { x: x - element.x1, y: y - element.y1 };
        copy.position = element.cursorPosition({ x, y });
        copy.selected = true;
        setStore(nextStore(copy));
      }
    }
  }

  function handleMouseMove({ target, pageX: x, pageY: y }: MouseEvent) {
    if (isPaintable()) {
      if (current) {
        const copy = current.clone();
        copy.resize({ x, y });
        setCurrent(copy);
      }
    } else {
      const currentTarget = target as HTMLElement;
      currentTarget.style.cursor = cursorByPoint(store, { x, y });
      const selectedEl = selected();
      if (selectedEl) {
        const copy = selectedEl.clone();
        copy.move({ x, y }, copy.offset);
        setStore(nextStore(copy));
      }
    }
  }

  function handleMouseUp() {
    if (isPaintable()) {
      if (current) {
        const copy = current.clone();
        copy.point1 = shiftedCoords({ x: copy.point1.x, y: copy.point1.y });
        copy.point2 = shiftedCoords({ x: copy.point2.x, y: copy.point2.y });
        copy.selected = false;
        setCurrent(null);
        setStore([copy, ...store]);
        setTimeout(() => {
          setTool(Tool.SELECT);
        }, 2000);
      }
    } else {
      const selectedEl = selected();
      if (selectedEl) {
        const copy = selectedEl.clone();
        copy.selected = false;
        setStore(nextStore(copy));
      }
    }
  }

  function isPaintable() {
    return tool !== Tool.SELECT;
  }

  function nextStore(element: Figure) {
    return store.map((el) => (el.id === element.id ? element : el));
  }

  function selected() {
    return store.find((el) => el.selected);
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
