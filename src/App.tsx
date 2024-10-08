import { useState } from 'react';
import Canvas from './components/Canvas';

function App() {
  const [tool, setTool] = useState<string>('line');

  return (
    <div className='w-screen h-screen'>
      <div className='fixed top-4 left-1/2 -translate-x-1/2 flex items-center space-x-4'>
        <label className='space-x-2'>
          <input
            type='radio'
            checked={tool === 'selection'}
            onChange={() => setTool('selection')}
          />
          <span>Selection</span>
        </label>
        <label className='space-x-2'>
          <input
            type='radio'
            checked={tool === 'line'}
            onChange={() => setTool('line')}
          />
          <span>Line</span>
        </label>
        <label className='space-x-2'>
          <input
            type='radio'
            value='Recatngle'
            checked={tool === 'rectangle'}
            onChange={() => setTool('rectangle')}
          />
          <span>Rectangle</span>
        </label>
        <label className='space-x-2'>
          <input
            type='radio'
            value='Ellipse'
            checked={tool === 'ellipse'}
            onChange={() => setTool('ellipse')}
          />
          <span>Ellipse</span>
        </label>
      </div>
      <Canvas
        width={window.innerWidth}
        height={window.innerHeight}
        tool={tool}
      />
    </div>
  );
}

export default App;
