import { useEffect, useState } from 'react';
import { CanvasProvider } from '../../contexts/CanvasContext';
import { FiguresProvider } from '../../contexts/FiguresContext';
import BackCanvas from '../canvas/BackCanvas';
import FrontCanvas from '../canvas/FrontCanvas';
import { useThrottle } from '../../hooks/useThrottle';
import { Size } from '../../types/Size';

export default function Painter() {
  const [size, setSize] = useState<Size>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const resize = useThrottle(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  });

  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <CanvasProvider>
      <FiguresProvider>
        <div className='relative'>
          <FrontCanvas {...size} />
          <BackCanvas {...size} />
        </div>
      </FiguresProvider>
    </CanvasProvider>
  );
}
