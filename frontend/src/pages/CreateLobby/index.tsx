import { FormEvent, useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.scss";
import { BackButton } from "../../shared/components/BackButton";
import { Button } from "./../../shared/components/Button";
import { InputField } from "./../../shared/components/InputField";

import * as I from "./types/types";
import { useStore } from "../../stores";
import { FormWrapper } from "shared/components/FormWrapper";
import { apiService } from "api/apiService";

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

  const { currentUser, lobbyStore, setGuestId } = useStore();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const lobbyInfo = {
      name: data.name,
    };

    await apiService
      .createLobby(lobbyInfo)
      .then((response) => {
        lobbyStore.setLobbyCode(response.data.code);
        lobbyStore.setLobbyName(response.data.name);
        lobbyStore.setLobbyEventDate(response.data.event_date);
        lobbyStore.setLobbyStarted(response.data.started);
      })
      .catch((error) => {
        console.log(error);
      });

    const hostData = {
      lobby: lobbyStore.code!,
      user: currentUser.userId!,
      is_host: true,
    };

    await apiService.createHost(hostData).then((res) => {
      currentUser.setUserIsHost(res.data.is_host);
      setGuestId(res.data.id);
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
