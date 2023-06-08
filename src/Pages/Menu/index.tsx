import { useEffect, useState, SyntheticEvent, RefObject, useRef } from "react";
import { EventCard } from "../../Components/EventCard";
import { Header, Heading, Green, DesktopCategories, MobileCategories } from "../../Components/Menu";
import { SaveButton } from "../../Components/SaveButton";
import { Ipost, addPostToFavorite, getAllPosts } from "../../API/post";
import { HiddenEventCard } from "../../Components/HiddenEventCard";
import styles from "./Menu.module.sass";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

export const Menu = () => {
  const viewportWidth = useSelector((state: RootState) => state.viewport.viewportWidth);
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
      <section className={styles.menuContent} ref={categoriesRef}>
        <Heading text="Популярные категории" />
        {viewportWidth > 920 ? <DesktopCategories /> : <MobileCategories />}
        <div ref={popularRef} />
        <Heading text="Популярное" />
        <div className={`${styles.events} ${isIOS ? "" : styles.scroll}`}>
          {posts.length !== 0
            ? posts.map((el, index) => (
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
            ))
            : Array.from({ length: 6 }, (_, index) => <HiddenEventCard key={index} />)}
        </div>
        <div style={{ width: "100%", padding: "10px 15px" }}>
          <SaveButton
            text="Посмотреть все мероприятия"
            height={38.8}
            width={viewportWidth < 880 ? undefined : 258 }
            onClick={() => navigate("/events")}
          />
        </div>
        <h1 className={styles.EventShare} ref={aboutRef}>
          EventShare
        </h1>
        <div className={styles.descHeader}>
          <hr />
          <h2>организация мероприятий</h2>
          <hr />
        </div>
        <div className={styles.greens}>
          <Green
            id={1}
            heading={"Простота создания мероприятий"}
            text={
              "Благодаря EventShare вы можете создавать свои собственные мероприятия всего в несколько кликов, благодаря интуитивно-понятному интерфейсу"
            }
          />
          <Green
            id={2}
            heading={"Широкий выбор мероприятий"}
            text={
              "Сервис EventShare предоставляет доступ к списку мероприятий, которые создали другие пользователи. Вы можете легко найти интересующее вас мероприятие по категории или тематике"
            }
          />
          <Green
            id={3}
            heading={"Удобный поиск и фильтрация"}
            text={
              "Сервис EventShare позволяет производить поиск мероприятий по различным параметрам, например, по дате, категории и другим. Фильтрация позволяет получить наиболее точный результат, соответствующий вашим запросам"
            }
          />
        </div>
      </section>
    </div>
  );
};
