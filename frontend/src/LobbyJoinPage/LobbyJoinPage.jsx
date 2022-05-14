import React from "react";
import { useState } from "react";

const LobbyJoinPage = () => {
  const [input, setInput] = useState("");

  function handleEnter() {
    console.log(input);
    fetch(`http://127.0.0.1:8000/api/lobby/${input}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <div className="d-flex flex-column justify-content-center w-100 h-100">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="form">
          <h1 className="text-white my-3">Войти в лобби</h1>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Номер лобби"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary" onClick={handleEnter}>
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default LobbyJoinPage;
