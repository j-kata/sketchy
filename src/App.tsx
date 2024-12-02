import Canvas from './components/Canvas';
import ToolPanel from './components/ToolPanel';
import OptionPanel from './components/OptionPanel';
import { ToolsProvider } from './context/ToolsContext';
import { OptionsProvider } from './context/OptionsContext';
import { Provider } from 'react-redux';
import { store } from './reducers/store';

function App() {
  return (
    <div className='w-screen h-screen'>
      <Provider store={store}>
        <ToolsProvider>
          <OptionsProvider>
            <ToolPanel />
            <OptionPanel />
            <Canvas width={window.innerWidth} height={window.innerHeight} />
          </OptionsProvider>
        </ToolsProvider>
      </Provider>
    </div>
  );
}

export default App;
