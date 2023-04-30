import React from "react";
import { Link } from "react-router-dom";
import styles from "./Popular.module.sass";

interface PopularProps {
  link: string;
  name?: string;
  backgroundImage?: string;
}

export const Popular: React.FC<PopularProps> = ({ link, name, backgroundImage }) => {
  return (
    <Link to={link} className={styles.Popular}>
      <div className={styles.image} style={{ backgroundImage }}>
        <p>
          {name}
        </p>
      </div>
      <div className={styles.black} />
    </Link>
  );
};
