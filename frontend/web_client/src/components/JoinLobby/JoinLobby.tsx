import React from "react";
import styles from "./joinlobby.module.scss";
import { useState, useEffect } from "react";

export default function JoinLobby() {
  const [lobbyExists, setLobbyExists] = useState(false);
  const [errorCode, setErrorCode] = useState(false);
  const [form, setForm] = useState({
    email: "",
    name: "",
    preferences: "",
    lobby: "",
  });

  //   useEffect(() => {
  //     fetch("http://127.0.0.1:8000/api/lobby/dapdtg")
  //       .then((resp) => resp.json())
  //       .then((data) => console.log(data));
  //   }, []);

  const checkIfLobbyExists = () => {
    if (form.lobby) {
      fetch(`http://127.0.0.1:8000/api/lobby/${form.lobby}`)
        .then((resp) => {
          if (resp.ok) {
            setLobbyExists(true);
            setErrorCode(false);
          } else {
            setErrorCode(true);
          }
          return resp.json();
        })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
    console.log(errorCode);
  };

  const handleSubmit = () => {
    const json = JSON.stringify(form);

    console.log(json);
    fetch("http://127.0.0.1:8000/api/guest/", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => console.log(resp));
  };

  return (
    <div className={styles.container}>
      <h3 className="mb-3" onClick={checkIfLobbyExists}>
        Войти в лобби
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M23,12L19,16V13H6.83C6.42,14.17 5.31,15 4,15A3,3 0 0,1 1,12A3,3 0 0,1 4,9C5.31,9 6.42,9.83 6.83,11H19V8L23,12Z"
          />
        </svg>
      </h3>

      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            aria-describedby="lobbyCodeHelp"
            placeholder="Код лобби"
            value={form.lobby}
            onChange={(e) => setForm({ ...form, lobby: e.target.value })}
            disabled={lobbyExists}
          />
          <div id="lobbyCodeHelp" className="form-text">
            Введите код, который выслал вам админ
          </div>

          {errorCode && <div className={styles.invalid}>Неверный код </div>}
        </div>
        {lobbyExists && (
          <>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Ваше имя"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Подсказка для подарка"
                value={form.preferences}
                onChange={(e) =>
                  setForm({ ...form, preferences: e.target.value })
                }
              />
            </div>
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={handleSubmit}
            >
              Войти
            </button>
          </>
        )}
      </form>
    </div>
  );
}
