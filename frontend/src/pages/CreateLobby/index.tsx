import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import styles from './index.module.scss'
import { BackButton } from '../../shared/components/BackButton'
import Button from './../../shared/components/Button'
import Header from './../../shared/components/Header';
import InputField from './../../shared/components/InputField'



type CreateLobbyProps = React.HTMLAttributes<HTMLDivElement> & {}

export const CreateLobby = ({ className }: CreateLobbyProps) => {
    const AuthStyles = cn(
        styles.auth,
        className
    )

    return (
        <div className={AuthStyles}>
            <Link to='/' ><BackButton /></Link>
            <Header className='mb-23' text='Создание лобби' />
            <InputField className='mb-15' inputPlaceholder='Название лобби' />
            <InputField className='mb-15' inputType='date' inputPlaceholder='dd/mm/yyyy' />
            <Button label='Создать' buttonStyle='primary' />
        </div>
    )
}