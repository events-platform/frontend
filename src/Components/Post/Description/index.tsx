import React from "react";
import styles from "./Description.module.sass";

interface DescriptionProps {
  name: string,
  text: string,
  color?: string
}

export const Description: React.FC<DescriptionProps> = ({ name, text, color }) => {
  return (
    <>
      {text.length > 0
        ? <div className={styles.Description}>
          <p className={styles.name}>
            {name}
          </p>
          <p style={{ color }}>
            {text}
          </p>
        </div>
        : null}
    </>
  );
};
