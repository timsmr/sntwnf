import cn from "classnames";
import { Link } from "react-router-dom";

import styles from "./index.module.scss";
import { BackButton } from "../../shared/components/BackButton";

import * as I from "./types/types";
import { useStore } from "stores";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { Loader } from "shared/components/Loader";
import { LobbyWait } from "./components/LobbyWait";
import { LobbyPlay } from "./components/LobbyPlay";

export const Lobby = observer(function Lobby({ className }: I.LobbyProps) {
  const lobbyStyles = cn(styles.lobby, className);

  const [isLoading, setIsLoading] = useState(false);

  const { currentUser, lobbyStore, fetchLobbyData } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchLobbyData();
      setIsLoading(false);
    };

    if (isLoading) return;

    fetchData();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className={lobbyStyles}>
      <Link to="/" onClick={() => lobbyStore.clear()}>
        <BackButton />
      </Link>

      {lobbyStore.started ? (
        <LobbyPlay
          giving={lobbyStore.givingName ?? ""}
          isAdmin={currentUser.isHost}
        />
      ) : (
        <LobbyWait isAdmin={currentUser.isHost} />
      )}
    </div>
  );
});
