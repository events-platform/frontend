import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Arrow, Cross } from "../../Components/PostCreation";
import styles from "./PostCreation.module.sass";
import { Modal, ModalEditAvatar, SaveButton } from "../../Components/Profile";
import { createPost } from "../../API/post";

export const PostCreation = () => {
  const navigate = useNavigate();
  const [description, setTextArea] = useState("");
  const [name, setName] = useState("");
  const [format, setFormat] = useState("");
  const [city, setCity] = useState("");
  const [registrationLimit, setRegistrationLimit] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [modalHidden, setmodalHidden] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>();
  const closeModal = () => {
    setmodalHidden(true);
  };
  const openModal = () => {
    setmodalHidden(false);
  };
  const loadImage = (file: File | null) => {
    setFile(file);
    closeModal();
  };

  const handleChange = (event: { target: { value: SetStateAction<string>; style: { height: string; }; scrollHeight: any; }; }) => {
    setTextArea(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };
  const onSaveButtonClick = () => {
    if (!file) {
      return;
    }
    createPost({ name, format, city, registrationLimit: Number(registrationLimit), beginDate, endDate, location, description, file })
      .then((res) => {
        navigate(-1);
      })
      .catch(() => {
      });
  };

  return (
    <>
      <div className={styles.PostCreation}>
        <div className={styles.topBar}>
          <button onClick={() => navigate(-1)}>
            <Arrow />
          </button>
          <h1>Создание мероприятия</h1>
        </div>
        <div className={styles.imageContainer}>
          { file
            ? <img src={URL.createObjectURL(file)} className={styles.image} onClick={openModal} />
            : <img src={require("../../../src/Components/PostCreation/Assets/placeholderPost.jpg")} className={styles.image} alt="" onClick={openModal} />
          }
          <button>
            <Cross />
          </button>
        </div>
        <h2>Основная информация</h2>
        <div className={styles.inputWrapper}>
          <Input
            name="Название"
            placeholder="Название"
            require={true}
            state={name}
            setState={setName}
          />
          <Input
            name="Формат мероприятия"
            placeholder="Формат мероприятия"
            require={true}
            state={format}
            setState={setFormat}
          />
        </div>
        <div className={styles.inputWrapper}>
          <Input
            name="Город проведения"
            placeholder="Город проведения"
            require={true}
            state={city}
            setState={setCity}
          />
          <Input
            name="Количество мест"
            placeholder="Число или не ограничено"
            require={true}
            state={registrationLimit}
            setState={setRegistrationLimit}
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.dateWrapper}>
            <Input
              name="Дата начала"
              placeholder="DD-MM-YYYY"
              require={true}
              width="168.5px"
              state={beginDate}
              setState={setBeginDate}
            />
            <Input
              name="Дата окончания"
              placeholder="YYYY-MM-DD"
              require={true}
              width="168.5px"
              state={endDate}
              setState={setEndDate}
            />
          </div>
          <Input
            name="Адрес проведения"
            placeholder="Адрес проведения"
            require={true}
            state={location}
            setState={setLocation}
          />
        </div>
        <h2>Описание</h2>
        <textarea
          placeholder="Введите описание"
          value={description}
          onChange={handleChange}
        ></textarea>
        <SaveButton onClick={onSaveButtonClick} />
      </div>
      <Modal isHidden={modalHidden} closeModal={closeModal}>
        <ModalEditAvatar closeModal={closeModal} loadAvatar={loadImage} />
      </Modal>
    </>
  );
};
