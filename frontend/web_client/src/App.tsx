import React from "react";
import "./App.scss";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinLobby from "./components/JoinLobby/JoinLobby";
import LobbyPage from "./components/LobbyPage/LobbyPage";
import CreateLobby from "./components/CreateLobby/CreateLobby";
import AdminLobbyPage from "./components/AdminLobbyPage/AdminLobbyPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join_lobby" element={<JoinLobby />} />
        <Route path="/lobby/:id/:email" element={<LobbyPage />} />
        <Route path="/create_lobby" element={<CreateLobby />} />
        <Route path="/admin_lobby/:email/:id" element={<AdminLobbyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
