import { FormWrapperProps } from "./types/types";
import styles from "./index.module.scss";

export const FormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <div className={styles.children}>{children}</div>
  );
};
