import { useState, useRef, DragEvent, FC, ChangeEvent, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import { CloseButton, SaveButton } from "../";
import styles from "./ModalEditAvatar.module.sass";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { Cross } from "../../PostCreation";

interface ModalEditAvatarInterface {
  closeModal: () => void,
  loadAvatar: (profileImage: File | null) => void,
  type: string,
  modalHidden?: boolean
}

export const ModalEditAvatar: FC<ModalEditAvatarInterface> = ({ closeModal, loadAvatar, type, modalHidden }) => {
  const viewportWidth = useSelector((state: RootState) => state.viewport.viewportWidth);

  const cropRef = useRef<HTMLDivElement>(null);
  const [avatarPreview, setavatarPreview] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [scale, setScale] = useState(2);
  const [cropWidth, setCropWidth] = useState(1);

  const handleScaleChange = (event: { target: { value: string; }; }) => {
    const newScale = parseFloat(event.target.value);
    setScale(newScale);
  };

  const handleScroll = (event: WheelEvent) => {
    event.preventDefault();
    const scrollDelta = Math.sign(event.deltaY);
    const scaleStep = 0.2;
    const minScale = 0.1;
    const maxScale = 10;
    const newScale = scale + scrollDelta * scaleStep;

    if (newScale >= minScale && newScale <= maxScale) {
      setScale(newScale);
    }
  };

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

  useEffect(() => {
    if (!modalHidden) {
      document.addEventListener("wheel", handleScroll, { passive: false });
    } else {
      document.removeEventListener("wheel", handleScroll);
    }

    return () => {
      document.removeEventListener("wheel", handleScroll);
    };
  }, [modalHidden, scale]);

  useEffect(() => {
    if (cropRef.current) {
      setCropWidth(cropRef.current.offsetWidth - 15);
    }
  }, [viewportWidth, avatarPreview]);

  return (
    <div className={styles.ModalBody}>
      <div className={styles.Header}>
        <h2 className={styles.heading}>
          Загрузка изображения
        </h2>
        {viewportWidth <= 375
          ? <button className={styles.cross} onClick={closeModal} >
            <Cross />
          </button>
          : null}
      </div>
      <div className={styles.underline}></div>
      <div className={styles.UploadContainer} ref={cropRef}>
        <form
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`${styles.UploadBox} ${dragActive ? styles.UploadBoxDrop : ""}`}
          onClick={() => avatarPreview ? null : fileInputRef?.current?.click()}
          onSubmit={(e) => e.preventDefault()}
          style={{ border: avatarPreview ? "none" : "2px dashed black", minHeight: avatarPreview ? `${0.423611 * cropWidth + 60}px` : "300px" }}
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
                  style={{ width: "100%", height: `${0.423611 * cropWidth + 60}px` }}
                />
                : <AvatarEditor
                  image={URL.createObjectURL(avatarPreview)}
                  className={styles.ProfileImg}
                  width={1440}
                  height={610}
                  border={[0, 100]}
                  ref={editorRef}
                  scale={scale}
                  style={{ width: "100%", height: `${0.423611 * cropWidth + 60}px` }}
                />
            )
            : <>
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
            </>}
        </form>
      </div>
      {!avatarPreview
        ? <div className={styles.Footer}>
          {viewportWidth > 375
            ? <CloseButton onClick={() => {
              closeModal();
            }} />
            : null}
        </div>
        : <div className={styles.FooterActive}>
          <div className={styles.scroll}>
            <span>
              Масштаб:
            </span>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={scale}
              onChange={handleScaleChange}
              onWheel={(e) => e.preventDefault()}
            />
          </div>
          <div className={styles.FooterActiveContent}>
            <div className={styles.buttons}>
              {viewportWidth > 375
                ? <CloseButton onClick={() => {
                  closeModal();
                }} />
                : null}
              <CloseButton onClick={removePicture} text="Сбросить" />
            </div>
            <SaveButton onClick={saveImage} />
          </div>
        </div>}
    </div>
  );
};
