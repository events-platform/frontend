import React from "react";
import { useNavigate } from "react-router-dom";
import { Arrow, Button, Optional, Star, Description } from "../../Components/Post";
import styles from "./Post.module.sass";

interface PostProps {
  preview?: string,
  author?: string,
  name?: string,
  type?: string,
  date?: string
  avatar?: string,
  mail?: string,
  site?: string,
  address?: string,
  text?: string,
  slots?: string
}

export const Post: React.FC<PostProps> = ({ preview, name, author, avatar, type, mail, site, date, address, text, slots }) => {
  const navigate = useNavigate();
  const optionalSVGRef = React.useRef<HTMLDivElement>(null);
  const hiddenRef = React.useRef<HTMLDivElement>(null);
  const [optionalColor, setOptionalColor] = React.useState("#5AAE81");
  const [isOptionalHide, setOptionalHide] = React.useState(true);

  const handleOptional = () => {
    if (isOptionalHide) {
      setOptionalColor("#FFFFFF");
      if (optionalSVGRef.current !== null && hiddenRef.current) {
        optionalSVGRef.current.style.backgroundColor = "#5AAE81";
        optionalSVGRef.current.style.transform = "rotate(180deg)";
        hiddenRef.current.style.marginTop = "0";
        hiddenRef.current.style.opacity = "1";
      }
    } else {
      setOptionalColor("#5AAE81");
      if (optionalSVGRef.current !== null && hiddenRef.current) {
        optionalSVGRef.current.style.backgroundColor = "#FFFFFF";
        optionalSVGRef.current.style.transform = "rotate(0deg)";
        hiddenRef.current.style.marginTop = "-106px";
        hiddenRef.current.style.opacity = "0";
      }
    }
    setOptionalHide(!isOptionalHide);
  };

  return (
    <div className={styles.Post}>
      <div className={styles.preview} style={{ backgroundImage: `url(${preview})` }}>
        <div className={styles.black}>
          <button className={styles.arrow} onClick={() => navigate(-1)}>
            <Arrow />
          </button>
          <div className={styles.description}>
            <h2 className={styles.typedate}>
              {type} | {date}
            </h2>
            <h1 className={styles.name}>
              {name}
            </h1>
            <h2 className={styles.avatarauthor}>
              <img src={avatar} alt="avatar" />
              {author}
            </h2>
            <div className={styles.buttons}>
              <Button>
                Буду участвовать
              </Button>
              <Button borderRadius="6px">
                <Star />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.optional}>
          <button className={styles.show} onClick={() => handleOptional()}>
            <h3>
              Дополнительная информация
            </h3>
            <div className={styles.optionalWrapper} ref={optionalSVGRef} >
              <Optional color={optionalColor} />
            </div>
          </button>
          <div className={styles.hidden} ref={hiddenRef}>
            <Description name={"Почта:"} text={`${mail}`} />
            <Description name={"Кол-во мест:"} text={`${slots}`} />
            <Description name={"Место проведения:"} text={`${address}`} color={"rgba(90, 174, 129, 1)"} />
            <Description name={"Сайт:"} text={`${site}`} color={"rgba(90, 174, 129, 1)"} />
          </div>
        </div>
        <h2 className={styles.about}>
          О мероприятии
        </h2>
        <p className={styles.text}>
          {text}
          {/* {text.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br/>
            </React.Fragment>
          ))} */}
        </p>
        <div className={styles.submit}>
          <Button>
            Буду участвовать
          </Button>
        </div>
      </div>
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
  slots: "Не ограничено",
  address: "г. Екатеринбург, ул. Мира 29",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada fames ac turpis egestas sed tempus urna et. Hendrerit dolor magna eget est lorem ipsum dolor. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Etiam non quam lacus suspendisse faucibus interdum. Lacinia at quis risus sed vulputate odio ut enim. Risus commodo viverra maecenas accumsan lacus vel facilisis. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa.\nSuspendisse in est ante in nibh. Platea dictumst quisque sagittis purus sit amet volutpat.\nEst ultricies integer quis auctor elit sed vulputate mi sit. Rhoncus urna neque viverra justo nec. Suscipit tellus mauris a diam maecenas sed enim ut. Vitae justo eget magna fermentum iaculis eu non diam. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Praesent semper feugiat nibh sed pulvinar. Tellus elementum sagittis vitae et leo duis ut diam. Nunc aliquet bibendum enim facilisis gravida. Pharetra vel turpis nunc eget lorem dolor sed viverra. Mauris pharetra et ultrices neque ornare aenean.\nPurus sit amet luctus venenatis. Ornare massa eget egestas purus. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Ut consequat semper viverra nam libero. Enim diam vulputate ut pharetra sit amet aliquam id diam. Id semper risus in hendrerit gravida rutrum quisque non. Neque viverra justo nec ultrices dui sapien eget mi. Mauris a diam maecenas sed enim ut. Nec tincidunt praesent semper feugiat nibh sed pulvinar. Netus et malesuada fames ac. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Blandit turpis cursus in hac habitasse platea dictumst. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Et netus et malesuada fames ac turpis egestas. Orci ac auctor augue mauris. Pretium aenean pharetra magna ac placerat vestibulum. Morbi quis commodo odio aenean sed adipiscing diam donec. Cum sociis natoque penatibus et magnis.\nSuspendisse in est ante in nibh. Platea dictumst quisque sagittis purus sit amet volutpat.\nEst ultricies integer quis auctor elit sed vulputate mi sit. Rhoncus urna neque viverra justo nec. Suscipit tellus mauris a diam maecenas sed enim ut. Vitae justo eget magna fermentum iaculis eu non diam. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Praesent semper feugiat nibh sed pulvinar. Tellus elementum sagittis vitae et leo duis ut diam. Nunc aliquet bibendum enim facilisis gravida. Pharetra vel turpis nunc eget lorem dolor sed viverra. Mauris pharetra et ultrices neque ornare aenean."
};
