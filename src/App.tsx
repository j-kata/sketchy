import { ToolsProvider } from './context/ToolsContext';
import { OptionsProvider } from './context/OptionsContext';
import { Provider } from 'react-redux';
import Painter from './components/painter/Painter';

function App() {
  return (
    <div className='w-screen h-screen'>
      <ToolsProvider>
        <OptionsProvider>
          <Painter />
        </OptionsProvider>
      </ToolsProvider>
    </div>
  );
}

export default App;
