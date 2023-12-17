import { apiService } from "api/apiService";
import { observer } from "mobx-react";
import { useRef } from "react";
import { Button } from "shared/components/Button";
import { Header } from "shared/components/Header";
import { Help } from "shared/components/Help";
import { useStore } from "stores";
import * as T from "./types/types";
import { Hint } from "../Hint";
import styles from "./index.module.scss";

export const LobbyPlay = observer(({ giving, isAdmin }: T.LobbyPlayProps) => {
  const { popupStore, lobbyStore } = useStore();
  const givingToIdRef = useRef<null | number>(null);
  const newGivingToRef = useRef<null | number>(null);

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
      givingToIdRef.current = res.data["giving_to"];
    });

    await apiService.getGuest(givingToIdRef.current).then((res) => {
      newGivingToRef.current = res.data["user"];
    });

    if (!newGivingToRef.current) return;

    await apiService.getUser(newGivingToRef.current).then((res) => {
      lobbyStore.setGivingTo(res.name);
      lobbyStore.setPref(res.preferences);
    });
  };

  return (
    <>
      <Header text={lobbyStore.code ?? ""} headerStyle="code" />
      <Header text="Ты даришь подарок игроку" />
      <Header className="mb-23" text={giving} headerStyle="italic" />
      {lobbyStore.preferences && (
        <Button
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
            label="Перемешать"
            className={styles.button}
            onClick={onClickStart}
          />
          <Help className="mt-10" message="Появились новые гости?" />
        </>
      )}
    </>
  );
});
