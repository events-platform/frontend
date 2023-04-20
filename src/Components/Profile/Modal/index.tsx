import styles from "./Modal.module.sass";
import React from "react";

interface ModalInterface {
  isHidden: boolean,
  closeModal?: () => void,
  children: React.ReactNode
}
export const Modal: React.FC<ModalInterface> = ({ isHidden, closeModal, children }) => {
  return (
    <div onClick={closeModal} className={`${styles.Modal} ${isHidden ? "" : styles.show}`}>
      <div className={styles.ModalDialog} onClick={(e) => e.stopPropagation() }>
        {children}
      </div>
    </div>
  );
};

Modal.defaultProps = {
  closeModal: () => {}
};
