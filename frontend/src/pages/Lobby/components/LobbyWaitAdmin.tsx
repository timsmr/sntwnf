import { apiService } from "api/apiService";
import { useStore } from "stores";
import Button from "../../../shared/components/Button";
import Header from "../../../shared/components/Header";
import Help from "../../../shared/components/Help";

import * as I from "./types/types";

const LobbyWaitAdmin = ({ }: I.LobbyWaitAdminProps) => {
  const { lobbyStore, getGivingToGuest } = useStore();

  const onClickStart = async () => {
    await apiService.startGame(lobbyStore.code!).then(() => {
      lobbyStore.setLobbyStarted(true);
    });

    getGivingToGuest();
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
