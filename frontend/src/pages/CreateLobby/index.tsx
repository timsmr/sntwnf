import React, { useState } from 'react'
import cn from 'classnames'
import { Link, redirect } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import styles from './index.module.scss'
import { BackButton } from '../../shared/components/BackButton'
import Button from './../../shared/components/Button'
import Header from './../../shared/components/Header';
import InputField from './../../shared/components/InputField'

import * as I from './types/types';
import { useStore } from '../../stores'

export const CreateLobby = ({ className }: I.CreateLobbyProps) => {
    const AuthStyles = cn(
        styles.auth,
        className
    )

    const [nameValue, setNameValue] = useState('');
    const [dateValue, setDateValue] = useState('');
    const { currentUser } = useStore();
    const navigate = useNavigate();

    const onChangeNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(event.target.value);
    }

    const onChangeDateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateValue(event.target.value);
    }

    const onSubmit = () => {
        currentUser.userId ? navigate("/lobby/123") : navigate("/auth/login");
    };

    return (
        <div className={AuthStyles}>
            <Link to='/' ><BackButton /></Link>
            <Header className='mb-23' text='Создание лобби' />
            <InputField className='mb-15' value={nameValue} inputStyle='warning' onChange={onChangeNameInput} inputPlaceholder='Название лобби' />
            <InputField className='mb-15' value={dateValue} onChange={onChangeDateInput} inputType='date' inputPlaceholder='dd/mm/yyyy' />
            <Button label='Создать' buttonStyle='primary' onClick={onSubmit} />
        </div>
    )
}