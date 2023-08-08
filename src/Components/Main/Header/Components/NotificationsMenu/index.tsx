import { FC } from "react";
import { NotificationsCard } from "../NotificationsCard";
import styles from "./NotificationsMenu.module.sass";

interface PostProps {
  activeNotifications?: number,
  setActiveNotifications: (arg0: number) => void
}

export const NotificationsMenu: FC<PostProps> = ({ activeNotifications, setActiveNotifications }) => {
  return (
    <div className={styles.NotificationsMenu}>
      <div className={styles.header}>
        <span className={styles.leftSide}>
          Уведомления
        </span>
        <span className={styles.rightSide} onClick={() => setActiveNotifications(0)}>
          Прочитать все ({activeNotifications})
        </span>
      </div>
      <div className={styles.content} style={{ opacity: activeNotifications === 0 ? 0.5 : 1 }}>
        <NotificationsCard setActiveNotifications={setActiveNotifications} />
      </div>
    </div>
  );
};
