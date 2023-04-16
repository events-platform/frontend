import { AboutSVG } from "../SVGs/about";
import styles from "../AccountInfo/AccountInfo.module.sass";
import React from "react";
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
