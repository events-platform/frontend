import { EventCard } from "../../Components/EventCard";
import styles from "./Posts.module.sass";

export const Posts = () => {
  const template = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <div className={styles.Posts}>
      <h1>
        Все мероприятия
      </h1>
      <div className={styles.events}>
        {template.map((el) => (
          <EventCard key={el} />
        ))};
      </div>
    </div>
  );
};
