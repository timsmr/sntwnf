import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "stores";
import styles from "./index.module.scss";
import { Button } from "shared/components/Button";
import { Header } from "shared/components/Header";
import { Help } from "shared/components/Help";
import { InputField } from "shared/components/InputField";
import { apiService } from "api/apiService";

export const LogIn = () => {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isLoginInvalid, setIsLoginInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const { currentUser, getUserId } = useStore();
  const navigate = useNavigate();

  const onChangeLoginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginValue(event.target.value);
    setIsLoginInvalid(false);
  };

  const onChangePasswordInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordValue(event.target.value);
    setIsPasswordInvalid(false);
  };

  const onSubmit = async () => {
    if (loginValue && passwordValue) {
      await apiService.login(loginValue, passwordValue);

      currentUser.setUserToken(localStorage.getItem("access_token"));
      currentUser.setUserId(getUserId());

      navigate("/");
    } else {
      !loginValue && setIsLoginInvalid(true);
      !passwordValue && setIsPasswordInvalid(true);
    }
  };

  return (
    <div className={styles.root}>
      <Header className={styles.header} text="Вход" />
      <InputField
        className={styles.input}
        inputPlaceholder="Логин"
        value={loginValue}
        isInvalidValue={isLoginInvalid}
        onChange={onChangeLoginInput}
      />
      <InputField
        className={styles.input}
        inputPlaceholder="Пароль"
        inputType={"password"}
        value={passwordValue}
        isInvalidValue={isPasswordInvalid}
        onChange={onChangePasswordInput}
      />
      <Button
        className={styles.button}
        buttonStyle="primary"
        label="Войти"
        onClick={onSubmit}
      />
      <Help
        className={styles.help}
        message="Нет аккаунта?"
        linkMessage="Тыкни на меня!"
        link="/auth/register"
      />
    </div>
  );
};
