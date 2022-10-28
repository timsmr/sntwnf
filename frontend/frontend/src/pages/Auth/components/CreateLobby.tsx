import React from 'react'

import Button from '../../../shared/components/Button'
import Header from '../../../shared/components/Header';
import InputField from '../../../shared/components/InputField'

type CreateLobbyProps = {}

const CreateLobby: React.FC<CreateLobbyProps> = ({ }) => {
    return (
        <>
            <Header className='mb-23' text='Создание лобби' />
            <InputField className='mb-15' inputPlaceholder='Название лобби' />
            <InputField className='mb-15' inputType='date' inputPlaceholder='dd/mm/yyyy' />
            <Button label='Создать' buttonStyle='primary' />
        </>
    )
}

export default CreateLobby