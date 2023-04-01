import React from "react";
import styles from "./Button.module.sass";

interface ButtonProps {
  text: string;
}

export const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button className={`${styles.Button} media`}>
      {text}
    </button>
  );
};
