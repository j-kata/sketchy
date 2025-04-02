import { ToolsProvider } from './contexts/ToolsContext';
import { OptionsProvider } from './contexts/OptionsContext';

import Painter from './components/painter/Painter';

function App() {
  return (
    <div className='w-screen h-screen'>
      <ToolsProvider>
        <OptionsProvider>
          {/* <ToolPanel onClick={handleToolSelect} /> */}
          {/* <OptionPanel show={action !== Action.SELECT} /> */}
          <Painter />
        </OptionsProvider>
      </ToolsProvider>
    </div>
  );
}

export default App;
