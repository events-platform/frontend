import React from "react";
import styles from "./SecondaryButton.module.sass";

interface SecondaryButtonInterface {
  onClick?: () => void,
  text?: string,
  children?: React.ReactNode,
  width?: number
}

export const SecondaryButton: React.FC<SecondaryButtonInterface> = ({ onClick, text, children, width }) => {
  return (
    <>
      <button className={styles.SecondaryButton} onClick={onClick} style={{ width }} >{children} {text}</button>
    </>
  );
};

SecondaryButton.defaultProps = {
  onClick: () => {},
  text: "title"
};
