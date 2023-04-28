import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.sass";

interface ButtonProps {
  text?: string;
  link: string;
}

export const Button: React.FC<ButtonProps> = ({ text, link }) => {
  return (
    <div className={styles.Button}>
      <Link to={link}>
        {text}
      </Link>
    </div>
  );
};
