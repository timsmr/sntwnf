import { observer } from 'mobx-react';
import React from 'react'

import Button from '../../../shared/components/Button';
import Header from '../../../shared/components/Header';
import { useStore } from '../../../stores';
import Hint from './Hint';

import * as I from './types/types';

const LobbyPlayGuest = ({ giving }: I.LobbyPlayGuestProps) => {

    const { popupStore } = useStore();

    return (
        <>
            <Header text='STRFER' headerStyle='code' />
            <Header text='Ты даришь подарок игроку' />
            <Header className='mb-23' text={giving} headerStyle='italic' />
            <Button onClick={popupStore.changeValue} className='mb-40' label='Подсказка' buttonStyle='info' />
            {popupStore.isOpened && <Hint handleButtonClick={popupStore.changeValue} message='ddsfsdfljnsdfksdbfg asjfgkjs' />}
        </>
    )
}

export default observer(LobbyPlayGuest);