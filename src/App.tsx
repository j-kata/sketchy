import { ToolsProvider } from './context/ToolsContext';
import { OptionsProvider } from './context/OptionsContext';
import { Provider } from 'react-redux';
import { store } from './reducers/store';
import Painter from './components/painter/Painter';

function App() {
  return (
    <div className='w-screen h-screen'>
      <Provider store={store}>
        <ToolsProvider>
          <OptionsProvider>
            <Painter />
          </OptionsProvider>
        </ToolsProvider>
      </Provider>
    </div>
  );
}

export default App;
