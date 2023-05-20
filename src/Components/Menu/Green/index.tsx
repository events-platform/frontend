import { FC } from "react";
import styles from "./Green.module.sass";

interface GreenProps {
  id: number,
  heading: string,
  text: string
}

export const Green: FC<GreenProps> = ({ id, heading, text }) => {
  return (
    <div className={styles.Green}>
      <span className={styles.number}>
        {`0${id}`}
      </span>
      <h3 className={styles.header}>
        {heading}
      </h3>
      <p className={styles.text}>
        {text}
      </p>
    </div>
  );
};
