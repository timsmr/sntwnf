import { FormEvent, useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.scss";
import { BackButton } from "../../shared/components/BackButton";
import Button from "./../../shared/components/Button";
import InputField from "./../../shared/components/InputField";

import * as I from "./types/types";
import { useStore } from "../../stores";
import axios from "axios";
import { FormWrapper } from "shared/components/FormWrapper";

const INITIAL_DATA: I.CreateFormData = {
  name: "",
  date: "",
};

export const CreateLobby = ({ className }: I.CreateLobbyProps) => {
  const AuthStyles = cn(styles.auth, className);

  const [data, setData] = useState(INITIAL_DATA);

  const updateFields = (fields: Partial<I.CreateFormData>) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const { currentUser, lobbyStore } = useStore();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await axios
      .post(
        "/lobby/create_lobby",
        {
          lobby_name: data["name"],
          event_date: data["date"],
          is_started: false,
        },
        {
          params: {
            token: currentUser.userToken,
          },
        }
      )
      .then(function (response) {
        lobbyStore.setLobbyCode(response.data.lobby.id);
        lobbyStore.setLobbyName(response.data.lobby.name);
        lobbyStore.setLobbyEventDate(response.data.lobby.event_date);
        lobbyStore.setLobbyStarted(response.data.lobby.started);
      })
      .catch(function (error) {
        console.log(error);
      });

    await axios
      .post(`/guests/create_guest`, {
        lobby_id: lobbyStore.name,
        user_id: currentUser.userId,
        is_host: true,
      })
      .then((res) => {
        currentUser.setUserIsHost(true);
      });

    navigate(`/lobby/${lobbyStore.code}}`);
  };

  return (
    <div className={AuthStyles}>
      <Link to="/">
        <BackButton />
      </Link>

      <form className={styles.form} onSubmit={onSubmit}>
        <FormWrapper title="Создание лобби">
          <InputField
            value={data["name"]}
            onChange={(e) =>
              updateFields({ name: (e.target as HTMLButtonElement).value })
            }
            inputPlaceholder="Название лобби"
            required
          />
          <InputField
            value={data["date"]}
            onChange={(e) =>
              updateFields({ date: (e.target as HTMLButtonElement).value })
            }
            inputType="date"
            inputPlaceholder="dd/mm/yyyy"
          />
        </FormWrapper>
        <Button label="Создать" buttonStyle="primary" type="submit" />
      </form>
    </div>
  );
};
