import React from "react";
import { FormWrapper } from "shared/components/FormWrapper";
import { InputField } from "shared/components/InputField";
import { Textarea } from "shared/components/Textarea";
import * as I from "../types/types";

import styles from "./index.module.scss";

const PersonalData = ({
  name,
  preferences,
  updateFields,
}: I.PersonalDataProps) => {
  return (
    <FormWrapper title="Остался последний шаг: заполни свои данные, чтобы твоим друзьям было легче подобрать тебе подарок!">
      <InputField
        className={styles.inputRegisterDetail}
        inputPlaceholder="Имя"
        value={name}
        onChange={(e) =>
          updateFields({ name: (e.target as HTMLButtonElement).value })
        }
        required
      />
      <Textarea
        className={styles.textareaRegisterDetail}
        textareaPlaceholder="Подсказка для подарка..."
        value={preferences}
        onChange={(e) =>
          updateFields({ preferences: (e.target as HTMLButtonElement).value })
        }
      />
    </FormWrapper>
  );
};

export default PersonalData;
