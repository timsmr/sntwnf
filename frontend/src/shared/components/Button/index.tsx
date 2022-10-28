import React from 'react'
import styles from './index.module.scss';
import cn from 'classnames'

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  label: string;
  buttonStyle?: 'primary' | 'info' | 'danger' | 'shuffle';
  fsz?: number;
}

const Button: React.FC<ButtonProps> = ({ label, buttonStyle = '', className }) => {
  const buttonStyles = cn(
    styles.button,
    styles[`style_${buttonStyle}`],
    className
  )
  return (
    <button className={buttonStyles}>{label}</button>
  )
}

export default Button
