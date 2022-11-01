import React from 'react'
import cn from 'classnames'

import styles from './index.module.scss'

type BackButtonProps = React.HTMLAttributes<HTMLSpanElement> & {}

export const BackButton = ({ className }: BackButtonProps) => {
    const backButtonStyles = cn(
        styles.backButton,
        className
    )

    return (
        <span className={backButtonStyles}></span>
    )
}