/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { EventCard } from "../../Components/EventCard";
import styles from "./Posts.module.sass";
import { Ipost, addPostToFavorite, getEventFormats, getPostsParams } from "../../API/post";
import { HiddenEventCard } from "../../Components/HiddenEventCard";
import { Select } from "../../Components/PostCreation/Input";
import { SecondaryButton } from "../../Components/SecondaryButton";
import { Checkbox } from "../../Components/CheckBox";
import { createSearchParams, useNavigate } from "react-router-dom";
import { paths } from "../../API/paths";
import { EventsEmpty } from "../../Components/Posts/EventsEmpty";

export const Posts = () => {
  const [posts, setPosts] = useState<Ipost[]>();
  const [category, setcategory] = useState<string>("");
  const [timeFilter, settimeFilter] = useState("По Времени");
  const [checkBox, setcheckBox] = useState(true);
  const navigate = useNavigate();

  const getSortPosts = (options: { beginDate?: Date, endDate?: Date, organizer?: string[], type?: string[], page?: number, size?: number, sort?: string[] }) => {
    setPosts(undefined);
    getPostsParams(options)
      .then((res) => {
        setPosts(res.data.content);
      })
      .catch((err) => {
        setPosts([]);
        console.log(err);
      });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    if (type) {
      onTypeChanged(type);
    } else {
      getSortPosts({});
    }
  }, []);

  const onFavoriteClick = (id: number) => {
    addPostToFavorite(id).then();
  };
  const getViewPosts = (): Ipost[] => {
    if (!posts) return [];
    return posts.filter((el) => {
      if (checkBox) { return true; } else { return new Date() < new Date(el.endDate); }
    });
  };

  const onTypeChanged = (category: string) => {
    setcategory(category);
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    navigate({
      pathname: paths.events,
      search: createSearchParams({
        search,
        type: category
      }).toString()
    });
    getSortPosts({ type: [category] });
  };

  return (
    <div className={styles.Posts}>
      <div className={styles.postContent}>
        <>
          <div className={styles.postFilter}>
            <div className={styles.filterTabs}>
              {category !== "" || timeFilter !== "По Времени" ? "Фильтры:" : null}
              {category !== ""
                ? <SecondaryButton height={32} text={category} onClick={() => onTypeChanged("")}></SecondaryButton>
                : null}
              {timeFilter !== "По Времени" ? <SecondaryButton height={32} text={timeFilter} onClick={() => settimeFilter("По Времени")}></SecondaryButton> : null}
            </div>
            <div className={styles.filterTools}>
              <Select
                placeholder="Категории"
                width="150px"
                height="32px"
                state={"Категории"}
                setState={(val:string) => { onTypeChanged(val); } }
                selectValues={getEventFormats()}
                selectBackGroundColor="white"
              />
              <Select
                placeholder="По Времени"
                width="220px"
                height="32px"
                state={timeFilter}
                setState={settimeFilter}
                selectValues={["От новых к старым", "От старых к новым"]}
                selectBackGroundColor="white"
              />
              <div className={styles.CheckBox}>
                <Checkbox label="Показывать прошедшие мероприятия" onChange={(val) => setcheckBox(val)} checked={checkBox} />
              </div>
            </div>
          </div>
        </>
        <h1>
           Мероприятия
        </h1>
        <div className={styles.events}>
          {posts
            ? getViewPosts().length !== 0
              ? <div className={styles.events}>
                { getViewPosts().map((el) => (
                  <EventCard
                    onFavoriteClick={onFavoriteClick}
                    key={el.id}
                    preview={el.image}
                    author={el.ownerName}
                    name={el.name}
                    type={el.type}
                    beginDate={el.beginDate}
                    endDate={el.endDate}
                    id={el.id}
                    ownerAvatar={el.ownerAvatar}
                  />
                ))}
              </div>
              : <div className={styles.empty}>
                <EventsEmpty />
              </div>
            : <div className={styles.events}>
              { Array.from({ length: 15 }, (_, index) => (
                <HiddenEventCard key={index} />
              ))}
            </div>}
        </div>
      </div>
    </div>
  );
};
