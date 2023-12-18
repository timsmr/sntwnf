import { InputField } from "shared/components/InputField";
import * as I from "../types/types";
import styles from './index.module.scss';
import { Header } from "shared/components/Header";

const GeneralData = ({ login, password, updateFields }: I.GeneralDataProps) => {
  return (
    <>
      <Header className={styles.header} text="Регистрация" />
      <InputField
        className={styles.input}
        inputPlaceholder="Логин"
        value={login}
        onChange={(e) =>
          updateFields({ login: (e.target as HTMLButtonElement).value })
        }
        required
      />
      <InputField
        className={styles.input}
        inputPlaceholder="Пароль"
        inputType={"password"}
        value={password}
        onChange={(e) =>
          updateFields({ password: (e.target as HTMLButtonElement).value })
        }
        required
      />
    </>
  );
};

export default GeneralData;
