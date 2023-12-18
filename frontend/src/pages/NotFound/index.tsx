import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { BackButton } from "../../shared/components/BackButton";
import { Header } from "../../shared/components/Header";

export const NotFound = () => {
  return (
    <div className={styles.auth}>
      <Link to="/">
        <BackButton />
      </Link>
      <Header text="404 Страница не найдена" />
    </div>
  );
};
