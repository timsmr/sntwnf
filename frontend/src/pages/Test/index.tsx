import React, { useState } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import styles from './index.module.scss'
import { BackButton } from '../../shared/components/BackButton'
import Button from './../../shared/components/Button'
import Header from './../../shared/components/Header';
import InputField from './../../shared/components/InputField'
import { InputStyle } from 'shared/components/InputField/types/types';

import * as I from './types/types';
import { useStore } from '../../stores'
import axios from 'axios';

export const Test = ({ className }: I.CreateLobbyProps) => {
    const testStyles = cn(
        styles.auth,
        className
    )

    return (
        <div className={testStyles}>
            <Link to='/' ><BackButton /></Link>
            <Header className='mb-23' text='Создание лобби' />

            <form action="">
                <input type="text" required />
                <InputField inputPlaceholder='Логин' required />
                <Button label='Создать' buttonStyle='primary' />
            </form>


        </div>
    )
}