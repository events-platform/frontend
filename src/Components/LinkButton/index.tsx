import React from "react";
import styles from "./LinkButton.module.sass";
import { Link } from "react-router-dom";

interface ILinkButton {
  to: string,
  children?: React.ReactNode
}

export const LinkButton: React.FC<ILinkButton> = ({ to, children }) => {
  return (
    <Link to={to} className={styles.LinkButton}>
      {children}
    </Link >
  );
};
