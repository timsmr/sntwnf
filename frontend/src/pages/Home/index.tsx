import React from "react";
import cn from "classnames";

import styles from "./index.module.scss";
import { Button } from "../../shared/components/Button";
import { Link } from "react-router-dom";
import * as I from "./types/types";
import { useStore } from "stores";
import { observer } from "mobx-react";

const Home = ({ className }: I.HomeProps) => {
  const homeStyles = cn(styles.home, className);

  const { currentUser } = useStore();

  return (
    <div className={homeStyles}>
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
  );
};

export default observer(Home);
