import React from "react";
import styles from "./Button.module.sass";

interface ButtonProps {
  text: string;
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className={`${styles.Button} media`} onClick={onClick}>
      {text}
    </button>
  );
};
