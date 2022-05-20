import React from "react";
import "./App.scss";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinLobby from "./components/JoinLobby/JoinLobby";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join_lobby" element={<JoinLobby />} />
      </Routes>
    </Router>
  );
};

export default App;
