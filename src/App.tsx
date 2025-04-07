import ToolPanel from './components/tools/ToolPanel';
import Painter from './components/painter/Painter';
import { EditorProvider } from './contexts/EditorContext';
import OptionsPanel from './components/options/OptionPanel';

function App() {
  return (
    <div className='w-screen h-screen'>
      <EditorProvider>
        <ToolPanel />
        <OptionsPanel />
        <Painter />
      </EditorProvider>
    </div>
  );
}

export default App;
