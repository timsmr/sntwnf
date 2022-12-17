import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "stores";

import Button from "../../../../shared/components/Button";
import Help from "../../../../shared/components/Help";

import styles from "./index.module.scss";

import * as I from "../types/types";
import axios from "axios";
import { useMultistepForm } from "shared/hooks/useMultistepForm";
import PersonalData from "./PersonalData";
import GeneralData from "./GeneralData";

const INITIAL_DATA: I.RegisterFormData = {
  login: "",
  password: "",
  name: "",
  preferences: "",
};

const Register = ({}: I.RegisterProps) => {
  const [data, setData] = useState(INITIAL_DATA);

  const navigate = useNavigate();

  const { currentUser } = useStore();

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

    await axios
      .post("/auth/create_user", {
        name: data["name"],
        username: data["login"],
        preferences: data["preferences"],
        password: data["password"],
      })
      .then(function (response) {
        currentUser.setUserToken(response.data.created_user.token);
        currentUser.setUserId(response.data.created_user.id);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
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
            <Button label="Назад" buttonStyle="primary" onClick={back} />
          )}

          <Button
            label={isLastStep ? "Готово" : "Далее"}
            buttonStyle="primary"
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
