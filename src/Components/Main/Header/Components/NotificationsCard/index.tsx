import { Link } from "react-router-dom";
import styles from "./NotificationsCard.module.sass";
import { Check } from "./SVGs/Check";
import { SystemAvatar } from "./SVGs/SystemAvatar";

export const NotificationsCard = () => {
  return (
    <div className={styles.NotificationsCard}>
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
