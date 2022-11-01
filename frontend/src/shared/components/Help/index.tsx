import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import styles from './index.module.scss'

type HelpProps = React.HTMLAttributes<HTMLParagraphElement> & {
    message: string;
    linkMessage?: string;
    link?: string;
}

const Help = ({ message, linkMessage, className, link }: HelpProps) => {
    const helpStyles = cn(
        styles.help,
        className
    )

    return (
        <p className={helpStyles}>
            {message} {linkMessage && <Link to={link ? link : ''}><span className={styles.link}>{linkMessage}</span></Link>}
        </p>
    )
}

export default Help