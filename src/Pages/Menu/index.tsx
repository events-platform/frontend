import { EventCard } from "../../Components/EventCard";
import { Header, Popular, Gradient, Button, Heading } from "../../Components/Menu";
import styles from "./Menu.module.sass";

export const Menu = () => {
  const template = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <div className={styles.Menu}>
      <Header />
      <section>
        <Heading text="Популярные категории" />
        <div className={styles.popular}>
          <Popular link="/404" name="Вечеринки" backgroundImage={"url(https://sun9-78.userapi.com/impg/jCSv0NFk-7kmgEoDqUQA5TK0GIyyC7qSWkDWlw/fYn23QYvBxg.jpg?size=420x480&quality=96&sign=fbf315e1ac4d5df7f7ed222d07d9fabb&type=album)"} />
          <Popular link="/404" name="Настольные игры" backgroundImage={"url(https://sun9-80.userapi.com/impg/v7frH9a6JEkhEDd6mDmndvDsbsD8_5SVPV8bNg/73I8cefbHHA.jpg?size=420x480&quality=96&sign=b0d60c7234af29fe872f385891dbc05b&type=album)"} />
          <Popular link="/404" name="Выставки" backgroundImage={"url(https://sun9-76.userapi.com/impg/l7BLKfu0n-0lwgUBb9WUnHJu4SM4YWnOqYb6kw/wEhUFqT8AyU.jpg?size=420x480&quality=96&sign=91af51c3e275cace1e204de8d9f592d1&type=album)"} />
        </div>
        <Button text="Посмотреть все категории" link="/404" />
        <Heading text="Популярное" />
        <div className={styles.events}>
          {template.map((el) => (
            <EventCard key={el} />
          ))};
        </div>
        <Button text="Посмотреть все мероприятия" link="/posts" />
        <Gradient>
          <div className={styles.firstGradient}>
            <p>
              Не нашли интересующее мероприятие? Мы предлагаем вам создать его самим!
            </p>
            <Button text="Создать мероприятие" link="/posts/create" />
          </div>
        </Gradient>
        <Heading text="О нас" />
        <Gradient>
          <div className={styles.secondGradient}>
            <h2>
              Что мы делаем?
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas sed tempus urna et. Hendrerit dolor magna eget est lorem ipsum dolor. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Etiam non quam lacus suspendisse faucibus interdum. Lacinia at quis risus sed vulputate odio ut enim. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </p>
          </div>
        </Gradient>
      </section>
    </div>
  );
};
