import React from 'react'
import Button from '../../../shared/components/Button'
import Header from '../../../shared/components/Header'
import Help from '../../../shared/components/Help'

import * as I from './types/types';

const LobbyWaitAdmin = ({ }: I.LobbyWaitAdminProps) => {
    return (
        <>
            <Header className='mb-100' text='STRFER' headerStyle='bold' />
            <Button label='Начать!' buttonStyle='primary' />
            <Help className='mt-10' message='Все зашли? Нажми начать!' />
        </>
    )
}

export default LobbyWaitAdmin