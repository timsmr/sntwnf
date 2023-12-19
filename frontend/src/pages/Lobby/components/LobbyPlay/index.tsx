import { apiService } from "api/apiService";
import { observer } from "mobx-react";
import { useState } from "react";
import { Button } from "shared/components/Button";
import { Header } from "shared/components/Header";
import { Help } from "shared/components/Help";
import { useStore } from "stores";
import * as T from "./types/types";
import { Hint } from "../Hint";
import styles from "./index.module.scss";

export const LobbyPlay = observer(({ giving, isAdmin }: T.LobbyPlayProps) => {
  const { popupStore, lobbyStore } = useStore();
  const [givingToId, setGivingToId] = useState<null | number>(null);
  const [newGivingTo, setNewGivingTo] = useState<null | number>(null);

  const onClickStart = async () => {
    if (!lobbyStore.code) return;

    await apiService.startGame(lobbyStore.code).then(() => {
      lobbyStore.setLobbyStarted(true);
    });
    const guestIdFromStorage = localStorage.getItem("guest_id");

    if (!guestIdFromStorage) return;
    const guestId = JSON.parse(guestIdFromStorage);

    if (!guestId) return;

    await apiService.getGuest(guestId).then((res) => {
      setGivingToId(res.data["giving_to"]);
    });

    await apiService.getGuest(givingToId).then((res) => {
      setNewGivingTo(res.data["user"]);
    });

    if (!newGivingTo) return;

    await apiService.getUser(newGivingTo).then((res) => {
      lobbyStore.setGivingTo(res.name);
      lobbyStore.setPref(res.preferences);
    });
  };

  return (
    <div className={styles.root}>
      <Header className={styles.header} text={lobbyStore.code ?? ""} />
      <Header className={styles.header} text="Ты даришь подарок игроку" />
      <Header className={styles.header} text={giving} headerStyle="italic" />
      {lobbyStore.preferences && (
        <Button
          buttonStyle="info"
          onClick={popupStore.changeValue}
          className={styles.button}
          label="Подсказка"
        />
      )}
      {popupStore.isOpened && (
        <Hint
          handleButtonClick={popupStore.changeValue}
          message={lobbyStore.preferences ? lobbyStore.preferences : ""}
        />
      )}

      {isAdmin && (
        <>
          <Button
            buttonStyle="shuffle"
            label="Перемешать"
            className={styles.button}
            onClick={onClickStart}
          />
          <Help className={styles.help} message="Появились новые гости?" />
        </>
      )}
    </div>
  );
});
