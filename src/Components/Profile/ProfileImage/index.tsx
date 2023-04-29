import React from "react";
import { Modal, ModalEditAvatar } from "../";
import styles from "./ProfileImage.module.sass";

interface profileProps {
  username: string
}

export const ProfileImage: React.FC<profileProps> = ({ username }) => {
  const [isHidden, setisHidden] = React.useState<boolean>(true);

  const closeModal = () => {
    setisHidden(true);
  };

  const openModal = () => {
    setisHidden(false);
  };

  return (
    <div className={styles.ImageContainer}>
      <img onClick={openModal} src={`http://venchass.ru:7999/user/${username}/avatar`} className={styles.ProfileImg} />
      <Modal isHidden={isHidden} closeModal={closeModal}>
        <ModalEditAvatar closeModal={closeModal}/>
      </Modal>
    </div>
  );
};
