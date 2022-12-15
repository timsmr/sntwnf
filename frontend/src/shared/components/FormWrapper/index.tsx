import Header from "../Header";
import { FormWrapperProps } from "./types/types";

import styles from './index.module.scss'


export function FormWrapper({ title, children }: FormWrapperProps) {
    return (
        <>
            <Header text={title} className={styles.header} />
            <div className={styles.children}>
                {children}
            </div>
        </>
    )
}