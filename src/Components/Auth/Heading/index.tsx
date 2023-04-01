import React from "react";
import styles from "./Heading.module.sass";

interface HeadingProps {
  text: string;
}

export const Heading: React.FC<HeadingProps> = ({ text }) => {
  return (
    <h1 className={styles.Heading}>
      {text}
    </h1>
  );
};
