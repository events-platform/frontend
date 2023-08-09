import styles from "./CalendarCard.module.sass";

export const CalendarCard = () => {
  return (
    <div className={styles.CalendarCard}>
      <div className={styles.type}>
            Выставка
      </div>
      <div className={styles.main}>
        <p className={styles.name}>
            Выставка
        </p>
        <p className={styles.time}>
            11:30-12:00
        </p>
      </div>
    </div>
  );
};
