import ToolPanel from './components/tools/ToolPanel';
import Painter from './components/painter/Painter';
import { EditorProvider } from './contexts/EditorContext';
import { OptionsProvider } from './contexts/OptionsContext';

function App() {
  return (
    <div className='w-screen h-screen'>
      <EditorProvider>
        <OptionsProvider>
          <ToolPanel />
          {/* <OptionPanel show={action !== Action.SELECT} /> */}
          <Painter />
        </OptionsProvider>
      </EditorProvider>
    </div>
  );
}

export default App;
