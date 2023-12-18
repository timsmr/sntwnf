import * as I from "./types/types";
import styles from "./index.module.scss";
import { Button } from "shared/components/Button";

export const ModalWindow = ({setIsAgreed, setIsOpened}: I.ModalWindowProps) => {

  return (
    <div className={styles.hint_background}>
      <div className={styles.hint}>
        <p className={styles.info}>фо риал?!</p>
        <div>
          <Button onClick={() => {setIsAgreed(true); setIsOpened(false)}} className={styles.btn} label="да" buttonStyle="primary" />
          <Button onClick={() => {setIsAgreed(false); setIsOpened(false)}} className={styles.btn} label="нет" buttonStyle="primary" />
        </div>
      </div>
    </div>
  )
}