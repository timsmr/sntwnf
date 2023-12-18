import styles from "./index.module.scss";
import { Button } from "../../shared/components/Button";
import { Link } from "react-router-dom";
import { useStore } from "stores";
import { observer } from "mobx-react";
import { apiService } from "api/apiService";
import { ModalWindow } from "shared/components/ModalWindow";
import { useState } from "react";

export const Home = observer(() => {
  const { currentUser } = useStore();

  const [isOpened, setIsOpened] = useState(false);

  const refresh_token = localStorage.getItem("refresh_token");

  const onAgreed = (isAgreed: boolean) => {
    if (isAgreed) {
      const refresh_token = localStorage.getItem("refresh_token");
      console.log(refresh_token);
      if (!refresh_token) return;
      apiService.logout(refresh_token);
    }
  };

  return (
    <>
      <div className={styles.home}>
        <h1 className={styles.title}>тайный санта</h1>
        <div className={styles.buttonBlock}>
          {currentUser.userToken ? (
            <>
              <Link to="/join">
                <Button className="mr-70" label="войти" />
              </Link>

              <Link to="/create">
                <Button label="создать" />
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth/login">
                <Button className="mr-70" label="логин" />
              </Link>

              <Link to="/auth/register">
                <Button label="регистрация" />
              </Link>
            </>
          )}
        </div>
      </div>
      {refresh_token && (
        <Button
          label="выйти из аккаунта"
          buttonStyle="danger"
          className={styles.exitBtn}
          onClick={() => setIsOpened(true)}
        />
      )}
      {isOpened && (
        <ModalWindow setIsAgreed={onAgreed} setIsOpened={setIsOpened} />
      )}
    </>
  );
});
