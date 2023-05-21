/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { EventCard } from "../../Components/EventCard";
import styles from "./Posts.module.sass";
import { Ipost, addPostToFavorite, getAllPosts } from "../../API/post";
import { Filter } from "../../Components/Posts/Filter/Filter";

export const Posts = () => {
  const [posts, setPosts] = useState<Ipost[]>([]);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
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

  useEffect(() => {
    window.addEventListener("resize", () => setViewportWidth(window.innerWidth));

    return () => {
      window.removeEventListener("resize", () => setViewportWidth(window.innerWidth));
    };
  }, []);

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
            />
          ))}
          {Array.from({ length: reminder }, (_, index) => (
            <div key={index} className="empty" />
          ))}
        </div>
      </div>
    </div>
  );
};
