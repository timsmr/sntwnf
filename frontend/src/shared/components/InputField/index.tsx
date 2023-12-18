import styles from "./index.module.scss";
import cn from "classnames";
import * as I from "./types/types";

export const InputField = ({
  inputType = "text",
  inputPlaceholder,
  inputMaxLength,
  isInvalidValue,
  value,
  onChange,
  className,
  required,
}: I.InputFieldProps) => {
  const inputStyles = cn(
    styles.inputField,
    isInvalidValue && styles.warning,
    className
  );

  return (
    <input
      value={value}
      onChange={onChange}
      className={inputStyles}
      type={inputType}
      placeholder={inputPlaceholder}
      maxLength={inputMaxLength}
      required={required}
    />
  );
};
