import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { serverResponse } from "../LobbyPage/LobbyPage";
import styles from "./adminlobbypage.module.scss";

export default function AdminLobbyPage() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [givingTo, setGivingTo] = useState<serverResponse>({});
  const params = useParams();
  const email = params.email;
  const lobbyId = params.id;
  const shuffle = async (id: string | undefined) => {
    fetch(`http://127.0.0.1:8000/api/lobby/${id}/shuffle/`)
      .then((response) => response.json())
      .then(() => setGameStarted(true));
    fetch(`http://127.0.0.1:8000/api/lobby/${lobbyId}/?email=${email}`)
      .then((response) => response.json())
      .then((data) =>
        setGivingTo({
          givingTo: data.giving_to.name,
          preferences: data.giving_to.preferences,
        })
      );
  };

  if (Object.keys(givingTo).length === 0) {
    return (
      <div className={styles.container}>
        <h2>{params.id}</h2>
        <h4>Все зашли? Нажми играть!</h4>
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={() => shuffle(params.id)}
        >
          Играть
        </button>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <h2>{params.id}</h2>
        <h3 className="text-center">Ты даришь подарок: {givingTo.givingTo}</h3>
        <h3 className="text-center">Подсказка: {givingTo.preferences}</h3>
      </div>
    );
  }
}
