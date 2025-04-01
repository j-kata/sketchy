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
  const { offset, scale, shiftedCoords } = useCanvas();
  const { store, setStore } = useStore();
  const [current, setCurrent] = useState<Figure | null>(null);
  const [action, setAction] = useState<string>('select');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // To catch mouse leaving the screen
  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [current, store]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    context.clearRect(0, 0, width, height);
    current?.draw(rough.canvas(canvas), offset, scale);
    const selectedEl = selected();
    if (selectedEl) {
      context.beginPath();
      context.strokeStyle = '#74c0f8';
      context.lineWidth = 1;
      context.globalAlpha = 0.5;
      context.rect(
        selectedEl.x1 * scale + offset.x,
        selectedEl.y1 * scale + offset.y,
        selectedEl.width * scale,
        selectedEl.height * scale
      );
      context.stroke();
    }
  }, [current, store, offset, scale]);

  function handleMouseDown({ target, pageX: x, pageY: y }: MouseEvent) {
    if (target !== canvasRef.current) return;

    if (isPaintable()) {
      const figure = FigureFactory.createFigure(tool, options, { x, y });
      setCurrent(figure);
    } else {
      const selectedEl = selected();
      let newStore: Figure[] = store;
      if (selectedEl) {
        const copy = selectedEl.clone();
        copy.selected = false;
        newStore = nextStore(copy);
        setAction('noselected');
      }
      const element = elementByPoint(store, {
        x: (x - offset.x) / scale,
        y: (y - offset.y) / scale,
      });
      if (element) {
        const copy = element.clone();
        copy.offset = {
          x: (x - offset.x) / scale - element.x1,
          y: (y - offset.y) / scale - element.y1,
        };
        copy.position = element.cursorPosition({
          x: (x - offset.x) / scale,
          y: (y - offset.y) / scale,
        });
        copy.selected = true;
        setStore(nextStore(copy, newStore));
        setAction('selected');
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
      currentTarget.style.cursor = cursorByPoint(store, {
        x: (x - offset.x) / scale,
        y: (y - offset.y) / scale,
      });
      if (action == 'selected') {
        const selectedEl = selected();
        if (selectedEl) {
          const copy = selectedEl.clone();
          copy.update({ x: (x - offset.x) / scale, y: (y - offset.y) / scale });
          setStore(nextStore(copy));
        }
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
      setAction('released');
      // const selectedEl = selected();
      // if (selectedEl) {
      //   const copy = selectedEl.clone();
      //   copy.selected = false;
      //   setStore(nextStore(copy));
      // }
    }
  }

  function isPaintable() {
    return tool !== Tool.SELECT;
  }

  function nextStore(element: Figure, storage = store) {
    return storage.map((el) => (el.id === element.id ? element : el));
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
