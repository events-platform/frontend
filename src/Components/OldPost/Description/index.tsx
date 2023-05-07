import React from "react";
import styles from "./Description.module.sass";

interface DescriptionProps {
  heading?: string,
  text?: string
}

export const Description: React.FC<DescriptionProps> = ({ heading, text }) => {
  return (
    <div className={styles.Description}>
      <p className={styles.heading}>
        {heading}
      </p>
      <p className={styles.text}>
        {text}
      </p>
    </div>
  );
};
