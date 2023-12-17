import React from "react";

export type InputFieldProps = React.HTMLAttributes<HTMLInputElement> & {
  inputType?: "text" | "date" | "password";
  isInvalidValue?: boolean;
  inputPlaceholder: string;
  inputMaxLength?: number;
  value?: string;
  required?: boolean;
};
