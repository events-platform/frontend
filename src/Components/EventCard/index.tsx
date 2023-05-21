import { FC, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./EventCard.module.sass";
import { convertDateToString, reConvertFormat } from "../../API/post";
import { FavoriteStar } from "./FavoriteStar";

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
  const [lasted] = useState(new Date() > new Date(endDate));

  return (
    <>
      <div className={styles.EventCard}>
        <div className={styles.wrapper}>
          <FavoriteStar favorite={favorite} style={styles.star} onClick={() => {
            onFavoriteClick(id);
            setFavorite(!favorite);
          }}/>
          {lasted
            ? <div className={styles.lasted}>
              Завершено
            </div>
            : null}
          <Link className={styles.Link} to={`/events/${id}`}>
            <img className={styles.preview} src={preview} alt="preview" />
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
                {reConvertFormat(type)} | <div className={styles.date}>{convertDateToString(beginDate, endDate)}</div>
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
