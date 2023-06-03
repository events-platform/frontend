import { useState, useRef, DragEvent, FC, ChangeEvent, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import { CloseButton, SaveButton } from "../";
import styles from "./ModalEditAvatar.module.sass";

interface ModalEditAvatarInterface {
  closeModal: () => void,
  loadAvatar: (profileImage: File | null) => void,
  type: string
}

export const ModalEditAvatar: FC<ModalEditAvatarInterface> = ({ closeModal, loadAvatar, type }) => {
  const [avatarPreview, setavatarPreview] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [scale, setScale] = useState(2);

  const handleScaleChange = (event: { target: { value: string; }; }) => {
    const newScale = parseFloat(event.target.value);
    setScale(newScale);
  };

  const handleScroll = (event: WheelEvent) => {
    event.preventDefault();
    const scrollDelta = Math.sign(event.deltaY);
    const scaleStep = 0.1;
    const minScale = 0.5;
    const maxScale = 10;
    const newScale = scale + scrollDelta * scaleStep;
    if (newScale >= minScale && newScale <= maxScale) {
      setScale(newScale);
    }
  };

  useEffect(() => {
    document.addEventListener("wheel", handleScroll);
    return () => {
      document.removeEventListener("wheel", handleScroll);
    };
  }, []);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<AvatarEditor | null>(null);

  const onProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setavatarPreview(e.target.files[0]);
    }
  };

  const handleDrag = function (e: DragEvent<HTMLFormElement>) {
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
      setavatarPreview(e.dataTransfer.files[0]);
    }
  };

  const saveImage = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "edited_avatar.png", { type: blob.type });
          loadAvatar(file);
        }
      });
    }
  };

  const removePicture = () => {
    setavatarPreview(null);
  };

  return (
    <div className={styles.ModalBody}>
      <div className={styles.Header}>Загрузка изображения</div>
      <div className={styles.underline}></div>
      <div className={styles.UploadContainer}>
        <form
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`${styles.UploadBox} ${dragActive ? styles.UploadBoxDrop : ""}`}
          onClick={() => avatarPreview ? null : fileInputRef?.current?.click()}
          onSubmit={(e) => e.preventDefault()}
          style={{ border: avatarPreview ? "none" : "2px dashed black" }}
        >
          {avatarPreview
            ? (
              type === "avatar"
                ? <AvatarEditor
                  image={URL.createObjectURL(avatarPreview)}
                  className={styles.ProfileImg}
                  width={650}
                  height={650}
                  border={[395, 65]}
                  borderRadius={650}
                  ref={editorRef}
                  scale={scale}
                />
                : <AvatarEditor
                  image={URL.createObjectURL(avatarPreview)}
                  className={styles.ProfileImg}
                  width={1440}
                  height={610}
                  border={[0, 100]}
                  ref={editorRef}
                  scale={scale}
                />
            )
            : null}
          <div className={styles.UploadBoxText}>
            Перетащите или нажмите для загрузки
          </div>
          <input
            onChange={onProfileImageChange}
            multiple={false}
            ref={fileInputRef}
            type='file'
            hidden
          />
        </form>
      </div>
      <div className={styles.Footer}>
        <CloseButton onClick={closeModal} />
        {avatarPreview
          ? <>
            <SaveButton onClick={saveImage} />
            <CloseButton onClick={removePicture} text="Сбросить" />
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.1"
              value={scale}
              onChange={handleScaleChange}
              onWheel={(e) => e.preventDefault()}
            />
          </>
          : null}
      </div>
    </div>
  );
};
