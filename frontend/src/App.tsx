import {
  Routes,
  Route,
} from "react-router-dom";

import './scss/app.scss'
import Home from './pages/Home';
import { Auth } from './pages/Auth'
import Lobby from './pages/Lobby';
import { NotFound } from './pages/NotFound'
import { JoinLobby } from "./pages/JoinLobby";
import { CreateLobby } from "./pages/CreateLobby";
import { useStore } from "./stores";
import { useLayoutEffect } from "react";


const App = () => {

  const { init } = useStore();

  useLayoutEffect(() => {
    init();
  }, [init]);

  return (
    <div className='wrapper'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/:authType" element={<Auth />} />
        <Route path="/lobby/:code" element={<Lobby />} />
        <Route path="/join" element={<JoinLobby />} />
        <Route path="/create" element={<CreateLobby />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>

  );
}

export default App;
