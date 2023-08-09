import { Arrow } from "./SVGs/Arrow";
import styles from "./CalendarMenu.module.sass";
import { CalendarCard } from "../CalendarCard";

export const CalendarMenu = () => {
  const daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
  const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

  const today = new Date();
  const dayOfWeek = today.getDay();
  const dayOfMonth = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  return (
    <div className={styles.CalendarMenu}>
      <div className={styles.header}>
        {daysOfWeek[dayOfWeek]}, {dayOfMonth} {months[month]}
      </div>
      <div className={styles.controlPanel}>
        <div className={styles.monthDate}>
          {months[month]} {year}
        </div>
        <div className={styles.arrows}>
          <Arrow />
          <div style={{ transform: "rotate(0.5turn)" }}>
            <Arrow />
          </div>
        </div>
        <div className={styles.dateBtns}>
          <button>
                День
          </button>
          <button>
                Месяц
          </button>
          <button>
                Год
          </button>
        </div>
      </div>
      <div className={styles.daysOfWeek}>
        <span className={styles.dayOfWeek}>
                ПН
        </span>
        <span className={styles.dayOfWeek}>
                ВТ
        </span>
        <span className={styles.dayOfWeek}>
                СР
        </span>
        <span className={styles.dayOfWeek}>
                ЧТ
        </span>
        <span className={styles.dayOfWeek}>
                ПТ
        </span>
        <span className={styles.dayOfWeek}>
                СБ
        </span>
        <span className={styles.dayOfWeek}>
                ВС
        </span>
      </div>
      <div className={styles.days}>
        <span className={styles.gray}>
            31
        </span>
        <span>
            1
        </span>
        <span>
            2
        </span>
        <span>
            3
        </span>
        <span>
            4
        </span>
        <span>
            5
        </span>
        <span>
            6
        </span>
      </div>
      <div className={styles.days}>
        <span>
            7
        </span>
        <span>
            8
        </span>
        <span>
            9
        </span>
        <span>
            10
        </span>
        <span>
            11
        </span>
        <span>
            12
        </span>
        <span>
            13
        </span>
      </div>
      <div className={styles.days}>
        <span>
            14
        </span>
        <span className={styles.green}>
            15
        </span>
        <span>
            16
        </span>
        <span>
            17
        </span>
        <span>
            18
        </span>
        <span>
            19
        </span>
        <span>
            20
        </span>
      </div>
      <div className={styles.days}>
        <span>
            21
        </span>
        <span>
            22
        </span>
        <span>
            23
        </span>
        <span>
            24
        </span>
        <span>
            25
        </span>
        <span>
            26
        </span>
        <span>
            27
        </span>
      </div>
      <div className={styles.days}>
        <span>
            28
        </span>
        <span>
            29
        </span>
        <span>
            30
        </span>
        <span>
            31
        </span>
        <span className={styles.gray}>
            1
        </span>
        <span className={styles.gray}>
            2
        </span>
        <span className={styles.gray}>
            3
        </span>
      </div>
      <CalendarCard />
    </div>
  );
};
