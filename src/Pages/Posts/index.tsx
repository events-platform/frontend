import { useEffect, useState } from "react";
import { EventCard } from "../../Components/EventCard";
import styles from "./Posts.module.sass";
import { Ipost, addPostToFavorite, getAllPosts } from "../../API/post";
import { Filter } from "../../Components/Posts/Filter/Filter";

export const Posts = () => {
  const [posts, setPosts] = useState<Ipost[]>([]);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    getAllPosts().then((res) => {
      setPosts(res.data);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

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
          {posts.length % 3 !== 0 && viewportWidth >= 1290 ? <div className="empty" /> : null }
          {posts.length % 2 === 0 && viewportWidth >= 1290 ? <div className="empty" /> : null }
          {posts.length % 2 !== 0 && viewportWidth <= 1290 ? <div className="empty" /> : null }
        </div>
      </div>
    </div>
  );
};
