import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "stores";

import Button from "shared/components/Button";
import Header from "shared/components/Header";
import Help from "shared/components/Help";
import InputField from "shared/components/InputField";
import { InputStyle } from "shared/components/InputField/types/types";
import { apiService } from "api/apiService";

import * as I from "../types/types";

const LogIn = ({}: I.LogInProps) => {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loginStyle, setLoginStyle] = useState<InputStyle>("");
  const [passwordStyle, setPasswordStyle] = useState<InputStyle>("");
  const { currentUser } = useStore();
  const navigate = useNavigate();

  const onChangeLoginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginValue(event.target.value);
    setLoginStyle("");
  };

  const onChangePasswordInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordValue(event.target.value);
    setPasswordStyle("");
  };

  const onSubmit = async () => {
    if (loginValue && passwordValue) {
      apiService.login(loginValue, passwordValue);
      navigate("/");
    } else {
      !loginValue && setLoginStyle("warning");
      !passwordStyle && setPasswordStyle("warning");
    }
  };

  return (
    <>
      <Header className="mb-23" text="Вход" />
      <InputField
        className="mb-15"
        inputPlaceholder="Логин"
        value={loginValue}
        inputStyle={loginStyle}
        onChange={onChangeLoginInput}
      />
      <InputField
        className="mb-15"
        inputPlaceholder="Пароль"
        inputType={"password"}
        value={passwordValue}
        inputStyle={passwordStyle}
        onChange={onChangePasswordInput}
      />
      <Button label="Войти" buttonStyle="primary" onClick={onSubmit} />
      <Help
        className="mt-10"
        message="Нет аккаунта?"
        linkMessage="Тыкни на меня!"
        link="/auth/register"
      />
    </>
  );
};

export default LogIn;
