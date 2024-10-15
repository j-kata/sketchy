import { useState } from 'react';
// import Canvas from './components/Canvas';
import Tools from './Tools';
import { Tool } from './types';

function App() {
  const [tool, setTool] = useState<Tool | null>(null);

  function handleClick(tool: Tool) {
    setTool(tool);
  }

  return (
    <div className='w-screen h-screen'>
      <Tools selected={tool} onClick={handleClick} />

      {/* <Canvas
        width={window.innerWidth}
        height={window.innerHeight}
        tool={tool}
      /> */}
    </div>
  );
}

export default App;
