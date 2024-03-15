import './App.css'
import viteLogo from '/vite.svg'
import { store } from './store/store';
import { Header } from './components/header';
import { LabelButton } from './components/label.button';
import { Input } from './components/input';

const { prop12 } = store.subStore1.value;
const { prop22 } = store.subStore2.value;

function App() {
  console.log('APP');

  return  (
    <>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LabelButton data={prop12} title='first'/>
        <LabelButton data={prop22} title='second'/>
        <LabelButton data={prop12} title='third'/>
      </div>
      <Input />
    </>
  );
}

export default App
