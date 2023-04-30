import React from "react";
import { Modal, ModalEditAvatar } from "../";
import styles from "./ProfileImage.module.sass";

interface profileProps {
  username: string,
  avtarUrl: string
}

export const ProfileImage: React.FC<profileProps> = ({ username, avtarUrl }) => {
  const [isHidden, setisHidden] = React.useState<boolean>(true);

  const closeModal = () => {
    setisHidden(true);
  };

  const openModal = () => {
    setisHidden(false);
  };

  return (
    <div className={styles.ImageContainer}>
      <img onClick={openModal} src={avtarUrl} className={styles.ProfileImg} />
      <Modal isHidden={isHidden} closeModal={closeModal}>
        <ModalEditAvatar closeModal={closeModal}/>
      </Modal>
    </div>
  );
};
