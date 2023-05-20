import { useEffect, useState } from "react";
import { EventCard } from "../../Components/EventCard";
import styles from "./Posts.module.sass";
import { Ipost, addPostToFavorite, getAllPosts } from "../../API/post";
import { Filter } from "../../Components/Posts/Filter/Filter";

export const Posts = () => {
  const [posts, setPosts] = useState<Ipost[]>([]);
  useEffect(() => {
    getAllPosts().then((res) => {
      setPosts(res.data);
    });
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
            <EventCard onFavoriteClick={onFavoriteClick} key={index} preview={el.image} author={el.ownerName} name={el.name} type={el.type} date={el.endDate} id={el.id}/>
          ))}
        </div>
      </div>
    </div>
  );
};
