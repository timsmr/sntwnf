import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

import styles from "./index.module.scss";
import * as I from "./types/types";

export const Help = ({
  message,
  linkMessage,
  className,
  link,
}: I.HelpProps) => {
  const helpStyles = cn(styles.help, className);

  return (
    <p className={helpStyles}>
      {message}{" "}
      {linkMessage && (
        <Link to={link ? link : ""}>
          <span className={styles.link}>{linkMessage}</span>
        </Link>
      )}
    </p>
  );
};
