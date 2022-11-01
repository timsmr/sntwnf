import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom';

import styles from './index.module.scss'
import LobbyPlayAdmin from './components/LobbyPlayAdmin';
import LobbyWaitAdmin from './components/LobbyWaitAdmin';
import LobbyWaitGuest from './components/LobbyWaitGuest';
import LobbyPlayGuest from './components/LobbyPlayGuest';
import { BackButton } from '../../shared/components/BackButton';

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
            <Link to='/' ><BackButton /></Link>
            <LobbyPlayAdmin giving='лооол' />
        </div>
    )
}

export default Lobby