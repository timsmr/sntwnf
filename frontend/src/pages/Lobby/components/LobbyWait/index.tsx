import { apiService } from "api/apiService";
import { useStore } from "stores";
import { Button } from "shared/components/Button";
import { Header } from "shared/components/Header";
import { Help } from "shared/components/Help";
import { Loader } from "shared/components/Loader";
import * as T from "./types/types";

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
    <>
      <Header
        className="mb-100"
        text={lobbyStore.code ?? ""}
        headerStyle="bold"
      />
      {!isAdmin && (
        <>
          <Header className="mb-100" text="Ждем начала игры" />
          <Loader />
        </>
      )}
      {isAdmin && (
        <>
          <Button
            label="Начать!"
            buttonStyle="primary"
            onClick={onClickStart}
          />
          <Help className="mt-10" message="Все зашли? Нажми начать!" />
        </>
      )}
    </>
  );
};
