import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = (): React.ReactNode => {
  return (
    <div className={styles.container}>
      <h1 className={`star-wars-text ${styles.h1}`}>404</h1>
      <p className={styles.description}>Ничего не нашлось</p>
      <p className={styles.description}>
        Вернуться к <Link to="/">списку персонажей</Link>
      </p>
    </div>
  );
};

export default NotFound;
