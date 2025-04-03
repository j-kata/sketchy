import { ToolsProvider } from './contexts/ToolsContext';
import { OptionsProvider } from './contexts/OptionsContext';

import Painter from './components/painter/Painter';
import { ActionProvider } from './contexts/ActionContext';

function App() {
  return (
    <div className='w-screen h-screen'>
      <ActionProvider>
        <ToolsProvider>
          <OptionsProvider>
            {/* <ToolPanel onClick={handleToolSelect} /> */}
            {/* <OptionPanel show={action !== Action.SELECT} /> */}
            <Painter />
          </OptionsProvider>
        </ToolsProvider>
      </ActionProvider>
    </div>
  );
}

export default App;
