import React from "react";
import styles from "./SecondaryButton.module.sass";

interface SecondaryButtonInterface {
  onClick?: () => void,
  text?: string,
  children?: React.ReactNode,
  width?: number,
  height?: number
}

export const SecondaryButton: React.FC<SecondaryButtonInterface> = ({ onClick, text, children, width, height }) => {
  return (
    <>
      <button className={styles.SecondaryButton} onClick={onClick} style={{ minWidth: width, height }} >{children} <div className={styles.text}>{text}</div></button>
    </>
  );
};

SecondaryButton.defaultProps = {
  onClick: () => {},
  text: "title",
  width: 102,
  height: 32
};
