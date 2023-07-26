import './App.scss';
import Home from './components/home/Home';
import Modal from 'react-modal';
import { UserContext } from "context/Context";
import { useState } from "react";

Modal.setAppElement('#root');

const localUser = JSON.parse(localStorage.getItem("user"));

function App() {
  const [user, setUser] = useState(localUser);
	return (
		<UserContext.Provider value={{ user, setUser }}>
			<Home />
		</UserContext.Provider>
	);
}

export default App;
