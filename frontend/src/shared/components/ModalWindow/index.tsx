import * as I from "./types/types";
import styles from "./index.module.scss";
import { Button } from "shared/components/Button";

export const ModalWindow = ({setIsAgreed, setIsOpened}: I.ModalWindowProps) => {

  return (
    <div className={styles.hint_background}>
      <div className={styles.hint}>
        <p className={styles.info}>фо риал?!</p>
        <div>
          <Button onClick={() => {setIsAgreed(true); setIsOpened(false)}} label="да" />
          <Button onClick={() => {setIsAgreed(false); setIsOpened(false)}} label="нет" />
        </div>
      </div>
    </div>
  )
}