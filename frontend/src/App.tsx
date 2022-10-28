import React from 'react'

import './scss/app.scss'
import Home from './pages/Home';
import Auth from './pages/Auth'
import Lobby from './pages/Lobby';


const App = () => {
  return (
    <div className='wrapper'>
      <Lobby />
    </div>
  );
}

export default App;
