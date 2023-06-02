/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { EventCard } from "../../Components/EventCard";
import styles from "./Posts.module.sass";
import { Ipost, addPostToFavorite, getAllPosts } from "../../API/post";
import { Filter } from "../../Components/Posts/Filter/Filter";
import { HiddenEventCard } from "../../Components/HiddenEventCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const Posts = () => {
  const [posts, setPosts] = useState<Ipost[]>([]);
  const viewportWidth = useSelector((state: RootState) => state.viewport.viewportWidth);
  const [reminder, setReminder] = useState(0);

  const handleResize = () => {
    if (viewportWidth >= 1290 && posts.length % 3 !== 0) {
      setReminder(3 - posts.length % 3);
    } else if (viewportWidth >= 870) {
      setReminder(posts.length % 2);
    } else {
      setReminder(0);
    }
  };

  useEffect(() => {
    getAllPosts()
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  useEffect(() => {
    handleResize();
  }, [posts, viewportWidth]);

  const onFavoriteClick = (id: number) => {
    addPostToFavorite(id).then();
  };

  return (
    <div className={styles.Posts}>
      <div className={styles.postContent}>
        <Filter />
        <h1>
           Мероприятия
        </h1>
        <div className={styles.events}>
          {posts.length !== 0
            ? <>
              {posts.map((el, index) => (
                <EventCard
                  onFavoriteClick={onFavoriteClick}
                  key={index}
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
            : Array.from({ length: 15 }, (_, index) => (
              <HiddenEventCard />
            ))}
        </div>
      </div>
    </div>
  );
};
