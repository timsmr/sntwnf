import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "stores";
import styles from "./index.module.scss";
import { BackButton } from "shared/components/BackButton";
import { Button } from "shared/components/Button";
import { Header } from "shared/components/Header";
import { InputField } from "shared/components/InputField";
import { apiService } from "api/apiService";

export const JoinLobby = () => {
  const { currentUser, lobbyStore, setGuestId, getGivingToGuest } = useStore();

  const [codeValue, setCodeValue] = useState("");
  const [isCodeInvalid, setIsCodeInvalid] = useState(false);
  const navigate = useNavigate();

  const onChangeCodeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCodeValue(event.target.value);
    setIsCodeInvalid(false);
  };

  const onSubmit = async () => {
    if (!codeValue) {
      setIsCodeInvalid(true);
      return;
    }

    await apiService
      .checkIfLobbyExists(codeValue)
      .then((res) => {
        if (!res.data) {
          setIsCodeInvalid(true);
          return;
        }

        lobbyStore.setLobbyCode(res.data.code);
        lobbyStore.setLobbyName(res.data.name);
        lobbyStore.setLobbyEventDate(res.data.event_date);
        lobbyStore.setLobbyStarted(res.data.started);
        apiService.getLobbyGuests(codeValue).then((res) => {
          const ept = res.data.find(
            (item: any) => item.user === currentUser.userId
          );
          if (ept) {
            setGuestId(ept.id);
          } else {
            const guestInfo = {
              lobby: codeValue,
              user: currentUser.userId,
              is_host: false,
            };
            apiService.createGuest(guestInfo).then((res) => {
              setGuestId(res.data.id);
            });
            getGivingToGuest();
          }
        });
        navigate(`/lobby/${codeValue}`);
      })
      .catch((err) => {
        console.log(err);
        setIsCodeInvalid(true);
      });
  };

  return (
    <div className={styles.auth}>
      <Link to="/">
        <BackButton />
      </Link>
      <Header className={styles.title} text="Код лобби" />
      <InputField
        className={styles.input}
        inputPlaceholder="******"
        inputMaxLength={6}
        value={codeValue}
        onChange={onChangeCodeInput}
        isInvalidValue={isCodeInvalid}
      />
      <Button
        label="Далее"
        type="button"
        className={styles.button}
        onClick={onSubmit}
      />
    </div>
  );
};
