import React from "react";

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  buttonStyle?: "" | "primary" | "info" | "danger" | "shuffle";
};
