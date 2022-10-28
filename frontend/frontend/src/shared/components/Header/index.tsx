import React from 'react'
import cn from 'classnames'

import styles from './index.module.scss'

type HeaderProps = React.HTMLAttributes<HTMLHeadingElement> & {
    text: string;
    headerStyle?: 'bold' | 'code' | 'italic';
}

const Header: React.FC<HeaderProps> = ({ text, headerStyle = 'normal', className }) => {
    const headerStyles = cn(
        styles.header,
        styles[`style_${headerStyle}`],
        className
    )

    return (
        <h1 className={headerStyles}>{text}</h1>
    )
}

export default Header