import { useLayoutEffect, useReducer, useRef } from 'react';
import rough from 'roughjs';
import reducer from '../utils/canvasReducer';
import { cursorStyle, getElementPosition } from '../utils/canvasUtils';
import { useSelector } from 'react-redux';
import { FigureOptions } from '../entities/Figure';
import { RootState } from '../redux/store';

export default function Canvas({
  width,
  height,
  tool,
}: {
  width: number;
  height: number;
  tool: string;
}) {
  const options = useSelector((state: RootState) => state.options);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [{ history, currentStep }, dispatch] = useReducer(reducer, {
    history: [[]],
    currentStep: 0,
  });

  const elements = history[currentStep];

  useLayoutEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      element.draw(roughCanvas, options as FigureOptions);
    });
  });

  function handleMouseDown(event: React.MouseEvent): void {
    const { clientX: x, clientY: y } = event;
    switch (tool) {
      case 'selection': {
        dispatch({ type: 'grab', x, y });
        break;
      }
      default: {
        dispatch({ type: 'draw', x, y, tool: tool });
        break;
      }
    }
  }

  function handleMouseMove(event: React.MouseEvent): void {
    const { clientX: x, clientY: y } = event;

    if (tool === 'selection' && event.buttons === 0) {
      const target = event.target as HTMLElement;
      const position = getElementPosition(elements, { x, y });
      target.style.cursor = cursorStyle(position);
    }

    dispatch({ type: 'move', x, y });
  }

  function handleMouseUp(): void {
    dispatch({ type: 'release' });
  }

  function undo(): void {
    dispatch({ type: 'undo' });
  }

  function redo(): void {
    dispatch({ type: 'redo' });
  }

  function clear(): void {
    dispatch({ type: 'clear' });
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
      <div className='fixed bottom-10 left-10 flex space-x-2'>
        <button
          type='button'
          disabled={currentStep === 0}
          onClick={undo}
          className='px-2 border rounded-md disabled:opacity-40'
        >
          undo
        </button>
        <button
          type='button'
          disabled={currentStep === history.length - 1}
          onClick={redo}
          className='px-2 border rounded-md disabled:opacity-40'
        >
          redo
        </button>
        <button
          type='button'
          onClick={clear}
          className='px-2 border rounded-md'
        >
          clear all
        </button>
      </div>
    </>
  );
}
