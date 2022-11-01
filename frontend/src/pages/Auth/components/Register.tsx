import React from 'react'

import Button from '../../../shared/components/Button'
import Header from '../../../shared/components/Header';
import Help from '../../../shared/components/Help';
import InputField from '../../../shared/components/InputField'

type RegisterProps = {}

const Register: React.FC<RegisterProps> = ({ }) => {
    return (
        <>
            <Header className='mb-23' text='Регистрация' />
            <InputField className='mb-15' inputPlaceholder='Логин' />
            <InputField className='mb-15' inputPlaceholder='Пароль' inputType={'password'} />
            <InputField className='mb-15' inputPlaceholder='Повторите пароль' inputType={'password'} />
            <Button label='Далее' buttonStyle='primary' />
            <Help className='mt-10' message='Есть аккаунт?' linkMessage='Тыкни на меня!' link='/auth/login' />
            <p className='auth__help'>
                <a className='auth__help__link'></a>
            </p>
        </>
    )
}

export default Register