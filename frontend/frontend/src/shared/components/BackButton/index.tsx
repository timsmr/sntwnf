import React from 'react'
import cn from 'classnames'

import styles from './index.module.scss'

type BackButtonProps = React.HTMLAttributes<HTMLSpanElement> & {}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
    const backButtonStyles = cn(
        styles.backButton,
        className
    )

    return (
        <span className={backButtonStyles}></span>
    )
}

export default BackButton