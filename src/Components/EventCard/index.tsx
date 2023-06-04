import React, { FC, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./EventCard.module.sass";
import { convertDateToString } from "../../API/post";
import { FavoriteStar } from "./FavoriteStar";
import { guardIsSigned } from "../../API/cookies";

interface EventCardProps {
  preview: string;
  author: string;
  name: string;
  type: string;
  beginDate: string;
  endDate: string;
  id: number;
  onFavoriteClick: (id: number) => void;
  ownerAvatar: string;
}

export const EventCard: FC<EventCardProps> = ({ preview, author, name, type, beginDate, endDate, id, onFavoriteClick, ownerAvatar }) => {
  const [favorite, setFavorite] = useState(false);
  const [lasted] = useState(new Date() > new Date(endDate));
  const typeDateRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.EventCard}>
        <div className={styles.wrapper}>
          <FavoriteStar favorite={favorite} style={styles.star} onClick={() => {
            guardIsSigned(navigate, () => {
              onFavoriteClick(id);
              setFavorite(!favorite);
            });
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
                <img src={ownerAvatar} alt="avatar" />
                <p className={styles.author}>
                  {author}
                </p>
              </div>
              <p className={styles.name}>
                {name}
              </p>
              <div className={styles.type} ref={typeDateRef}>
                {type} {typeDateRef.current && typeDateRef.current.clientHeight <= 30 ? "|" : null} <div className={styles.date}>{convertDateToString(beginDate, endDate)}</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
