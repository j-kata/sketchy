import { useEffect, useRef } from 'react';
import rough from 'roughjs';
import { CanvasProps } from './types';
import { useCanvas } from './useCanvas';
import { useStore } from './useStore';

export default function BackCanvas({ width, height }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scale, changeScale, offset, changeOffset } = useCanvas();
  const { store } = useStore();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    context.clearRect(0, 0, width, height);
    // context.save();
    // context.translate(offset.x, offset.y);
    // context.scale(scale, scale);
    store.forEach((figure) => figure.draw(rough.canvas(canvas), offset, scale));
    // context.restore();
  }, [store, scale, offset]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [store, scale, offset]);

  function handleWheel(event: WheelEvent) {
    event.preventDefault();

    if (store.length == 0) return;

    if (event.ctrlKey) {
      changeScale({ x: event.pageX, y: event.pageY }, event.deltaY);
    } else {
      changeOffset({ x: event.deltaX, y: event.deltaY });
    }
  }

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
}

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
