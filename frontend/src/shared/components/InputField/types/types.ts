import React from "react";

export type InputFieldProps = React.HTMLAttributes<HTMLInputElement> & {
    inputType?: 'text' | 'date' | 'password',
    inputStyle?: '' | 'warning',
    inputPlaceholder: string,
    inputMaxLength?: number,
    value?: string,
};