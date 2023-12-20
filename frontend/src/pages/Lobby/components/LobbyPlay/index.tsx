import { apiService } from "api/apiService";
import { observer } from "mobx-react";
import { Button } from "shared/components/Button";
import { Header } from "shared/components/Header";
import { Help } from "shared/components/Help";
import { useStore } from "stores";
import * as T from "./types/types";
import { Hint } from "../Hint";
import styles from "./index.module.scss";

export const LobbyPlay = observer(({ giving, isAdmin }: T.LobbyPlayProps) => {
  const { popupStore, lobbyStore, guestId } = useStore();

  const onShuffleClick = async () => {
    if (!lobbyStore.code) return;

    await apiService.shuffle(lobbyStore.code)

    if (!guestId) return;

    await apiService.getGuest(Number(guestId)).then(async (res) => {
      if (!res.data['giving_to']) return;

      await apiService.getGuest(res.data["giving_to"]).then(async (res) => {
        if (!res.data["user"]) return;

        await apiService.getUser(res.data["user"]).then((res) => {
          lobbyStore.setGivingTo(res.name);
          lobbyStore.setPref(res.preferences);
        });
      });
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
            onClick={onShuffleClick}
          />
          <Help className={styles.help} message="Появились новые гости?" />
        </>
      )}
    </div>
  );
});
