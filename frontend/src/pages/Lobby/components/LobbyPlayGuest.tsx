import { observer } from 'mobx-react';
import React from 'react'

import Button from '../../../shared/components/Button';
import Header from '../../../shared/components/Header';
import { PopupStore } from '../../../stores/PopupStore/PopupStore';
import Hint from './Hint';

type LobbyPlayGuestProps = {
    giving: string;
}

const isHintOpened = new PopupStore();

const LobbyPlayGuest: React.FC<LobbyPlayGuestProps> = ({ giving }) => {

    return (
        <>
            <Header text='STRFER' headerStyle='code' />
            <Header text='Ты даришь подарок игроку' />
            <Header className='mb-23' text={giving} headerStyle='italic' />
            <Button onClick={isHintOpened.changeValue} className='mb-40' label='Подсказка' buttonStyle='info' />
            {isHintOpened.isOpened && <Hint handleButtonClick={isHintOpened.changeValue} message='ddsfsdfljnsdfksdbfg asjfgkjs' />}
        </>
    )
}

export default observer(LobbyPlayGuest);