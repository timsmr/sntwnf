import React from "react";
import styles from "./createlobby.module.scss";
import { useState } from "react";
import { SyntheticEvent } from "react";
import { Link } from "react-router-dom";

export default function CreateLobby() {
  const [formError, setFormError] = useState<boolean>(false);
  const [newCode, setNewCode] = useState<string>("");
  const [form, setForm] = useState({
    lobby: {
      name: "",
      event_date: "",
    },
    guest: {
      name: "",
      email: "",
      preferences: "",
    },
  });

  const handleChange = (
    firstParam: "lobby" | "guest",
    secondParam: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value) {
      e.target.classList.remove("is-invalid");
      setFormError(false);
      setForm({
        ...form,
        [firstParam]: { ...form[firstParam], [secondParam]: e.target.value },
      });
    } else {
      e.target.classList.add("is-invalid");
      setFormError(true);
    }
  };

  const handleSubmit = () => {
    const json = JSON.stringify(form);
    fetch("http://127.0.0.1:8000/api/lobby/", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data: any) => setNewCode(data.code));
  };

  return (
    <div className={styles.container}>
      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Название мероприятия"
            onChange={(e) => handleChange("lobby", "name", e)}
          />
        </div>
        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            onChange={(e) => handleChange("lobby", "event_date", e)}
          />
          <div id="lobbyCodeHelp" className="form-text">
            Дата мероприятия
          </div>
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={(e) => handleChange("guest", "email", e)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Имя"
            onChange={(e) => handleChange("guest", "name", e)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Подсказка"
            onChange={(e) => handleChange("guest", "preferences", e)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          disabled={formError}
          onClick={formError ? undefined : handleSubmit}
        >
          Создать
        </button>
        {newCode && (
          <Link to={`/admin_lobby/${form.guest.email}/${newCode}`}>
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,12L19,16V13H6.83C6.42,14.17 5.31,15 4,15A3,3 0 0,1 1,12A3,3 0 0,1 4,9C5.31,9 6.42,9.83 6.83,11H19V8L23,12Z"
              />
            </svg>
          </Link>
        )}
      </form>
    </div>
  );
}
