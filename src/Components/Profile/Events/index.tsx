import { FC } from "react";
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
  return (
    <div className={styles.profileEvents}>
      <div className={styles.eventsContent}>
        {
          selected === SelectedTab.MyFavoriteEvents
            ? profileFavoriteEvents.length !== 0
              ? profileFavoriteEvents.map((el, index) => (
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
              ))
              : <EventsEmpty />
            : profileOwnEvents.length !== 0
              ? profileOwnEvents.map((el, index) => (
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
              ))
              : <EventsEmpty />
        }
      </div>
    </div>
  );
};
