import React from "react";
import { Star } from "./Star";
import styles from "./EventCard.module.sass";
import { Link } from "react-router-dom";

interface EventCardProps {
  preview?: string;
  author?: string;
  name?: string;
  type?: string;
  date?: string;
  id?: number;
}

export const EventCard: React.FC<EventCardProps> = ({ preview, author, name, type, date, id }) => {
  return (
    <Link to={`/${id}`} className={styles.EventCard}>
      <div className={styles.wrapper}>
        <div className={styles.preview} style={{ backgroundImage: `url(${preview})` }} />
        <div className={styles.content}>
          <p className={styles.author}>
            {author}
          </p>
          <p className={styles.name}>
            {name}
          </p>
          <p className={styles.type}>
            {type}
          </p>
          <p className={styles.date}>
            {date}
          </p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.reg}>
          По записи
          </button>
          <button className={styles.favorite}>
            <Star />
          Избранное
          </button>
        </div>
      </div>
    </Link>

  );
};

EventCard.defaultProps = {
  preview: "https://sun9-72.userapi.com/impg/cqipQoblziuR736VK5Yv-PsxdFihxgrEjwCZ6g/59-XuRVIzGs.jpg?size=2560x1707&quality=95&sign=28215f3c6c27a5b3e19023e024fd4476&type=album",
  author: "Уральский федеральный университет",
  name: "Пик IT: Мероприятие для программистов",
  type: "Выставка",
  date: "17 марта 13:00 - 21:00",
  id: Math.floor(Math.random() * 1000)
};
