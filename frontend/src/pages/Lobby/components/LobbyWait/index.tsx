import { apiService } from "api/apiService";
import { useStore } from "stores";
import { Button } from "shared/components/Button";
import { Header } from "shared/components/Header";
import { Help } from "shared/components/Help";
import { Loader } from "shared/components/Loader";
import * as T from "./types/types";
import styles from "./index.module.scss";

export const LobbyWait = ({ isAdmin }: T.LobbyWaitProps) => {
  const { lobbyStore, getGivingToGuest } = useStore();

  const onClickStart = async () => {
    if (!lobbyStore.code) return;

    await apiService.startGame(lobbyStore.code).then(() => {
      lobbyStore.setLobbyStarted(true);
    });

    getGivingToGuest();
  };

  return (
    <div className={styles.root}>
      <Header
        className={styles.header}
        text={lobbyStore.code ?? ""}
        headerStyle="bold"
      />
      {!isAdmin && (
        <>
          <Header className={styles.header} text="Ждем начала игры" />
          <Loader />
        </>
      )}
      {isAdmin && (
        <>
          <Button
            buttonStyle="primary"
            label="Начать!"
            className={styles.button}
            onClick={onClickStart}
          />
          <Help className={styles.help} message="Все зашли? Нажми начать!" />
        </>
      )}
    </div>
  );
};
