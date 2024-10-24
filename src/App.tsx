import { useState } from 'react';
import { Provider } from 'react-redux';
import Canvas from './components/Canvas';
import Tools from './components/Tools';
import { Tool } from './types';
import Panel from './components/Panel';
import { store } from './redux/store';

function App() {
  const [tool, setTool] = useState<Tool>(Tool.LINE);

  function handleClick(tool: Tool) {
    setTool(tool);
  }

  return (
    <div className='w-screen h-screen'>
      <Provider store={store}>
        <Tools selected={tool} onClick={handleClick} />
        <Panel />

        <Canvas
          width={window.innerWidth}
          height={window.innerHeight}
          tool={tool}
        />
      </Provider>
    </div>
  );
}

export default App;
