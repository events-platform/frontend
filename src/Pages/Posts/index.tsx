import { useEffect, useState } from "react";
import { EventCard } from "../../Components/EventCard";
import styles from "./Posts.module.sass";
import { Ipost, addPostToFavorite, getAllPosts } from "../../API/post";
import { Filter } from "../../Components/Posts/Filter/Filter";

export const Posts = () => {
  const [posts, setPosts] = useState<Ipost[]>([]);
  const [reminder, setReminder] = useState(0);

  const handleResize = () => {
    const innerWidth = window.innerWidth;
    if (innerWidth >= 1290 && posts.length % 3 !== 0) {
      setReminder(3 - posts.length % 3);
    } else if (innerWidth >= 870) {
      setReminder(posts.length % 2);
    } else {
      setReminder(0);
    }
  };

  useEffect(() => {
    getAllPosts()
      .then((res) => {
        setPosts(res.data);
      })
      .then(() => handleResize());
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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
