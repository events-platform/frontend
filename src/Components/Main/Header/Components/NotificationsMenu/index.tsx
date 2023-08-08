import { NotificationsCard } from "../NotificationsCard";
import styles from "./NotificationsMenu.module.sass";

export const NotificationsMenu = () => {
  return (
    <div className={styles.NotificationsMenu}>
      <div className={styles.header}>
        <span className={styles.leftSide}>
          Уведомления
        </span>
        <span className={styles.rightSide}>
          Прочитать все (0)
        </span>
      </div>
      <div className={styles.content}>
        <NotificationsCard/>
      </div>
    </div>
  );
};
