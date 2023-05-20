import { FC } from "react";
import { EventCard } from "../../EventCard";
import { SelectedTab } from "../../../Pages/Profile";
import styles from "./Events.module.sass";
import { Ipost } from "../../../API/post";

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
        Ой, тут пусто.
        Создайте мероприятие нажав на соответствующую кнопку в верхней части профиля.
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
