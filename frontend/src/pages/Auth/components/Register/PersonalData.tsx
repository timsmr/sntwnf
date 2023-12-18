import { InputField } from "shared/components/InputField";
import { Textarea } from "shared/components/Textarea";
import * as I from "../types/types";

import styles from "./index.module.scss";
import { Header } from "shared/components/Header";

const PersonalData = ({
  name,
  preferences,
  updateFields,
}: I.PersonalDataProps) => {
  return (
    <>
      <Header className={styles.headerRegisterDetail} text="Остался последний шаг: заполни свои данные, чтобы твоим друзьям было легче подобрать тебе подарок!" />
      <InputField
        className={styles.inputName}
        inputPlaceholder="Имя"
        value={name}
        onChange={(e) =>
          updateFields({ name: (e.target as HTMLButtonElement).value })
        }
        required
      />
      <Textarea
        className={styles.textarea}
        textareaPlaceholder="Подсказка для подарка..."
        value={preferences}
        onChange={(e) =>
          updateFields({ preferences: (e.target as HTMLButtonElement).value })
        }
      />
    </>
  );
};

export default PersonalData;
