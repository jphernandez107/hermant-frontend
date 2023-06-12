import './App.scss';
import Home from './components/home/Home';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  return (
    <Home/>
  );
}

export default App;
