import React from "react";
import { useParams } from "react-router-dom";
import styles from "./lobbypage.module.scss";

export default function LobbyPage() {
  const params = useParams();
  console.log(params);
  return (
    <div className={styles.container}>
      <h2>{params.id}</h2>
      <h4>Пока ждем</h4>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}
