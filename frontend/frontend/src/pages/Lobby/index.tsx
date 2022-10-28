import React from 'react'
import cn from 'classnames'

import styles from './index.module.scss'
import LobbyPlayAdmin from './components/LobbyPlayAdmin';
import LobbyWaitAdmin from './components/LobbyWaitAdmin';
import LobbyWaitGuest from './components/LobbyWaitGuest';
import LobbyPlayGuest from './components/LobbyPlayGuest';
import BackButton from '../../shared/components/BackButton';
import Hint from './components/Hint';

type LobbyProps = React.HTMLAttributes<HTMLDivElement> & {
    isHost?: boolean;
}

const Lobby: React.FC<LobbyProps> = ({ isHost = false, className }) => {
    const lobbyStyles = cn(
        styles.lobby,
        className
    )
    return (
        <div className={lobbyStyles}>
            <BackButton />
            <LobbyPlayGuest giving='лооол' />
            {/* <Hint message='dicks' /> */}
        </div>
    )
}

export default Lobby