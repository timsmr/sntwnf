import React, { useState } from 'react'
import cn from 'classnames'
import { Link, useNavigate } from 'react-router-dom'

import styles from './index.module.scss'
import { BackButton } from '../../shared/components/BackButton'
import Button from './../../shared/components/Button'
import Header from './../../shared/components/Header';
import InputField from './../../shared/components/InputField'

import * as I from './types/types';
import { useStore } from 'stores'
import { InputStyle } from 'shared/components/InputField/types/types'
import axios from 'axios'

export const JoinLobby = ({ className }: I.JoinLobbyProps) => {
    const AuthStyles = cn(
        styles.auth,
        className
    );

    const [codeValue, setCodeValue] = useState('');
    const [codeStyle, setCodeStyle] = useState<InputStyle>('');
    const { currentUser, lobbyStore } = useStore();
    const navigate = useNavigate();

    const onChangeCodeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCodeValue(event.target.value);
        setCodeStyle('');
    }

    const onSubmit = async () => {
        codeValue
            ? await axios(`/lobbies/${codeValue}`)
                .then(function (response) {
                    if (response.data) {
                        // lobbyStore.setLobbyCode(response.data.id)
                        console.log(lobbyStore)
                        navigate(`/lobby/${codeValue}`);
                    } else {
                        setCodeStyle('warning');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
            : setCodeStyle('warning');

    };

    return (
        <div className={AuthStyles}>
            <Link to='/' ><BackButton /></Link>
            <Header className='mb-23' text='Код лобби' />
            <InputField
                className='mb-15'
                inputPlaceholder='******'
                inputMaxLength={6}
                value={codeValue}
                onChange={onChangeCodeInput}
                inputStyle={codeStyle}
            />
            <Button label='Далее' buttonStyle='primary' onClick={onSubmit} />
        </div>
    )
}