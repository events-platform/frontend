import React from "react";
import styles from "./SaveButton.module.sass";

interface SaveButtonInterface {
  onClick?: () => void,
  text?: string,
  children?: React.ReactNode
}

export const SaveButton: React.FC<SaveButtonInterface> = ({ onClick, text, children }) => {
  return (
    <>
      <button className={styles.ModalSaveButton} onClick={onClick}>{children} {text}</button>
    </>
  );
};

SaveButton.defaultProps = {
  onClick: () => {},
  text: "Сохранить"
};
