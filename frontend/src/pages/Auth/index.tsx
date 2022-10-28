import React from 'react'
import cn from 'classnames'

import CreateLobby from './components/CreateLobby'
import JoinLobby from './components/JoinLobby'
import LogIn from './components/LogIn'
import Register from './components/Register'
import styles from './index.module.scss'
import BackButton from '../../shared/components/BackButton'


type AuthProps = React.HTMLAttributes<HTMLDivElement> & {}

const Auth: React.FC<AuthProps> = ({ className }) => {
    const AuthStyles = cn(
        styles.auth,
        className
    )

    return (
        <div className={AuthStyles}>
            <BackButton />
            <LogIn />
        </div>
    )
}

export default Auth