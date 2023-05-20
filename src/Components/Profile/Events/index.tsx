import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EventCard } from "../../EventCard";
import { SelectedTab } from "../../../Pages/Profile";
import { Ipost } from "../../../API/post";
import styles from "./Events.module.sass";

interface EventsInterface {
  selected: SelectedTab,
  profileOwnEvents: Ipost[],
  profileFavoriteEvents: Ipost[],
  addPostToFavorite: (id: number) => void
}

const EventsEmpty = () => {
  return (
    <div className={styles.EventsEmpty}>
      <img src={require("../../../assets/profile/Yn6hmt4S69A.jpg")} alt="здесь пусто" width={328}/>
      <p className={styles.EmptyEventsText}>
        Ой, тут пусто.<br />
        <Link to="/events/create" className={styles.link}>
          Создайте мероприятие
        </Link>
        &nbsp;нажав на соответствующую кнопку в верхней части профиля.
      </p>
    </div>
  );
};

export const Events: FC<EventsInterface> = ({ selected, profileOwnEvents, profileFavoriteEvents, addPostToFavorite }) => {
  const [OwnEventsReminder, setOwnEventsReminder] = useState(0);
  const [FavoritesEventsReminder, setFavoritesReminder] = useState(0);

  const handleResize = () => {
    const innerWidth = window.innerWidth;
    if (innerWidth >= 1290 && profileFavoriteEvents.length % 3 !== 0) {
      setFavoritesReminder(3 - profileFavoriteEvents.length % 3);
    } else if (innerWidth >= 870) {
      setFavoritesReminder(profileFavoriteEvents.length % 2);
    } else {
      setFavoritesReminder(0);
    }
    if (innerWidth >= 1290 && profileOwnEvents.length % 3 !== 0) {
      setOwnEventsReminder(3 - profileOwnEvents.length % 3);
    } else if (innerWidth >= 870) {
      setOwnEventsReminder(profileOwnEvents.length % 2);
    } else {
      setOwnEventsReminder(0);
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [OwnEventsReminder, FavoritesEventsReminder]);

  return (
    <div className={styles.profileEvents}>
      <div className={styles.eventsContent}>
        {
          selected === SelectedTab.MyFavoriteEvents
            ? profileFavoriteEvents.length !== 0
              ? <>{profileFavoriteEvents.map((el, index) => (
                <EventCard
                  key={index}
                  onFavoriteClick={addPostToFavorite}
                  preview={el.image}
                  author={el.ownerName}
                  name={el.name}
                  type={el.type}
                  beginDate={el.beginDate}
                  endDate={el.endDate}
                  id={el.id}
                />
              ))}
              {Array.from({ length: FavoritesEventsReminder }, (_, index) => (
                <div key={index} className="empty" />
              ))}
              </>
              : <EventsEmpty />
            : profileOwnEvents.length !== 0
              ? <>
                {profileOwnEvents.map((el, index) => (
                  <EventCard
                    key={index}
                    onFavoriteClick={addPostToFavorite}
                    preview={el.image}
                    author={el.ownerName}
                    name={el.name}
                    type={el.type}
                    beginDate={el.beginDate}
                    endDate={el.endDate}
                    id={el.id}
                  />
                ))}
                {Array.from({ length: OwnEventsReminder }, (_, index) => (
                  <div key={index} className="empty" />
                ))}
              </>
              : <EventsEmpty />
        }
      </div>
    </div>
  );
};
