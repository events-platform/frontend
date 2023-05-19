import { useEffect, useState } from "react";
import { EventCard } from "../../Components/EventCard";
import styles from "./Posts.module.sass";
import { Ipost, getAllPosts } from "../../API/post";

export const Posts = () => {
  const [posts, setPosts] = useState<Ipost[]>([]);
  useEffect(() => {
    getAllPosts().then((res) => {
      setPosts(res.data);
    });
  }, []);
  return (
    <div className={styles.Posts}>
      <div className={styles.postContent}>
        <h1>
          Все мероприятия
        </h1>
        <div className={styles.events}>
          {posts.map((el, index) => (
            <EventCard key={index} preview={el.image} author={el.ownerName} name={el.name} type={el.type} date={el.endDate} id={el.id}/>
          ))}
        </div>
      </div>
    </div>
  );
};
