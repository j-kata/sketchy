import { useEffect, useRef } from 'react';
import rough from 'roughjs';

import { useContextSafe } from '../../hooks/useContextSafe';
import { CanvasContext } from '../../contexts/CanvasContext';
import { EditorContext } from '../../contexts/EditorContext';
import { Size } from '../../types/Size';
import { draw } from '../../utils/figures';

export default function BackCanvas({ width, height }: Size) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scale, changeScale, offset, changeOffset } =
    useContextSafe(CanvasContext);
  const { figures } = useContextSafe(EditorContext);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    context.clearRect(0, 0, width, height);
    figures.forEach((figure) =>
      draw(figure, rough.canvas(canvas), offset, scale)
    );
  }, [figures, scale, offset, width, height]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [figures, scale, offset]);

  function handleWheel(event: WheelEvent) {
    event.preventDefault();

    if (figures.length == 0) return;

    if (event.ctrlKey) {
      changeScale({ x: event.pageX, y: event.pageY }, event.deltaY);
    } else {
      changeOffset({ x: event.deltaX, y: event.deltaY });
    }
  }

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
}
