import React from 'react'

import Button from '../../../shared/components/Button';
import Header from '../../../shared/components/Header';
import Help from '../../../shared/components/Help';

type LobbyPlayAdminProps = {
    giving: string;
}

const LobbyPlayAdmin: React.FC<LobbyPlayAdminProps> = ({ giving }) => {
    return (
        <>
            <Header text='STRFER' headerStyle='code' />
            <Header text='Ты даришь подарок игроку' />
            <Header className='mb-23' text={giving} headerStyle='italic' />
            <Button className='mb-40' label='Подсказка' buttonStyle='info' />
            <Button label='Перемешать' buttonStyle='shuffle' />
            <Help className='mt-10' message='Появились новые гости?' />
        </>
    )
}

export default LobbyPlayAdmin