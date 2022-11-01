import React from 'react'
import styles from './index.module.scss';
import cn from 'classnames'

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  label: string;
  buttonStyle?: 'primary' | 'info' | 'danger' | 'shuffle';
  fsz?: number;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, buttonStyle = '', className, onClick }) => {
  const buttonStyles = cn(
    styles.button,
    styles[`style_${buttonStyle}`],
    className
  )
  return (
    <button onClick={onClick} className={buttonStyles}>{label}</button>
  )
}

export default Button
