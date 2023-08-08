import { useEffect, useState, SyntheticEvent, RefObject, useRef } from "react";
import { EventCard } from "../../Components/EventCard";
import { Header, Heading } from "../../Components/Menu";
import { SaveButton } from "../../Components/SaveButton";
import { Ipost, addPostToFavorite, getAllPosts, processFavorites } from "../../API/post";
import { HiddenEventCard } from "../../Components/HiddenEventCard";
import styles from "./Menu.module.sass";
// import { useSelector } from "react-redux";
import { store } from "../../store/store";
import { useNavigate } from "react-router-dom";

export const Menu = () => {
  // const viewportWidth = useSelector((state: RootState) => state.viewport.viewportWidth);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [posts, setPosts] = useState<Ipost[]>([]);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLHeadingElement>(null);

  const handleClick = (event: SyntheticEvent, targetRef: RefObject<HTMLDivElement>) => {
    event.preventDefault();
    const targetPosition = targetRef.current?.offsetTop;

    const scroll = (start: number, to: number, duration: number) => {
      const startTime = performance.now();
      const scrollAnimation = () => {
        const currentTime = performance.now();
        const progress = (currentTime - startTime) / duration;
        const ease = easingFunction(progress);
        window.scrollTo(0, start + (to - start) * ease);
        if (progress < 1) {
          requestAnimationFrame(scrollAnimation);
        }
      };
      requestAnimationFrame(scrollAnimation);
    };

    if (targetPosition !== undefined) {
      scroll(window.pageYOffset, targetPosition, 1000);
    }
  };

  const easingFunction = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  useEffect(() => {
    getAllPosts().then((res) => {
      processFavorites(res.data, store.getState().favorites.favorite);
      setPosts(res.data);
    });
  }, []);

  const onFavoriteClick = (id: number) => {
    addPostToFavorite(id)
      .then()
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  };
  const navigate = useNavigate();
  return (
    <div className={styles.Menu}>
      <Header
        link={handleClick}
        categoriesRef={categoriesRef}
        popularRef={popularRef}
        aboutRef={aboutRef}
      />
      <div className={styles.backgroundImage}>
        <div className={styles.black}>
          <h1 className={styles.firstHeader}>
          Event Share
          </h1>
          <h3 className={styles.secondHeader}>
          Организация мероприятий
          </h3>
          <p className={styles.mainText}>
          Создайте мероприятие в несколько кликов, а с помощью гибкой фильтрации ищите все интересующие вас мероприятия от выставок до спортивных и культурных событий.
          </p>
          <SaveButton
            text="Создать мероприятие"
            height={65}
            width={400}
            onClick={() => navigate("/events/create")}
          />
        </div>
      </div>
      <section className={styles.menuContent} ref={categoriesRef}>
        <Heading text="Конференции" />
        <div className={`${styles.events} ${isIOS ? "" : styles.scroll}`}>
          {posts.length !== 0
            ? posts.filter(x => x.type === "Конференция").map((el, index) => (
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
                isFavorite={el.favorite}
              />
            ))
            : Array.from({ length: 6 }, (_, index) => <HiddenEventCard key={index} />)}
        </div>
        <Heading text="Встречи" />
        <div className={`${styles.events} ${isIOS ? "" : styles.scroll}`}>
          {posts.length !== 0
            ? posts.filter(x => x.type === "Встреча").map((el, index) => (
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
                isFavorite={el.favorite}
              />
            ))
            : Array.from({ length: 6 }, (_, index) => <HiddenEventCard key={index} />)}
        </div>
        <Heading text="Митапы" />
        <div className={`${styles.events} ${isIOS ? "" : styles.scroll}`}>
          {posts.length !== 0
            ? posts.filter(x => x.type === "Митап").map((el, index) => (
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
                isFavorite={el.favorite}
              />
            ))
            : Array.from({ length: 6 }, (_, index) => <HiddenEventCard key={index} />)}
        </div>
        <Heading text="Выставки" />
        <div className={`${styles.events} ${isIOS ? "" : styles.scroll}`}>
          {posts.length !== 0
            ? posts.filter(x => x.type === "Выставка").map((el, index) => (
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
                isFavorite={el.favorite}
              />
            ))
            : Array.from({ length: 6 }, (_, index) => <HiddenEventCard key={index} />)}
        </div>
        <div style={{ width: "100%", padding: "40px 15px 10px 35px" }}>
          <SaveButton
            text="Посмотреть все мероприятия"
            height={38.8}
            width={"100%"}
            onClick={() => navigate("/events")}
          />
        </div>
      </section>
    </div>
  );
};
