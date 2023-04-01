import React from "react";
import styles from "./Description.module.sass";

interface DescriptionProps {
  text: string;
  color: string;
}

export const Description: React.FC<DescriptionProps> = ({ text, color }) => {
  return (
    <p className={styles.Description} style={{ color }}>
      {text}
    </p>
  );
};
