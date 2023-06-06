import { FC, useEffect, useState } from "react";
import { EventCard } from "../../EventCard";
import { SelectedTab } from "../../../Pages/Profile";
import { Ipost } from "../../../API/post";
import styles from "./Events.module.sass";
import { HiddenEventCard } from "../../HiddenEventCard";
import { EventsEmpty } from "../EventsEmpty";

interface EventsInterface {
  selected: SelectedTab,
  profileOwnEvents: Ipost[],
  profileFavoriteEvents: Ipost[],
  addPostToFavorite: (id: number, subscribe: boolean | undefined) => void,
  isProfileEventsLoaded: boolean,
  isProfileFavoriteEventsLoaded: boolean,
  profileSubscribeEvents: Ipost[]
}

export const Events: FC<EventsInterface> = ({
  selected,
  profileOwnEvents,
  profileFavoriteEvents,
  addPostToFavorite,
  isProfileEventsLoaded,
  isProfileFavoriteEventsLoaded,
  profileSubscribeEvents
}) => {
  const [content, setcontent] = useState<Ipost[]>([]);
  const [loaded, setloaded] = useState<boolean>(false);

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
      {
        loaded
          ? content.length !== 0
            ? <div className={styles.eventsContent}>
              {content.map((el, index) => (
                <EventCard
                  key={el.id}
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
            </div>
            : <div className={styles.empty}>
              <EventsEmpty />
            </div>
          : <div className={styles.eventsContent}>
            {Array.from({ length: 15 }, (_, index) => (
              <HiddenEventCard key={index}/>
            ))}
          </div>
      }
    </div>
  );
};
