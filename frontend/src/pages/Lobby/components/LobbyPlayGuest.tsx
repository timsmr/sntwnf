import { observer } from 'mobx-react';
import React from 'react'

import Button from '../../../shared/components/Button';
import Header from '../../../shared/components/Header';
import { useStore } from '../../../stores';
import Hint from './Hint';

import * as I from './types/types';

const LobbyPlayGuest = ({ giving }: I.LobbyPlayGuestProps) => {

    const { popupStore, lobbyStore } = useStore();

    return (
        <>
            <Header text={lobbyStore.code ? lobbyStore.code : ''} headerStyle='code' />
            <Header text='Ты даришь подарок игроку' />
            <Header className='mb-23' text={giving} headerStyle='italic' />
            {lobbyStore.preferences && <Button onClick={popupStore.changeValue} className='mb-40' label='Подсказка' buttonStyle='info' />}
            {popupStore.isOpened && <Hint handleButtonClick={popupStore.changeValue} message={lobbyStore.preferences ? lobbyStore.preferences : ''} />}
        </>
    )
}

export default observer(LobbyPlayGuest);