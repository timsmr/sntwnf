import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "stores";

import { Button } from "../../../../shared/components/Button";
import { Help } from "../../../../shared/components/Help";

import styles from "./index.module.scss";

import * as I from "../types/types";
import { useMultistepForm } from "shared/hooks/useMultistepForm";
import PersonalData from "./PersonalData";
import GeneralData from "./GeneralData";
import { apiService } from "api/apiService";

const INITIAL_DATA: I.RegisterFormData = {
  login: "",
  password: "",
  name: "",
  preferences: "",
};

const Register = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const navigate = useNavigate();
  const { currentUser, getUserId } = useStore();

  const updateFields = (fields: Partial<I.RegisterFormData>) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <GeneralData {...data} updateFields={updateFields} />,
      <PersonalData {...data} updateFields={updateFields} />,
    ]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) return next();

    const userData = {
      name: data.name,
      username: data.login,
      preferences: data.preferences,
      password: data.password,
    };

    await apiService.register(userData).catch((error) => {
      console.log(error);
    });

    await apiService
      .login(userData.username, userData.password)
      .then(() => {
        const userToken = localStorage.getItem("access_token");
        currentUser.setUserToken(userToken);
      })
      .then(() => {
        currentUser.setUserId(getUserId());
      })
      .then(() => {
        navigate("/");
      });
  };

  return (
    <>
      <div className={styles.steps}>
        {currentStepIndex + 1} / {steps.length}
      </div>
      <form onSubmit={onSubmit} className={styles.form}>
        {step}
        <div className={styles.buttonDiv}>
          {!isFirstStep && (
            <Button label="Назад" className={styles.button} onClick={back} />
          )}

          <Button
            label={isLastStep ? "Готово" : "Далее"}
            className={styles.button}
            type="submit"
          />
        </div>
      </form>
      {isFirstStep && (
        <Help
          className="mt-10"
          message="Есть аккаунт?"
          linkMessage="Тыкни на меня!"
          link="/auth/login"
        />
      )}
    </>
  );
};

export default Register;
