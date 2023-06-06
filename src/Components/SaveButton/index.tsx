import React from "react";
import styles from "./SaveButton.module.sass";

interface SaveButtonInterface {
  onClick?: () => void,
  text?: string,
  children?: React.ReactNode,
  width?: number | string,
  height?: number | string
}

export const SaveButton: React.FC<SaveButtonInterface> = ({ onClick, text, children, width, height }) => {
  return (
    <button className={styles.ModalSaveButton} onClick={onClick} style={{ width, height }} >{children} <div className={styles.text}>{text}</div></button>
  );
};

SaveButton.defaultProps = {
  onClick: () => {},
  text: "Сохранить",
  height: 32
};
