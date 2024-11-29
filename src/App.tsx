import Canvas from './components/Canvas';
import ToolPanel from './components/ToolPanel';
import OptionPanel from './components/OptionPanel';
import { ToolsProvider } from './context/ToolsContext';
import { OptionsProvider } from './context/OptionsContext';

function App() {
  return (
    <div className='w-screen h-screen'>
      <ToolsProvider>
        <OptionsProvider>
          <ToolPanel />
          <OptionPanel />
          <Canvas width={window.innerWidth} height={window.innerHeight} />
        </OptionsProvider>
      </ToolsProvider>
    </div>
  );
}

export default App;
