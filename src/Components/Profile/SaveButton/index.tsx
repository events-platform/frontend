import React from "react";
import styles from "./SaveButton.module.sass";

interface SaveButtonInterface {
  onClick?: () => void
}
export const SaveButton: React.FC<SaveButtonInterface> = ({ onClick }) => {
  return (
    <>
      <button className={styles.ModalSaveButton} onClick={onClick}>Сохранить</button>
    </>
  );
};
SaveButton.defaultProps = {
  onClick: () => {}
};
