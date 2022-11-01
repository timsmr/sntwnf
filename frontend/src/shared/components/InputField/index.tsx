import React from 'react'
import styles from './index.module.scss'
import cn from 'classnames'

type InputFieldProps = React.HTMLAttributes<HTMLInputElement> & {
    inputType?: 'text' | 'date' | 'password';
    inputStyle?: string;
    inputPlaceholder: string;
    inputMaxLength?: number;
}

const InputField = ({ inputType = 'text', inputStyle = '', inputPlaceholder, inputMaxLength, className }: InputFieldProps) => {
    const inputStyles = cn(
        styles.inputField,
        styles[`style_${inputStyle}`],
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