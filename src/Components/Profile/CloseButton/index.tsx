import React from "react";
import styles from "./CloseButton.module.sass";

interface CloseButtonInterface {
  onClick: () => void,
  text?: string
}
export const CloseButton: React.FC<CloseButtonInterface> = ({ onClick, text }) => {
  return (
    <>
      <button className={styles.ModalCloseButton} onClick={onClick}>{text}</button>
    </>
  );
};

CloseButton.defaultProps = {
  text: "Закрыть"
};
