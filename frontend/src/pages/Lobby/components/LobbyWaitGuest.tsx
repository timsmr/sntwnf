import React from 'react'
import Header from '../../../shared/components/Header'
import Loader from '../../../shared/components/Loader'

import * as I from './types/types';

const LobbyWaitGuest = ({ }: I.LobbyWaitGuestProps) => {
    return (
        <>
            <Header text='STRFER' headerStyle='code' />
            <Header className='mb-100' text='Ждем начала игры' />
            <Loader />
        </>
    )
}

export default LobbyWaitGuest