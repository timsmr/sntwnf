import React from "react";
import styles from "./homepage.module.scss";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h2>Тайный санта</h2>
      <button type="button" className="btn btn-light">
        <Link to="/join_lobby">Войти</Link>
      </button>
      <button type="button" className="btn btn-light">
        <Link to="/create_lobby">Создать</Link>
      </button>
    </div>
  );
}
