import React from 'react'

import Button from '../../../shared/components/Button';
import Header from '../../../shared/components/Header';

type LobbyPlayGuestProps = {
    giving: string;
}

const LobbyPlayGuest: React.FC<LobbyPlayGuestProps> = ({ giving }) => {
    return (
        <>
            <Header text='STRFER' headerStyle='code' />
            <Header text='Ты даришь подарок игроку' />
            <Header className='mb-23' text={giving} headerStyle='italic' />
            <Button className='mb-40' label='Подсказка' buttonStyle='info' />
        </>
    )
}

export default LobbyPlayGuest