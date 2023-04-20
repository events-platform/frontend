import React, { useState } from "react";
import styles from "../AccountInfo/AccountInfo.module.sass";
import { Modal } from "../../../Components/Profile";
import { ModalEditAvatar } from "../ModalEditAvatar";
interface profileProps {
  username: string
}

export const ProfileIamge: React.FC<profileProps> = ({ username }) => {
  const [isHidden, setisHidden] = useState<boolean>(true);
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
