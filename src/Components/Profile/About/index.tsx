import React from "react";
import { AboutSVG } from "../";
import styles from "./About.module.sass";

interface AboutInterface {
  onClick?: () => void
}

export const About:React.FC<AboutInterface> = ({ onClick }) => {
  return (
    <div onClick={onClick} className={styles.ProfileAbout}>
      <AboutSVG />
      <div className={styles.ProfileAboutText}>
        Узнать подробнее
      </div>
    </div>
  );
};
