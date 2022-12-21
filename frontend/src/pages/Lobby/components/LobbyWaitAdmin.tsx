import { apiService } from "api/apiService";
import React, { useState } from "react";
import { useStore } from "stores";
import Button from "../../../shared/components/Button";
import Header from "../../../shared/components/Header";
import Help from "../../../shared/components/Help";

import * as I from "./types/types";

const LobbyWaitAdmin = ({}: I.LobbyWaitAdminProps) => {
  const { lobbyStore, currentUser } = useStore();
  const store = useStore();

  const [givingToId, setGivingTo] = useState<any>(null);
  const [ebal, setEbal] = useState<any>(null);

  const onClickStart = async () => {
    await apiService.startGame(lobbyStore.code!).then(() => {
      lobbyStore.setLobbyStarted(true);
    });

    await store.getLobbyGuest();

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
        className="mb-100"
        text={lobbyStore.code ? lobbyStore.code : ""}
        headerStyle="bold"
      />
      <Button label="Начать!" buttonStyle="primary" onClick={onClickStart} />
      <Help className="mt-10" message="Все зашли? Нажми начать!" />
    </>
  );
};

export default LobbyWaitAdmin;
