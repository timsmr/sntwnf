import React from 'react'
import Button from '../../../shared/components/Button'
import Header from '../../../shared/components/Header';
import InputField from '../../../shared/components/InputField'

type JoinLobbyProps = {}

const JoinLobby: React.FC<JoinLobbyProps> = ({ }) => {
    return (
        <>
            <Header className='mb-23' text='Код лобби' />
            <InputField className='mb-15' inputPlaceholder='******' inputMaxLength={6} />
            <Button label='Далее' buttonStyle='primary' />
        </>
    )
}

export default JoinLobby