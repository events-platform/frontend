import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Arrow, Optional, Star, Description } from "../../Components/Post";
import { getPostById } from "../../API/post";
import styles from "./Post.module.sass";
import { LinkButton } from "../../Components/LinkButton";
import { SaveButton } from "../../Components/SaveButton";

export const Post = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const optionalSVGRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState({
    beginDate: "",
    description: "",
    email: "",
    endDate: "",
    externalLink: "",
    format: "",
    id: 0,
    image: "",
    location: "",
    name: "",
    ownerName: "",
    registrationLimit: 0,
    type: ""
  });
  const [optionalColor, setOptionalColor] = useState("#5AAE81");
  const [isOptionalHide, setOptionalHide] = useState(true);

  useEffect(() => {
    if (eventId) {
      getPostById(+eventId)
        .then(res => {
          setData(res.data);
        });
    }
  }, []);

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
      <div className={styles.postContent}>
        <div className={styles.preview}>
          <img className={styles.image} src={data.image} alt="preview" />
          <div className={styles.black}>
            <button className={styles.arrow} onClick={() => navigate(-1)}>
              <Arrow />
            </button>
            <div className={styles.description}>
              <h2 className={styles.typedate}>
                {data.type} | {data.beginDate}
              </h2>
              <h1 className={styles.name}>
                {data.name}
              </h1>
              <h2 className={styles.avatarauthor}>
                <img src={data.image} alt="avatar" />
                {data.ownerName}
              </h2>
              <div className={styles.buttons}>
                <SaveButton text="Буду участвовать" width={164} height={38}/>
                <SaveButton text="" width={38} height={38}>
                  <div style={{ width: "100%", marginTop: "5px" }}>
                    <Star />
                  </div>
                </SaveButton >
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
              <LinkButton to={`mailto:${data.email}`}>
                <Description name={"Почта:"} text={`${data.email}`} />
              </LinkButton>
              <Description name={"Кол-во мест:"} text={`${data.registrationLimit}`} />
              <Description name={"Место проведения:"} text={`${data.location}`} color={"rgba(90, 174, 129, 1)"} />
              <LinkButton to={data.externalLink}>
                <Description name={"Сайт:"} text={`${data.externalLink}`} />
              </LinkButton>
            </div>
          </div>
          <h2 className={styles.about}>
          О мероприятии
          </h2>
          <p className={styles.text}>
            {data.description.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br/>
              </React.Fragment>
            ))}
          </p>
          <div className={styles.submit}>
            <SaveButton text="Буду участвовать" width={164} height={38}/>
          </div>
        </div>
      </div>
    </div>
  );
};
