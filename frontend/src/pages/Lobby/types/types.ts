import React from "react";

export type LobbyProps = React.HTMLAttributes<HTMLDivElement> & {
    isHost?: boolean;
};