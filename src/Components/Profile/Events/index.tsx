import React from "react";
import { EventCard } from "../../EventCard";
import { SelectedTab } from "../../../Pages/Profile";
import styles from "./Events.module.sass";

interface EventsInterface {
  selected: SelectedTab
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

export const Events: React.FC<EventsInterface> = ({ selected }) => {
  return (
    <div className={styles.profileEvents}>
      {
        selected === SelectedTab.MyFavoriteEvents
          ? Array.from(Array(10).keys()).map((el) => (
            <EventCard key={el} />
          ))
          : <EventsEmpty />
      }
    </div>
  );
};
