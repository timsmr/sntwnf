import React from 'react'

import Button from '../../../../shared/components/Button'
import Header from '../../../../shared/components/Header';
import Help from '../../../../shared/components/Help';
import InputField from '../../../../shared/components/InputField'

import * as I from '../types/types';

const LogIn = ({ }: I.LogInProps) => {
    return (
        <>
            <Header className='mb-23' text='Вход' />
            <InputField className='mb-15' inputPlaceholder='Логин' />
            <InputField className='mb-15' inputPlaceholder='Пароль' inputType={'password'} />
            <Button label='Далее' buttonStyle='primary' />
            <Help className='mt-10' message='Нет аккаунта?' linkMessage='Тыкни на меня!' link='/auth/register' />
        </>
    );
}

export default LogIn;