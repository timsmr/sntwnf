import React from 'react'
import Header from '../../../shared/components/Header'
import Loader from '../../../shared/components/Loader'

type LobbyWaitGuestProps = {}

const LobbyWaitGuest: React.FC<LobbyWaitGuestProps> = () => {
    return (
        <>
            <Header text='STRFER' headerStyle='code' />
            <Header className='mb-100' text='Ждем начала игры' />
            <Loader />
        </>
    )
}

export default LobbyWaitGuest