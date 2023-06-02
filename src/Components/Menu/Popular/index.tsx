import React from "react";
import { Link, createSearchParams } from "react-router-dom";
import styles from "./Popular.module.sass";

interface PopularProps {
  link: string;
  name: string;
  backgroundImage?: string;
}

export const Popular: React.FC<PopularProps> = ({ link, name, backgroundImage }) => {
  return (
    <Link to={{ pathname: link, search: createSearchParams({ type: name }).toString() }} className={styles.Popular}>
      <div className={styles.image} style={{ backgroundImage }}>
        <p>
          {name}
        </p>
      </div>
      <div className={styles.black} />
    </Link>
  );
};
