/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { EventCard } from "../../Components/EventCard";
import styles from "./Posts.module.sass";
import { Ipost, addPostToFavorite, getEventFormats, getPostsParams, IPostsParamsOptions } from "../../API/post";
import { HiddenEventCard } from "../../Components/HiddenEventCard";
import { Select } from "../../Components/PostCreation/Input";
import { SecondaryButton } from "../../Components/SecondaryButton";
import { Checkbox } from "../../Components/CheckBox";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { paths } from "../../API/paths";
import { EventsEmpty } from "../../Components/Posts/EventsEmpty";
import { CrossSvg } from "../../Components/Posts/crsossSvg";

export const Posts = () => {
  const [posts, setPosts] = useState<Ipost[]>();
  const [category, setcategory] = useState<string>("");
  const [timeFilter, settimeFilter] = useState("От ближайших к поздним");
  const [checkBox, setcheckBox] = useState(false);
  const navigate = useNavigate();

  const getSortPosts = (options: IPostsParamsOptions) => {
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

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type") || "";
    const sort = timeFilter === "От ближайших к поздним" ? "beginDate" : "beginDate,desc";
    onTypeChanged(type, checkBox, sort);
  }, [location.search, checkBox, timeFilter]);

  const onFavoriteClick = (id: number) => {
    addPostToFavorite(id).then();
  };

  const getViewPosts = (): Ipost[] => {
    if (!posts) return [];
    return posts.filter((el) => {
      if (checkBox) { return true; } else { return new Date() < new Date(el.endDate); }
    });
  };

  const onTypeChanged = (_category: string = category, showEnded: boolean = checkBox, sort: string = "") => {
    setcategory(_category);
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("searchQuery") || "";
    navigate({
      pathname: paths.events,
      search: createSearchParams({
        type: _category,
        searchQuery
      }).toString()
    });
    getSortPosts({ type: [_category], showEnded, searchQuery, sort: [sort] });
  };

  return (
    <div className={styles.Posts}>
      <div className={styles.postContent}>
        <>
          <div className={styles.postFilter}>
            <div className={styles.filterTabs}>
              {category !== "" || timeFilter !== "По Времени" ? "Фильтры:" : null}
              {category !== ""
                ? <SecondaryButton height={32} text={category} onClick={() => onTypeChanged("")}>
                  <CrossSvg />
                </SecondaryButton>
                : null}
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
                width="260px"
                height="32px"
                state={timeFilter}
                setState={settimeFilter}
                selectValues={["От ближайших к поздним", "От поздних к ближайшим"]}
                selectBackGroundColor="white"
              />
              <div className={styles.CheckBox}>
                <Checkbox label="Показывать прошедшие мероприятия" onChange={(val) => { setcheckBox(val); } } checked={checkBox} />
              </div>
            </div>
          </div>
        </>
        <h1>
           Мероприятия
        </h1>
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
  );
};
