import { Provider } from 'react-redux';
import Canvas from './components/Canvas';
import Tools from './components/Tools';
import Panel from './components/Panel';
import { store } from './redux/store';

function App() {
  return (
    <div className='w-screen h-screen'>
      <Provider store={store}>
        <Tools />
        <Panel />

        <Canvas width={window.innerWidth} height={window.innerHeight} />
      </Provider>
    </div>
  );
}

export default App;
