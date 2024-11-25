import { Provider } from 'react-redux';
import Canvas from './components/Canvas';
import Tools from './components/Tools';
import Panel from './components/Panel';
import { store } from './redux/store';
import { ToolsProvider } from './context/ToolsContext';

function App() {
  return (
    <div className='w-screen h-screen'>
      <ToolsProvider>
        <Provider store={store}>
          <Tools />
          <Panel />

          <Canvas width={window.innerWidth} height={window.innerHeight} />
        </Provider>
      </ToolsProvider>
    </div>
  );
}

export default App;
