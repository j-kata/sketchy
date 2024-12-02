import { MouseEvent, useContext, useEffect, useRef } from 'react';
import { ToolsContext, ToolsContextType } from '../context/ToolsContext';
import { Tool } from '../types';
import { OptionsContext, OptionsContextType } from '../context/OptionsContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers/store';
import { drawMove, drawStart, drawEnd } from '../reducers/drawingSlice';
import rough from 'roughjs';

type CanvasProps = {
  width: number;
  height: number;
};

type CanvasAction = 'draw' | 'select';

export default function Canvas({ width, height }: CanvasProps) {
  const backCanvasRef = useRef<HTMLCanvasElement>(null);
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);

  const { tool } = useContext(ToolsContext) as ToolsContextType;
  const { options } = useContext(OptionsContext) as OptionsContextType;
  const current = useSelector((state: RootState) => state.drawing.current);
  const dispatch = useDispatch();

  useEffect(() => {
    if (current) {
      const roughCanvas = createRoughCanvas(frontCanvasRef.current!);
      current.draw(roughCanvas);
    }
  });

  const currentAction: CanvasAction = tool == Tool.SELECT ? 'select' : 'draw';

  function createRoughCanvas(canvas: HTMLCanvasElement) {
    const ctxFront = canvas.getContext('2d');
    ctxFront?.clearRect(0, 0, canvas.width, canvas.height);
    return rough.canvas(canvas);
  }

  function handleMouseDown(event: MouseEvent) {
    const { clientX: x, clientY: y } = event;
    if (currentAction == 'draw') {
      dispatch(drawStart({ point: { x, y }, tool, options }));
    }
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
    }
  }

  return (
    <div className='relative'>
      <canvas ref={backCanvasRef} width={width} height={height}></canvas>
      <canvas
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
