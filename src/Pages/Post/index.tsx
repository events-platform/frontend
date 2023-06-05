import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Arrow, Optional, Description, HiddenPost, Form } from "../../Components/Post";
import {
  Ipost,
  addPostToFavorite,
  convertDateToString,
  getPostById,
  subscribeToEvent
} from "../../API/post";
import styles from "./Post.module.sass";
import { LinkButton } from "../../Components/LinkButton";
import { SaveButton } from "../../Components/SaveButton";
import { FavoriteStar } from "../../Components/EventCard/FavoriteStar";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { guardIsSigned } from "../../API/cookies";
import { Modal } from "../../Components/Modal";
import { Cross } from "../../Components/PostCreation";

export const Post = () => {
  const viewportWidth = useSelector((state: RootState) => state.viewport.viewportWidth);
  const navigate = useNavigate();
  const { eventId } = useParams();
  const optionalSVGRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<Ipost>();
  const [optionalColor, setOptionalColor] = useState("#5AAE81");
  const [isOptionalHide, setOptionalHide] = useState(true);
  const [favorite, setfavorite] = useState(false);
  const [hiddenHeigth, setHiddenHeigth] = useState(106);
  const [isModalHidden, setModalHidden] = useState(true);
  const [starSize, setStarSize] = useState(32);

  useEffect(() => {
    if (viewportWidth < 320) {
      setStarSize(14);
    } else if (viewportWidth < 460) {
      setStarSize(18);
    } else if (viewportWidth < 940) {
      setStarSize(28);
    } else {
      setStarSize(32);
    }
  }, [viewportWidth]);

  useEffect(() => {
    if (eventId) {
      getPostById(+eventId)
        .then((res) => {
          setData(res.data);
        })
        .catch(() => navigate("/404"));
    }
  }, []);

  useEffect(() => {
    if (hiddenRef.current) {
      setHiddenHeigth(hiddenRef.current.offsetHeight);
    }
  }, [hiddenRef, data, viewportWidth]);

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
        hiddenRef.current.style.marginTop = `-${hiddenHeigth}px`;
        hiddenRef.current.style.opacity = "0";
      }
    }
    setOptionalHide(!isOptionalHide);
  };
  const subscribe = () => {
    setModalHidden(!isModalHidden);
    guardIsSigned(navigate, () => {
      const postId = +(eventId || 0);
      subscribeToEvent(postId)
        .then((res) => {
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    });
  };
  return (
    <>
      {!data
        ? <HiddenPost />
        : <div className={styles.Post}>
          <div className={styles.postContent}>
            <div className={styles.preview}>
              <img className={styles.image} src={data.image} alt="preview" />
              <div className={styles.black}>
                <div className={styles.postHeader}>
                  <button className={styles.arrow} onClick={() => navigate(-1)}>
                    <Arrow size={starSize} />
                  </button>
                  <FavoriteStar
                    width={`${starSize * 1.5}px`}
                    height={`${starSize * 1.5}px`}
                    starWidth={`${starSize}px`}
                    starHeight={`${starSize}px`}
                    favorite={favorite}
                    style={styles.star}
                    onClick={() => {
                      guardIsSigned(navigate, () => {
                        addPostToFavorite(+(eventId || 0));
                        setfavorite(true);
                      });
                    }}
                  />
                </div>
                <div className={styles.description}>
                  <h2 className={styles.typedate}>
                    {data.type} |{" "}
                    {convertDateToString(data.beginDate, data.endDate)}
                  </h2>
                  <h1 className={styles.name}>{data.name}</h1>
                  <h2 className={styles.avatarauthor}>
                    <img src={data.ownerAvatar} alt="avatar" />
                    <LinkButton to={`/profile/${data.ownerName}`}>
                      {data.ownerName}
                    </LinkButton>
                  </h2>
                  {viewportWidth > 570
                    ? <div className={styles.buttons}>
                      <SaveButton
                        text="Буду участвовать"
                        onClick={subscribe}
                        width={164}
                        height={38}
                      />
                    </div>
                    : null}
                </div>
              </div>
            </div>
            <div className={styles.content}>
              {viewportWidth > 570
                ? null
                : <div className={styles.buttons}>
                  <SaveButton
                    text="Буду участвовать"
                    onClick={subscribe}
                    width={"100%"}
                    height={38}
                  />
                </div>}
              <div className={styles.optional}>
                <button className={styles.show} onClick={() => handleOptional()}>
                  <h3>Дополнительная информация</h3>
                  <div className={styles.optionalWrapper} ref={optionalSVGRef}>
                    <Optional color={optionalColor} />
                  </div>
                </button>
                <div className={styles.hidden} ref={hiddenRef} style={{ marginTop: isOptionalHide ? `-${hiddenHeigth}px` : "0px" }}>
                  <LinkButton to={`mailto:${data.email}`}>
                    <Description
                      name={"Почта:"}
                      text={data.email.length > 23 ? data.email.slice(0, 20) + "..." : data.email }
                    />
                  </LinkButton>
                  <Description
                    name={"Кол-во мест:"}
                    text={`${data.registrationLimit}`}
                  />
                  <LinkButton to={`http://maps.google.com/?q=г.+Екатеринбург,+${data.location}`}>
                    <Description
                      name={"Место проведения:"}
                      text={data.location.length > 30 ? data.location.slice(0, 27) + "..." : data.location }
                      color={"rgba(90, 174, 129, 1)"}
                    />
                  </LinkButton>
                  <LinkButton to={`${data.externalLink}`}>
                    <Description
                      name={"Сайт:"}
                      text={data.externalLink.length > 35 ? data.externalLink.slice(0, 32) + "..." : data.externalLink }
                    />
                  </LinkButton>
                </div>
              </div>
              <h2 className={styles.about}>О мероприятии</h2>
              <p className={styles.text}>
                {data.description.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
              {/* {viewportWidth > 570
                ? <div className={styles.submit}>
                  <SaveButton
                    onClick={subscribe}
                    text="Буду участвовать"
                    width={viewportWidth > 570 ? 164 : "100%"}
                    height={38}
                  />
                </div>
                : null} */}
              <Modal isHidden={isModalHidden} closeModal={() => setModalHidden(true)}>
                <button className={styles.cross} onClick={() => setModalHidden(true)} >
                  <Cross />
                </button>
                <Form />
              </Modal>
            </div>
          </div>
        </div>}
    </>
  );
};
