import React, { useEffect, useState } from "react";
import { EventCard } from "../../Components/EventCard";
import { Header, Popular, Gradient, Button, Heading } from "../../Components/Menu";
import styles from "./Menu.module.sass";
import { Ipost, getAllPosts } from "../../API/post";

export const Menu = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const categoriesRef = React.useRef<HTMLDivElement>(null);
  const popularRef = React.useRef<HTMLDivElement>(null);
  const aboutRef = React.useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<Ipost[]>([]);
  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const scrollDirection = event.deltaY > 0 ? 1 : -1;
    if (scrollContainerRef.current !== null) {
      scrollContainerRef.current.scrollLeft += scrollDirection * 40;
    }
  };

  const handleClick = (event: React.SyntheticEvent, targetRef: React.RefObject<HTMLDivElement>) => {
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

  return (
    <div className={styles.Menu}>
      <Header link={handleClick} categoriesRef={categoriesRef} popularRef={popularRef} aboutRef={aboutRef} />
      <section className={styles.menuContent}>
        <Heading text="Популярные категории" />
        <div className={styles.popular} ref={categoriesRef}>
          <Popular link={"/404"} name="Вечеринки" backgroundImage={"url(https://sun9-78.userapi.com/impg/jCSv0NFk-7kmgEoDqUQA5TK0GIyyC7qSWkDWlw/fYn23QYvBxg.jpg?size=420x480&quality=96&sign=fbf315e1ac4d5df7f7ed222d07d9fabb&type=album)"} />
          <Popular link="/404" name="Настольные игры" backgroundImage={"url(https://sun9-80.userapi.com/impg/v7frH9a6JEkhEDd6mDmndvDsbsD8_5SVPV8bNg/73I8cefbHHA.jpg?size=420x480&quality=96&sign=b0d60c7234af29fe872f385891dbc05b&type=album)"} />
          <Popular link="/404" name="Выставки" backgroundImage={"url(https://sun9-76.userapi.com/impg/l7BLKfu0n-0lwgUBb9WUnHJu4SM4YWnOqYb6kw/wEhUFqT8AyU.jpg?size=420x480&quality=96&sign=91af51c3e275cace1e204de8d9f592d1&type=album)"} />
        </div>
        <Button text="Посмотреть все категории" link="/404" />
        <Heading text="Популярное" />
        <div className={styles.events} onWheel={handleScroll} ref={popularRef}>
          {posts.map((el, index) => (
            <EventCard key={index} preview={el.image} author={el.ownerName} name={el.name} type={el.type} date={el.endDate} id={el.id}/>
          ))}
        </div>
        <Button text="Посмотреть все мероприятия" link="/events" />
        <Heading text="О нас" />
        <div ref={aboutRef}>
          <Gradient>
            <div className={styles.secondGradient}>
              <h2>
                Event Share
              </h2>
              <p>
                Это площадка, которая помогает пользователям организовывать и находить мероприятия. С помощью EventShare организаторы могут быстро и просто создавать события, определять даты и место проведения, а также делиться информацией о мероприятии в социальных сетях. Для пользователей доступен удобный поиск по дате, месту, типу и различным меткам, которые позволяют найти мероприятие под ваши интересы.<br /><br />Сервис EventShare идеально подходит для всех, кто ищет новые мероприятия для посещения, а также для тех, кто хочет организовать свое собственное мероприятие - от конференций и выставок до спортивных и культурных событий.
              </p>
            </div>
          </Gradient>
        </div>
      </section>
    </div>
  );
};
