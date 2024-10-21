import { useState } from 'react';
import { Provider } from 'react-redux';
// import Canvas from './components/Canvas';
import Tools from './Tools';
import { Background, Color, Tool } from './types';
import Panel from './Panel';
import { store } from './redux/store';

function App() {
  const [tool, setTool] = useState<Tool | null>(null);

  function handleClick(tool: Tool) {
    setTool(tool);
  }

  return (
    <div className='w-screen h-screen'>
      <Provider store={store}>
        <Tools selected={tool} onClick={handleClick} />
        <Panel />

        {/* <Canvas
          width={window.innerWidth}
          height={window.innerHeight}
          tool={tool}
        /> */}
      </Provider>
    </div>
  );
}

export default App;
