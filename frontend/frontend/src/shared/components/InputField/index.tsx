import React from 'react'
import styles from './index.module.scss'
import cn from 'classnames'

type InputFieldProps = React.HTMLAttributes<HTMLInputElement> & {
    inputType?: 'text' | 'date' | 'password';
    inputPlaceholder: string;
    inputMaxLength?: number;
}

const InputField: React.FC<InputFieldProps> = ({ inputType = 'text', inputPlaceholder, inputMaxLength, className }) => {
    const inputStyles = cn(
        styles.inputField,
        className
    )

    return (
        <>
            <input
                className={inputStyles}
                type={inputType}
                placeholder={inputPlaceholder}
                maxLength={inputMaxLength}
            />

        </>
    )
}

export default InputField