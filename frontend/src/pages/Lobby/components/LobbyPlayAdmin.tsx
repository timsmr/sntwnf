import { apiService } from "api/apiService";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";

import Button from "../../../shared/components/Button";
import Header from "../../../shared/components/Header";
import Help from "../../../shared/components/Help";
import { useStore } from "../../../stores";
import Hint from "./Hint";

import * as I from "./types/types";

const LobbyPlayAdmin = ({ giving }: I.LobbyPlayAdminProps) => {
  const { popupStore, lobbyStore, currentUser } = useStore();
  const store = useStore();

  const [givingToId, setGivingTo] = useState<any>(null);
  const [ebal, setEbal] = useState<any>(null);

  const onClickStart = async () => {
    await apiService.startGame(lobbyStore.code!).then(() => {
      lobbyStore.setLobbyStarted(true);
    });

    // await store.getLobbyGuest();

    const penis = JSON.parse(localStorage.getItem("guest_id")!);

    if (!penis) return;

    await apiService.getGuest(penis[0]["giving_to"]).then((res) => {
      setGivingTo(res.data["giving_to"]);
    });

    await apiService.getGuest(givingToId).then((res) => {
      setEbal(res.data["user"]);
    });

    await apiService.getUser(ebal).then((res) => {
      lobbyStore.setGivingTo(res.name);
      lobbyStore.setPref(res.preferences);
    });
  };
  return (
    <>
      <Header
        text={lobbyStore.code ? lobbyStore.code : ""}
        headerStyle="code"
      />
      <Header text="Ты даришь подарок игроку" />
      <Header className="mb-23" text={giving} headerStyle="italic" />
      {lobbyStore.preferences && <Button
        onClick={popupStore.changeValue}
        className="mb-40"
        label="Подсказка"
        buttonStyle="info"
      />}
      {popupStore.isOpened && <Hint handleButtonClick={popupStore.changeValue} message={lobbyStore.preferences ? lobbyStore.preferences : ''} />}
      <Button label="Перемешать" buttonStyle="shuffle" onClick={onClickStart} />
      <Help className="mt-10" message="Появились новые гости?" />
    </>
  );
};

export default observer(LobbyPlayAdmin);
