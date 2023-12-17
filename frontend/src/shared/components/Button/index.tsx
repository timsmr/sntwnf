import styles from "./index.module.scss";
import cn from "classnames";
import * as I from "./types/types";

export const Button = ({
  label,
  buttonStyle = "",
  className,
  onClick,
  type = "button",
}: I.ButtonProps) => {
  const buttonStyles = cn(
    styles.button,
    styles[`style_${buttonStyle}`],
    className
  );

  return (
    <button type={type} onClick={onClick} className={buttonStyles}>
      {label}
    </button>
  );
};
