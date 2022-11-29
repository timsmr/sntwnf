import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import styles from './index.module.scss'
import { BackButton } from '../../shared/components/BackButton'
import Button from './../../shared/components/Button'
import Header from './../../shared/components/Header';
import InputField from './../../shared/components/InputField'

import * as I from './types/types';

export const JoinLobby = ({ className }: I.JoinLobbyProps) => {
    const AuthStyles = cn(
        styles.auth,
        className
    )

    return (
        <div className={AuthStyles}>
            <Link to='/' ><BackButton /></Link>
            <Header className='mb-23' text='Код лобби' />
            <InputField className='mb-15' inputPlaceholder='******' inputMaxLength={6} />
            <Button label='Далее' buttonStyle='primary' />
        </div>
    )
}