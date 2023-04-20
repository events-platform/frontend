import React from "react";
import styles from "./CloseButton.module.sass";

interface CloseButtonInterface {
  onClick: () => void
}
export const CloseButton: React.FC<CloseButtonInterface> = ({ onClick }) => {
  return (
    <>
      <button className={styles.ModalCloseButton} onClick={onClick}>Закрыть</button>
    </>
  );
};
