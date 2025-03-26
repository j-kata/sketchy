import { useState, useContext } from 'react';

// import { Options } from '../options/types';
import { Tool } from '../tools/types';
import { Point } from '../../shared/types';
// import rough from 'roughjs';
import Figure from '../../models/Figure';
// import { FigureFactory } from '../../models/FigureFactory';
// import {
//   OptionsContext,
//   OptionsContextType,
// } from '../../context/OptionsContext';
import { ToolsContext, ToolsContextType } from '../../context/ToolsContext';

import FrontCanvas from './FrontCanvas';
import { CanvasProps } from './types';
import BackCanvas from './BackCanvas';

export default function Canvas({
  width = window.innerWidth,
  height = window.innerHeight,
}: CanvasProps) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });

  const [current, setCurrent] = useState<Figure | null>(null);
  const [store, setStore] = useState<Figure[]>([]);

  const { tool, setTool } = useContext(ToolsContext) as ToolsContextType;

  function handleFinish(figure: Figure) {
    setStore([...store, figure]);
    //setTool(Tool.SELECT);
  }

  return (
    <div className='relative'>
      <FrontCanvas
        width={width}
        height={height}
        onDrawingFinished={handleFinish}
      />
      <BackCanvas width={width} height={height} store={store} />
    </div>
  );
}
