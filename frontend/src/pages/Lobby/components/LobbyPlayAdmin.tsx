import { observer } from 'mobx-react';
import React from 'react'

import Button from '../../../shared/components/Button';
import Header from '../../../shared/components/Header';
import Help from '../../../shared/components/Help';
import { useStore } from '../../../stores';
import Hint from './Hint';

import * as I from './types/types';

const LobbyPlayAdmin = ({ giving }: I.LobbyPlayAdminProps) => {

    const { popupStore, lobbyStore } = useStore();

    return (
        <>
            <Header text={lobbyStore.code ? lobbyStore.code : ''} headerStyle='code' />
            <Header text='Ты даришь подарок игроку' />
            <Header className='mb-23' text={giving} headerStyle='italic' />
            <Button onClick={popupStore.changeValue} className='mb-40' label='Подсказка' buttonStyle='info' />
            {popupStore.isOpened && <Hint handleButtonClick={popupStore.changeValue} message='ddsfsdfljnsdfksdbfg asjfgkjs' />}
            <Button label='Перемешать' buttonStyle='shuffle' />
            <Help className='mt-10' message='Появились новые гости?' />
        </>
    )
}

export default observer(LobbyPlayAdmin);