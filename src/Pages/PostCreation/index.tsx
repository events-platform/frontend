import { SetStateAction, useState } from "react";
import { Input, Arrow, Cross } from "../../Components/PostCreation";
import styles from "./PostCreation.module.sass";

export const PostCreation = () => {
  const [textarea, setTextArea] = useState("");

  const handleChange = (event: { target: { value: SetStateAction<string>; style: { height: string; }; scrollHeight: any; }; }) => {
    setTextArea(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  return (
    <div className={styles.PostCreation}>
      <div className={styles.topBar}>
        <Arrow />
        <h1>
          Создание мероприятия
        </h1>
      </div>
      <div className={styles.image}>
        <button>
          <Cross />
        </button>
      </div>
      <h2>
        Основная информация
      </h2>
      <div className={styles.inputWrapper}>
        <Input name="Название" placeholder="Название" require={true} />
        <Input name="Формат мероприятия" placeholder="Формат мероприятия" require={true} />
      </div>
      <div className={styles.inputWrapper}>
        <Input name="Город проведения" placeholder="Город проведения" require={true} />
        <Input name="Количество мест" placeholder="Число или не ограничено" require={true} />
      </div>
      <div className={styles.inputWrapper}>
        <div className={styles.dateWrapper}>
          <Input name="Дата начала" placeholder="YYYY-MM-DD" require={true} width="168.5px" />
          <Input name="Дата окончания" placeholder="YYYY-MM-DD" require={true} width="168.5px" />
        </div>
        <Input name="Адрес проведения" placeholder="Адрес проведения" require={true} />
      </div>
      <h2>
        Описание
      </h2>
      <textarea
        placeholder="Введите описание"
        value={textarea}
        onChange={handleChange}
      >
      </textarea>
    </div>
  );
};
