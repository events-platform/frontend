import React from "react";
import { Link, createSearchParams } from "react-router-dom";
import styles from "./PopularMobile.module.sass";

interface PopularMobileProps {
  link: string;
  name: string;
  backgroundImage?: string;
  type: string;
}

export const PopularMobile: React.FC<PopularMobileProps> = ({ link, name, backgroundImage, type }) => {
  return (
    <Link to={{ pathname: link, search: createSearchParams({ type }).toString() }} className={styles.Popular}>
      <div className={styles.image} style={{ backgroundImage }}>
        <p>
          {name}
        </p>
      </div>
      <div className={styles.black} />
    </Link>
  );
};
