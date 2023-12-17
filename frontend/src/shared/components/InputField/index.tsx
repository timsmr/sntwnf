import styles from "./index.module.scss";
import cn from "classnames";
import * as I from "./types/types";
import { useState } from "react";

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
  const [isInvalid, setIsInvalid] = useState(!!isInvalidValue);
  const inputStyles = cn(
    styles.inputField,
    isInvalid && styles.warning,
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
      onInvalid={() => setIsInvalid(true)}
    />
  );
};
