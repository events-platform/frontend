import { Link } from "react-router-dom";
import styles from "./NotificationsCard.module.sass";
import { Check } from "./SVGs/Check";
import { SystemAvatar } from "./SVGs/SystemAvatar";
import { FC } from "react";

interface PostProps {
  setActiveNotifications: (arg0: number) => void
}

export const NotificationsCard: FC<PostProps> = ({ setActiveNotifications }) => {
  return (
    <div className={styles.NotificationsCard} onClick={() => setActiveNotifications(0)}>
      <SystemAvatar />
      <Link to="/events" className={styles.content}>
        <div className={styles.text}>
          Появились новые мероприятия. Проверяй, там наверняка что-то интересное!
        </div>
        <div className={styles.date}>
          Только что
        </div>
      </Link>
      <button className={styles.check}>
        <Check />
      </button>
    </div>
  );
};
