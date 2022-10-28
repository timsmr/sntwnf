import React from 'react'
import Button from '../../../../shared/components/Button'

import styles from './index.module.scss'

type HintProps = {
    message: string
}

const Hint: React.FC<HintProps> = ({ message }) => {
    return (
        <div className={styles.hint_background}>
            <div className={styles.hint}>
                <p className={styles.info}>
                    {message}
                </p>
                <Button label='Ок' buttonStyle='info' />
            </div>
        </div>
    )
}

export default Hint