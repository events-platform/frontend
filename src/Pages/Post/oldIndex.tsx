import React from "react";
import { useNavigate } from "react-router-dom";
import { Cross, Favorite, Share, Description } from "../../Components/OldPost";
import styles from "./OldPost.module.sass";

interface PostProps {
  preview?: string,
  author?: string,
  name?: string,
  type?: string,
  date?: string
  avatar?: string,
  mail?: string,
  site?: string,
  number?: string,
  address?: string,
  text?: string
}

export const Post: React.FC<PostProps> = ({ preview, name, author, avatar, type, mail, site, date, number, address, text }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.Post}>
      <div className={styles.topButtons}>
        <button onClick={() => navigate(-1)}>
          <Cross />
        </button>
        <div className={styles.topButtonsRight}>
          <button>
            <Favorite />
          </button>
          <button>
            <Share />
          </button>
        </div>
      </div>
      <div className={styles.preview} style={{ backgroundImage: `url(${preview})` }} />
      <h1 className={styles.name}>
        {name}
      </h1>
      <div className={styles.author}>
        <div style={{ backgroundImage: `url(${avatar})` }} />
        <p>
          {author}
        </p>
      </div>
      <div className={styles.descriptions}>
        <Description heading="Категория:" text={type} />
        <Description heading="Почта:" text={mail} />
        <Description heading="Сайт:" text={site} />
      </div>
      <div className={styles.descriptions}>
        <Description heading="Время проведения:" text={date} />
        <Description heading="Телефон:" text={number} />
        <Description heading="Место проведения:" text={address} />
      </div>
      <h2 className={styles.textHeading}>
        О мероприятии
      </h2>
      <p className={styles.text}>
        {text}
      </p>
      <button className={styles.join}>
        Буду участвовать
      </button>
    </div>
  );
};

Post.defaultProps = {
  preview: "https://sun9-72.userapi.com/impg/cqipQoblziuR736VK5Yv-PsxdFihxgrEjwCZ6g/59-XuRVIzGs.jpg?size=2560x1707&quality=95&sign=28215f3c6c27a5b3e19023e024fd4476&type=album",
  author: "Уральский федеральный университет",
  name: "Пик IT: Мероприятие для программистов",
  type: "Выставка",
  date: "17 марта 13:00 - 21:00",
  avatar: "https://urfu.ru/fileadmin/user_upload/common_files/about/brand/UrFULogo_U.jpg",
  mail: "urfu@blabla.ru",
  site: "urfu.ru",
  number: "+7 (999) 82-34-05",
  address: "ул. Мира 29",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas sed tempus urna et. Hendrerit dolor magna eget est lorem ipsum dolor. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Etiam non quam lacus suspendisse faucibus interdum. Lacinia at quis risus sed vulputate odio ut enim. Risus commodo viverra maecenas accumsan lacus vel facilisis. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa.\nSuspendisse in est ante in nibh. Platea dictumst quisque sagittis purus sit amet volutpat.\nEst ultricies integer quis auctor elit sed vulputate mi sit. Rhoncus urna neque viverra justo nec. Suscipit tellus mauris a diam maecenas sed enim ut. Vitae justo eget magna fermentum iaculis eu non diam. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Praesent semper feugiat nibh sed pulvinar. Tellus elementum sagittis vitae et leo duis ut diam. Nunc aliquet bibendum enim facilisis gravida. Pharetra vel turpis nunc eget lorem dolor sed viverra. Mauris pharetra et ultrices neque ornare aenean.\nPurus sit amet luctus venenatis. Ornare massa eget egestas purus. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Ut consequat semper viverra nam libero. Enim diam vulputate ut pharetra sit amet aliquam id diam. Id semper risus in hendrerit gravida rutrum quisque non. Neque viverra justo nec ultrices dui sapien eget mi. Mauris a diam maecenas sed enim ut. Nec tincidunt praesent semper feugiat nibh sed pulvinar. Netus et malesuada fames ac. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Blandit turpis cursus in hac habitasse platea dictumst. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Et netus et malesuada fames ac turpis egestas. Orci ac auctor augue mauris. Pretium aenean pharetra magna ac placerat vestibulum. Morbi quis commodo odio aenean sed adipiscing diam donec. Cum sociis natoque penatibus et magnis.\nSuspendisse in est ante in nibh. Platea dictumst quisque sagittis purus sit amet volutpat.\nEst ultricies integer quis auctor elit sed vulputate mi sit. Rhoncus urna neque viverra justo nec. Suscipit tellus mauris a diam maecenas sed enim ut. Vitae justo eget magna fermentum iaculis eu non diam. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Praesent semper feugiat nibh sed pulvinar. Tellus elementum sagittis vitae et leo duis ut diam. Nunc aliquet bibendum enim facilisis gravida. Pharetra vel turpis nunc eget lorem dolor sed viverra. Mauris pharetra et ultrices neque ornare aenean."
};
