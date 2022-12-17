import { useStore } from "stores";
import Header from "shared/components/Header";
import Loader from "shared/components/Loader";

import * as I from "./types/types";

const LobbyWaitGuest = ({}: I.LobbyWaitGuestProps) => {
  const { lobbyStore } = useStore();

  return (
    <>
      <Header
        text={lobbyStore.code ? lobbyStore.code : ""}
        headerStyle="code"
      />
      <Header className="mb-100" text="Ждем начала игры" />
      <Loader />
    </>
  );
};

export default LobbyWaitGuest;
