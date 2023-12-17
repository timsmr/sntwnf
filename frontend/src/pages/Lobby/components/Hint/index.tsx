import { Button } from "../../../../shared/components/Button";

import styles from "./index.module.scss";
import * as I from "./types/types";

export const Hint = ({ message, handleButtonClick }: I.HintProps) => {
  return (
    <div className={styles.hint_background}>
      <div className={styles.hint}>
        <p className={styles.info}>{message}</p>
        <Button onClick={handleButtonClick} label="Ок" />
      </div>
    </div>
  );
};
