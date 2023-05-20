import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Arrow, Cross } from "../../Components/PostCreation";
import styles from "./PostCreation.module.sass";
import { Modal, ModalEditAvatar, SaveButton } from "../../Components/Profile";
import { createPost, getEventFormats } from "../../API/post";
import { CalendarContainer } from "../../Components/PostCreation/Calendar";

export const PostCreation = () => {
  const navigate = useNavigate();
  const [description, setTextArea] = useState("");
  const [name, setName] = useState("");
  const [eventFormat, setFormat] = useState("");
  const [registrationLimit, setRegistrationLimit] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [modalHidden, setmodalHidden] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>();
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("");
  const [externalLink, setEventLink] = useState("");
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
    createPost({ name, location, beginDate, endDate, format: eventFormat, type: eventType, registrationLimit: Number(registrationLimit), email, externalLink, description, file })
      .then((res) => {
        navigate(-1);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.response.data);
      });
  };
  const onCancelButtonClick = () => {
    setFile(null);
  };
  const [showBeginCalendar, setshowBeginCalendar] = useState(false);
  const [showEndCalendar, setshowEndCalendar] = useState(false);
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
            : <img src={require("../../../src/Components/PostCreation/Assets/placeholderPost.png")} className={styles.image} alt="" onClick={openModal} />
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
            width="377px"
            name="Название"
            placeholder="Название"
            require={true}
            state={name}
            setState={setName}
          />
          <Input
            width="377px"
            name="Формат мероприятия"
            placeholder="Формат мероприятия"
            require={true}
            state={eventFormat}
            setState={setFormat}
            selectMode={true}
            selectValues={["Онлайн", "Оффлайн"]}
          />
          <Input
            width="377px"
            name="Почта"
            placeholder="Почта"
            require={false}
            state={email}
            setState={setEmail}
          />
        </div>
        <div className={styles.inputWrapper}>
          <Input
            width="377px"
            name="Адрес проведения"
            placeholder="Адрес проведения"
            require={false}
            state={location}
            setState={setLocation}
          />
          <Input
            width="377px"
            name="Тип мероприятия"
            placeholder="Тип мероприятия"
            require={true}
            state={eventType}
            setState={setEventType}
            selectMode={true}
            selectValues={eventsFormats}
          />
          <Input
            width="377px"
            name="Сайт или соц.сети"
            placeholder="Сайт или соц.сети"
            require={false}
            state={externalLink}
            setState={setEventLink}
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.dateWrapper}>
            <div onFocus={() => setshowBeginCalendar(true)} >
              <Input
                name="Дата начала"
                placeholder="YYYY-MM-DD"
                require={true}
                width="168.5px"
                state={beginDate}
                setState={() => {}}
              />
              {showBeginCalendar ? <CalendarContainer setBeginDate={(val) => { setshowBeginCalendar(false); setBeginDate(val); }} setShowCalendar={setshowBeginCalendar} /> : null}
            </div>
            <div onFocus={() => setshowEndCalendar(true)}>
              <Input
                name="Дата окончания"
                placeholder="YYYY-MM-DD"
                require={true}
                width="168.5px"
                state={endDate}
                setState={() => {}}
              />
              {showEndCalendar ? <CalendarContainer setBeginDate={(val) => { setshowEndCalendar(false); setEndDate(val); }} setShowCalendar={setshowEndCalendar} /> : null}
            </div>

          </div>
          <Input
            width="377px"
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
        <ModalEditAvatar closeModal={closeModal} loadAvatar={loadImage} type="post" />
      </Modal>
    </>
  );
};
