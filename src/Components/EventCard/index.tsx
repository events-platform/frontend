import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star } from "./Star";
import styles from "./EventCard.module.sass";

interface EventCardProps {
  preview: string;
  author: string;
  name: string;
  type: string;
  beginDate: string;
  endDate: string;
  id: number;
  onFavoriteClick: (id: number) => void
}

export const EventCard: FC<EventCardProps> = ({ preview, author, name, type, beginDate, endDate, id, onFavoriteClick }) => {
  const [favorite, setFavorite] = useState(false);
  const [lasted, setLasted] = useState(false);
  const [date, setDate] = useState("");
  const mouths = [
    "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
    "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
  ];

  useEffect(() => {
    const temp = new Date(Date.now());
    const unformatedDate = temp.toISOString();
    const dateNow = `${unformatedDate.substring(0, 10)} ${unformatedDate.substring(11, 19)}`;
    setLasted(dateNow > endDate);
    if (beginDate && endDate) {
      if (beginDate.substring(0, 10) === endDate.substring(0, 10)) {
        setDate(`${beginDate.substring(8, 10)} ${mouths[+beginDate.substring(5, 7) - 1]} ${beginDate.substring(11, 16)} - ${endDate.substring(11, 16)}`);
      } else {
        setDate(`${beginDate.substring(8, 10)} ${mouths[+beginDate.substring(5, 7) - 1]} ${beginDate.substring(11, 16)} - ${endDate.substring(8, 10)} ${mouths[+endDate.substring(5, 7) - 1]} ${endDate.substring(11, 16)}`);
      }
    } else {
      beginDate ? setDate(`${beginDate.substring(8, 10)} ${mouths[+beginDate.substring(5, 7) - 1]} ${beginDate.substring(11, 16)}`) : setDate(`${endDate.substring(8, 10)} ${mouths[+endDate.substring(5, 7) - 1]} ${endDate.substring(11, 16)}`);
    }
  }, []);

  return (
    <>
      <div className={styles.EventCard}>
        <div className={styles.wrapper}>
          <button className={styles.starBackground} onClick={() => {
            setFavorite(!favorite);
            onFavoriteClick(id);
          }
          }>
            <Star />
          </button>
          {lasted
            ? <div className={styles.lasted}>
              Завершено
            </div>
            : null}
          <Link className={styles.Link} to={`/events/${id}`}>
            <div className={styles.preview} style={{ backgroundImage: `url(${preview})` }} />
            <div className={styles.content}>
              <div className={styles.avatarauthor}>
                <img src={preview} alt="avatar" />
                <p className={styles.author}>
                  {author}
                </p>
              </div>
              <p className={styles.name}>
                {name}
              </p>
              <p className={styles.type}>
                {type} | {date}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
