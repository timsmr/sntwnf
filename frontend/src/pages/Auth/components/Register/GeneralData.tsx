import React from "react";

import { FormWrapper } from "shared/components/FormWrapper";
import { InputField } from "shared/components/InputField";
import * as I from "../types/types";

const GeneralData = ({ login, password, updateFields }: I.GeneralDataProps) => {
  return (
    <FormWrapper title="Регистрация">
      <InputField
        inputPlaceholder="Логин"
        value={login}
        onChange={(e) =>
          updateFields({ login: (e.target as HTMLButtonElement).value })
        }
        required
      />
      <InputField
        inputPlaceholder="Пароль"
        inputType={"password"}
        value={password}
        onChange={(e) =>
          updateFields({ password: (e.target as HTMLButtonElement).value })
        }
        required
      />
    </FormWrapper>
  );
};

export default GeneralData;
