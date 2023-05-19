import React from "react";
import styles from "./SaveButton.module.sass";

interface SaveButtonInterface {
  onClick?: () => void,
  text?: string
}

export const SaveButton: React.FC<SaveButtonInterface> = ({ onClick, text }) => {
  return (
    <>
      <button className={styles.ModalSaveButton} onClick={onClick}>{text}</button>
    </>
  );
};

SaveButton.defaultProps = {
  onClick: () => {},
  text: "Сохранить"
};
