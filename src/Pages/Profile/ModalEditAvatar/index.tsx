import styles from "./ModalEditAvatar.module.sass";
import React, { useState, DragEvent } from "react";
import { CloseButton } from "../../../Components/Profile/CloseButton";
import { SaveButton } from "../../../Components/Profile/SaveButton";
import { sendProfileImage } from "../../../API/profile";

interface ModalEditAvatarInterface {
  closeModal: () => void
}
export const ModalEditAvatar: React.FC<ModalEditAvatarInterface> = ({ closeModal }) => {
  const [avatarPreview, setavatarPreview] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = React.useState(false);
  const onProfileImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setavatarPreview(e.target.files[0]);
    }
  };
  const handleDrag = function (e: {
    dataTransfer: any; preventDefault: () => void; stopPropagation: () => void; type: string;
}) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      // handleFiles(e.dataTransfer.files);
      setavatarPreview(e.dataTransfer.files[0]);
    }
  };
  const SaveButtonClicked = () => {
    sendProfileImage(avatarPreview)
      .then(() => {

      });
  };
  return (
    <div className={styles.ModalBody}>
      <div className={styles.Header}>Загрузка Аватара</div>
      <div className={styles.underline}></div>
      <div className={styles.UploadContainer}>
        <form onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} className={`${styles.UploadBox} ${dragActive ? styles.UploadBoxDrop : ""}` } onClick={() => fileInputRef?.current?.click()} onSubmit={(e) => e.preventDefault()}>
          {avatarPreview ? <img src={URL.createObjectURL(avatarPreview)} className={styles.ProfileImg} /> : <></>}
          <div className={styles.UploadBoxText}>Перетащите или нажмите для загрузки</div>
          <input onChange={onProfileImageChange} multiple={false} ref={fileInputRef} type='file' hidden/>
        </form>
      </div>
      <div className={styles.Footer}>
        <CloseButton onClick={closeModal} />
        {avatarPreview ? <SaveButton onClick={SaveButtonClicked}/> : null}
      </div>
    </div>
  );
};
