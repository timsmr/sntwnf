import { useEffect } from "react";
import { observer } from "mobx-react";
import { LogIn } from "./components/LogIn";
import { Register } from "./components/Register";
import styles from "./index.module.scss";
import { BackButton } from "shared/components/BackButton";
import { Link, useParams } from "react-router-dom";
import { useStore } from "stores";

export const Auth = observer(() => {
  const { authType } = useParams();
  const { authStore } = useStore();

  useEffect(() => {
    if (authType === "login" || authType === "register") {
      authStore.changePath(authType);
    }
  }, [authType, authStore]);

  return (
    <div className={styles.auth}>
      <Link to="/">
        <BackButton className={styles.backBtn} />
      </Link>
      {authType === "login" ? (
        <LogIn />
      ) : (
        authType === "register" && <Register />
      )}
    </div>
  );
});
