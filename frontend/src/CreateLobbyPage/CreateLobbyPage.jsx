import React from "react";
import axios from "axios";
import { useState } from "react";
import "./CreateLobbyPage.scss";
import GenerateRoomNumber from "../utils/GenerateRoomNumber";

const CreateLobbyPage = () => {
  const [newlobby, setNewlobby] = useState({
    lobbyName: "",
    eventdate: "",
    guestname: "",
    email: "",
    preferences: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const json = JSON.stringify(newlobby);

    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: json,
    // };
    // let response = fetch("/api/lobby/", requestOptions).then((response) =>
    //   console.log(response)
    // );
    axios
      .post("http://localhost:8000/api/lobby/", json)
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err.message));
  }

  return (
    <div className="d-flex flex-column justify-content-center w-100 h-100">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="form">
          <form>
            <div className="mb-3">
              <label htmlFor="lobby_name" className="form-label">
                Название лобби
              </label>{" "}
              <input
                type="text"
                className="form-control"
                id="lobbyName"
                value={newlobby.lobbyName}
                onChange={(e) =>
                  setNewlobby({ ...newlobby, lobbyName: e.target.value })
                }
              />{" "}
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Дата мероприятия
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={newlobby.eventdate}
                onChange={(e) =>
                  setNewlobby({ ...newlobby, eventdate: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Имя
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={newlobby.guestname}
                onChange={(e) =>
                  setNewlobby({ ...newlobby, guestname: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Электронная почта
              </label>
              <input type="text" className="form-control" id="email" />
            </div>
            <div className="mb-3">
              <label htmlFor="giftClue" className="form-label">
                Подсказка
              </label>
              <input
                type="text"
                className="form-control"
                id="giftClue"
                value={newlobby.preferences}
                onChange={(e) =>
                  setNewlobby({ ...newlobby, preferences: e.target.value })
                }
              />
            </div>
            <p> Номер комнаты: {GenerateRoomNumber()} </p>{" "}
            <button onClick={handleSubmit} className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateLobbyPage;
