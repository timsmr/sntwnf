import cn from "classnames";
import { Link, useNavigate } from "react-router-dom";

import styles from "./index.module.scss";
import LobbyPlayAdmin from "./components/LobbyPlayAdmin";
import LobbyWaitAdmin from "./components/LobbyWaitAdmin";
import LobbyWaitGuest from "./components/LobbyWaitGuest";
import LobbyPlayGuest from "./components/LobbyPlayGuest";
import { BackButton } from "../../shared/components/BackButton";

import * as I from "./types/types";
import { useStore } from "stores";
import { observer } from "mobx-react";

export const Lobby = observer(function Lobby({ className }: I.LobbyProps) {
  const lobbyStyles = cn(styles.lobby, className);

  const { currentUser, lobbyStore } = useStore();

  return (
    <div className={lobbyStyles}>
      <Link to="/" onClick={() => lobbyStore.clear()}>
        <BackButton />
      </Link>

      {currentUser.isHost ? (
        lobbyStore.started ? (
          <LobbyPlayAdmin giving={lobbyStore.givingName ? lobbyStore.givingName : ''} />
        ) : (
          <LobbyWaitAdmin />
        )
      ) : lobbyStore.started ? (
        <LobbyPlayGuest giving={lobbyStore.givingName ? lobbyStore.givingName : ''} />
      ) : (
        <LobbyWaitGuest />
      )}
    </div>
  );
});
