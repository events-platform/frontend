import React from "react";
import { Modal, ModalEditAvatar } from "../";
import styles from "./ProfileImage.module.sass";
import { sendProfileImage } from "../../../API/profile";
import { getUserSelf } from "../../../API/login";
import { useAppDispatch } from "../../../store/store";
import { setAvatarUrl, setUserName } from "../../../store/reducers/userReducer";

interface profileProps {
  username: string,
  avtarUrl: string,
  setAvatar: (path: string) => void,
  modalHidden: boolean
}

export const ProfileImage: React.FC<profileProps> = ({ username, avtarUrl, setAvatar, modalHidden }) => {
  const [isHidden, setisHidden] = React.useState<boolean>(true);

  const closeModal = () => {
    setisHidden(true);
  };

  const openModal = () => {
    setisHidden(false);
  };
  const dispatch = useAppDispatch();
  const LoadAvatar = (profileImage: File | null) => {
    sendProfileImage(profileImage).then((res) => {
      getUserSelf().then((res) => {
        dispatch(setUserName(res.data.username));
        dispatch(setAvatarUrl(res.data.avatar));
        setAvatar(res.data.avatar);
      });
      closeModal();
    });
  };

  return (
    <div className={styles.ImageContainer}>
      <img onClick={openModal} src={avtarUrl} className={styles.ProfileImg} />
      <Modal isHidden={isHidden} closeModal={closeModal}>
        <ModalEditAvatar closeModal={closeModal} loadAvatar={LoadAvatar} modalHidden={modalHidden} type="avatar" />
      </Modal>
    </div>
  );
};
