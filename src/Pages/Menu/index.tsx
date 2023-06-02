import { useEffect, useState, SyntheticEvent, RefObject, useRef } from "react";
import { Link } from "react-router-dom";
import { EventCard } from "../../Components/EventCard";
import { Header, Popular, Heading, PopularArrow, Green } from "../../Components/Menu";
import { SaveButton } from "../../Components/SaveButton";
import { Ipost, addPostToFavorite, getAllPosts } from "../../API/post";
import styles from "./Menu.module.sass";
import { HiddenEventCard } from "../../Components/HiddenEventCard";

export const Menu = () => {
  const [posts, setPosts] = useState<Ipost[]>([]);
  const [sliderPosition, setSliderPosition] = useState(0);

  const categoriesRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLHeadingElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

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
    addPostToFavorite(id).then();
  };

  const handlePrevButtonClick = () => {
    if (sliderRef.current) {
      if (sliderPosition !== 0) {
        setSliderPosition(sliderPosition + 470);
      } else {
        setSliderPosition((-populars.length + 3) * 470);
      }
    }
  };

  const handleNextButtonClick = () => {
    if (sliderRef.current) {
      if (-sliderRef.current.offsetWidth < sliderPosition) {
        setSliderPosition(sliderPosition - 470);
      } else {
        setSliderPosition(0);
      }
    }
  };

  const populars = [{
    id: 0,
    name: "Вечеринки",
    url: "https://sun9-78.userapi.com/impg/jCSv0NFk-7kmgEoDqUQA5TK0GIyyC7qSWkDWlw/fYn23QYvBxg.jpg?size=420x480&quality=96&sign=fbf315e1ac4d5df7f7ed222d07d9fabb&type=album"
  },
  {
    id: 1,
    name: "Настольные игры",
    url: "https://sun9-80.userapi.com/impg/v7frH9a6JEkhEDd6mDmndvDsbsD8_5SVPV8bNg/73I8cefbHHA.jpg?size=420x480&quality=96&sign=b0d60c7234af29fe872f385891dbc05b&type=album"
  },
  {
    id: 2,
    name: "Выставки",
    url: "https://sun9-76.userapi.com/impg/l7BLKfu0n-0lwgUBb9WUnHJu4SM4YWnOqYb6kw/wEhUFqT8AyU.jpg?size=420x480&quality=96&sign=91af51c3e275cace1e204de8d9f592d1&type=album"
  },
  {
    id: 3,
    name: "Вечеринки 2",
    url: "https://sun9-78.userapi.com/impg/jCSv0NFk-7kmgEoDqUQA5TK0GIyyC7qSWkDWlw/fYn23QYvBxg.jpg?size=420x480&quality=96&sign=fbf315e1ac4d5df7f7ed222d07d9fabb&type=album"
  },
  {
    id: 4,
    name: "Настольные игры 2",
    url: "https://sun9-80.userapi.com/impg/v7frH9a6JEkhEDd6mDmndvDsbsD8_5SVPV8bNg/73I8cefbHHA.jpg?size=420x480&quality=96&sign=b0d60c7234af29fe872f385891dbc05b&type=album"
  },
  {
    id: 5,
    name: "Выставки 2",
    url: "https://sun9-76.userapi.com/impg/l7BLKfu0n-0lwgUBb9WUnHJu4SM4YWnOqYb6kw/wEhUFqT8AyU.jpg?size=420x480&quality=96&sign=91af51c3e275cace1e204de8d9f592d1&type=album"
  }];

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
        <div className={styles.popular}>
          <button
            className={styles.popularArrow}
            onClick={handlePrevButtonClick}
          >
            <PopularArrow />
          </button>
          <div className={styles.hidden}>
            <div
              className={styles.sliderContainer}
              style={{ transform: `translateX(${sliderPosition}px)` }}
              ref={sliderRef}
            >
              {populars.map((el) => (
                <Popular
                  link={"/events"}
                  key={el.id}
                  name={`${el.name}`}
                  backgroundImage={`url(${el.url})`}
                />
              ))}
            </div>
          </div>
          <button
            className={`${styles.popularArrow} ${styles.rightArrow}`}
            onClick={handleNextButtonClick}
          >
            <PopularArrow />
          </button>
        </div>
        <div ref={popularRef} />
        <Heading text="Популярное" />
        <div className={styles.events}>
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
        <Link to="/events" className={styles.linkToEvents}>
          <SaveButton
            text="Посмотреть все мероприятия"
            width={258}
            height={38.8}
          />
        </Link>
        <h1 className={styles.EventShare} ref={aboutRef}>
          Event Share
        </h1>
        <div className={styles.descHeader}>
          <hr />
          <h2>организация мероприятий</h2>
          <hr />
        </div>
        <div className={styles.greens}>
          <Green
            id={1}
            heading={"Удобная организация"}
            text={
              "С помощью Event Share пользователи могут быстро и просто создавать события, определять даты, место проведения и делиться информацией в соц. сетях"
            }
          />
          <Green
            id={2}
            heading={"Гибкая фильтрация"}
            text={
              "Для пользователей доступен удобный поиск по дате, месту, типу и различным меткам, которые позволят найти любое мероприятие под ваши интересы"
            }
          />
          <Green
            id={3}
            heading={"Создание своих мероприятий"}
            text={
              "Наш сервис идеально подходит для всех для тех, кто хочет организовать свое  мероприятие - от конференций и выставок до спортивных и культурных событий."
            }
          />
        </div>
      </section>
    </div>
  );
};
