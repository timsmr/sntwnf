import React from "react";

export type InputStyle = '' | 'warning';

export type InputFieldProps = React.HTMLAttributes<HTMLInputElement> & {
    inputType?: 'text' | 'date' | 'password',
    inputStyle?: InputStyle,
    inputPlaceholder: string,
    inputMaxLength?: number,
    value?: string,
    required?: boolean
};