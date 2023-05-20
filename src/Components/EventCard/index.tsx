import React from "react";
import styles from "./EventCard.module.sass";
import { Link } from "react-router-dom";
import { SaveButton } from "../Profile";
import { SecondaryButton } from "../SecondaryButton";
import { Star } from "../Post";

interface EventCardProps {
  preview?: string;
  author?: string;
  name?: string;
  type?: string;
  date?: string;
  id: number;
  onFavoriteClick: (id: number) => void
}

export const EventCard: React.FC<EventCardProps> = ({ preview, author, name, type, date, id, onFavoriteClick }) => {
  return (
    <>
      <div className={styles.EventCard}>
        <div className={styles.wrapper}>
          <Link className={styles.Link} to={`/events/${id}`}>
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
          </Link>
          <div className={styles.buttons}>
            <SaveButton text="По записи" />
            <SecondaryButton text="Избранное" width={128} onClick={() => onFavoriteClick(id)} >{<Star fill="black" />}</SecondaryButton>
          </div>
        </div>
      </div>
    </>
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
