import { CanvasProvider } from '../../contexts/CanvasContext';
import { FiguresProvider } from '../../contexts/FiguresContext';
import BackCanvas from '../canvas/BackCanvas';
import FrontCanvas from '../canvas/FrontCanvas';

export default function Painter() {
  return (
    <CanvasProvider>
      <FiguresProvider>
        <div className='relative'>
          <FrontCanvas width={window.innerWidth} height={window.innerHeight} />
          <BackCanvas width={window.innerWidth} height={window.innerHeight} />
        </div>
      </FiguresProvider>
    </CanvasProvider>
  );
}
