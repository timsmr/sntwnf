import { observer } from 'mobx-react'
import React from 'react'
import Button from '../../../../shared/components/Button'

import styles from './index.module.scss'

type HintProps = {
    message: string,
    handleButtonClick: () => void;
}

const Hint: React.FC<HintProps> = ({ message, handleButtonClick, }) => {
    return (
        <div className={styles.hint_background}>
            <div className={styles.hint}>
                <p className={styles.info}>
                    {message}
                </p>
                <Button onClick={handleButtonClick} label='Ок' buttonStyle='info' />
            </div>
        </div>
    )
}

export default observer(Hint);