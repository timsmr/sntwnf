import React from 'react'
import cn from 'classnames'

import styles from './index.module.scss'

type HelpProps = React.HTMLAttributes<HTMLParagraphElement> & {
    message: string;
    linkMessage?: string;
}

const Help: React.FC<HelpProps> = ({ message, linkMessage, className }) => {
    const helpStyles = cn(
        styles.help,
        className
    )

    return (
        <p className={helpStyles}>
            {message} {linkMessage && <a className={styles.link}>{linkMessage}</a>}
        </p>
    )
}

export default Help