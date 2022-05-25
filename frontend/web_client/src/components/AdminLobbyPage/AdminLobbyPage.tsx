import React from "react";
import { useParams } from "react-router-dom";
import styles from "./adminlobbypage.module.scss";

export default function AdminLobbyPage() {
  const params = useParams();
  return (
    <div className={styles.container}>
      <h2>{params.id}</h2>
      <h4>Все зашли? Нажми играть!</h4>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <button className="btn btn-primary mt-3">Играть</button>
    </div>
  );
}
