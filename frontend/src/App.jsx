import React from 'react';
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LobbyJoinPage from "./LobbyJoinPage/LobbyJoinPage";
import CreateLobbyPage from "./CreateLobbyPage/CreateLobbyPage";
import LobbyPage from "./LobbyPage/LobbyPage";
import './App.scss'

const App = () => {
    return (
            <Router>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/join' element={<LobbyJoinPage/>}/>
                    <Route path='/create' element={<CreateLobbyPage/>}/>
                    <Route path='/lobby' element={<LobbyPage/>}/>
                </Routes>
            </Router>
        );
};

export default App;
