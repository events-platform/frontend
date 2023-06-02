import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EventCard } from "../../EventCard";
import { SelectedTab } from "../../../Pages/Profile";
import { Ipost } from "../../../API/post";
import styles from "./Events.module.sass";
import { HiddenEventCard } from "../../HiddenEventCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface EventsInterface {
  selected: SelectedTab,
  profileOwnEvents: Ipost[],
  profileFavoriteEvents: Ipost[],
  addPostToFavorite: (id: number) => void,
  isProfileEventsLoaded: boolean,
  isProfileFavoriteEventsLoaded: boolean,
  profileSubscribeEvents: Ipost[]
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

export const Events: FC<EventsInterface> = ({
  selected,
  profileOwnEvents,
  profileFavoriteEvents,
  addPostToFavorite,
  isProfileEventsLoaded,
  isProfileFavoriteEventsLoaded,
  profileSubscribeEvents
}) => {
  const [reminder, setReminder] = useState(0);
  const viewportWidth = useSelector((state: RootState) => state.viewport.viewportWidth);
  const [content, setcontent] = useState<Ipost[]>([]);
  const [loaded, setloaded] = useState<boolean>(false);

  useEffect(() => {
    if (viewportWidth >= 1290 && content.length % 3 !== 0) {
      setReminder(3 - content.length % 3);
    } else if (viewportWidth >= 870) {
      setReminder(content.length % 2);
    } else {
      setReminder(0);
    }
  }, [viewportWidth, content, loaded, profileOwnEvents]);

  useEffect(() => {
    if (selected === SelectedTab.MyEvents) {
      setcontent(profileOwnEvents);
      setloaded(isProfileEventsLoaded);
    } else if (selected === SelectedTab.MyFavoriteEvents) {
      setcontent(profileFavoriteEvents);
      setloaded(isProfileFavoriteEventsLoaded);
    } else if (selected === SelectedTab.MyParticipation) {
      setcontent(profileSubscribeEvents);
      setloaded(isProfileFavoriteEventsLoaded);
    }
  }, [profileOwnEvents, isProfileEventsLoaded, selected, profileFavoriteEvents, isProfileFavoriteEventsLoaded, profileSubscribeEvents]);
  return (
    <div className={styles.profileEvents}>
      <div className={styles.eventsContent}>
        {
          loaded
            ? content.length !== 0
              ? <>{content.map((el, index) => (
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
                  ownerAvatar={el.ownerAvatar}
                />
              ))}
              {Array.from({ length: reminder }, (_, index) => (
                <div key={index} className="empty" />
              ))}
              </>
              : <EventsEmpty />
            : Array.from({ length: 15 }, (_, index) => (
              <HiddenEventCard key={index}/>
            ))
        }
      </div>
    </div>
  );
};
