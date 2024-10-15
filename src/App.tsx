import { useState } from 'react';
// import Canvas from './components/Canvas';
import Tools from './Tools';
import { Background, Color, Tool } from './types';
import Panel from './Panel';

function App() {
  const [tool, setTool] = useState<Tool | null>(null);
  const [strokeColor, setStrokeColor] = useState<Color>(Color.BLACK);
  const [backgroundColor, setBackgroundColor] = useState<Background>(
    Background.TRANSPARENT
  );

  function handleClick(tool: Tool) {
    setTool(tool);
  }

  return (
    <div className='w-screen h-screen'>
      <Tools selected={tool} onClick={handleClick} />
      <Panel
        selectedStrokeColor={strokeColor}
        onStrokeColorClick={(color: Color) => setStrokeColor(color)}
        selectedBackgroundColor={backgroundColor}
        onBackgroundColorClick={(background: Background) =>
          setBackgroundColor(background)
        }
      />

      {/* <Canvas
        width={window.innerWidth}
        height={window.innerHeight}
        tool={tool}
      /> */}
    </div>
  );
}

export default App;
