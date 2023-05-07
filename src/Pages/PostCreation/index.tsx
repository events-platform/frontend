import { SetStateAction, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Arrow, Cross } from "../../Components/PostCreation";
import styles from "./PostCreation.module.sass";
import { Modal, ModalEditAvatar, SaveButton } from "../../Components/Profile";
import { createPost, formatDate, getEventFormats } from "../../API/post";
import { Calendar } from "@natscale/react-calendar";
import "@natscale/react-calendar/dist/main.css";
import { Value } from "@natscale/react-calendar/dist/utils/types";
export const PostCreation = () => {
  const navigate = useNavigate();
  const [description, setTextArea] = useState("");
  const [name, setName] = useState("");
  const [eventFormat, setFormat] = useState("");
  const [registrationLimit, setRegistrationLimit] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [modalHidden, setmodalHidden] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>();
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventLink, setEventLink] = useState("");
  const eventsFormats = getEventFormats();
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
    createPost({ name, format: eventFormat, city: "Екатиеринбург", registrationLimit: Number(registrationLimit), beginDate, endDate, location, description, file })
      .then((res) => {
        navigate(-1);
      })
      .catch(() => {
      });
  };
  const onCancelButtonClick = () => {
    setFile(null);
  };

  const [beginDateCalendar, setbeginDateCalendar] = useState<Value>();
  const onBeginDateCalendarChange = useCallback(
    (value: Value) => {
      const yourDate = value as Date;
      setbeginDateCalendar(value);
      setBeginDate(formatDate(yourDate));
    },
    [setbeginDateCalendar]
  );

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
          <div>
            <button onClick={onCancelButtonClick} >
              <Cross />
            </button>
          </div>
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
            state={eventFormat}
            setState={setFormat}
            selectMode={true}
            selectValues={["Онлайн", "Оффлайн"]}
          />
          <Input
            name="Почта"
            placeholder="Почта"
            require={false}
            state={email}
            setState={setEmail}
          />
        </div>
        <div className={styles.inputWrapper}>
          <Input
            name="Адрес проведения"
            placeholder="Адрес проведения"
            require={false}
            state={location}
            setState={setLocation}
          />
          <Input
            name="Тип мероприятия"
            placeholder="Тип мероприятия"
            require={true}
            state={eventType}
            setState={setEventType}
            selectMode={true}
            selectValues={eventsFormats}
          />
          <Input
            name="Сайт или соц.сети"
            placeholder="Сайт или соц.сети"
            require={false}
            state={eventLink}
            setState={setEventLink}
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.dateWrapper}>
            <Input
              name="Дата начала"
              placeholder="YYYY-MM-DD"
              require={true}
              width="168.5px"
              state={beginDate}
              setState={() => {}}
            />
            <Calendar value={beginDateCalendar} onChange={onBeginDateCalendarChange} />
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
            name="Количество мест"
            placeholder="Количество мест"
            require={true}
            state={registrationLimit}
            setState={setRegistrationLimit}
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
