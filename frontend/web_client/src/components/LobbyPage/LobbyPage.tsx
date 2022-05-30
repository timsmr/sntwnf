import { useParams } from "react-router-dom";
import styles from "./lobbypage.module.scss";
import { useEffect, useState } from "react";

export interface serverResponse {
  givingTo?: string;
  preferences?: string;
}

export default function LobbyPage() {
  const [givingTo, setGivingTo] = useState<serverResponse>({});
  const params = useParams();
  const email = params.email;
  const lobbyId = params.id;

  useEffect(() => {
    const timer = setInterval(() => {
      fetch(`http://127.0.0.1:8000/api/lobby/${lobbyId}/?email=${email}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.started) {
            setGivingTo({
              givingTo: data.giving_to.name,
              preferences: data.giving_to.preferences,
            });
            clearInterval(timer);
            console.log(data);
          }
        });
    }, 2000);
  }, []);

  if (Object.keys(givingTo).length === 0) {
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
