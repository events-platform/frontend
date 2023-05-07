import React from "react";
import styles from "./Header.module.sass";

interface HeaderProps {
  link: (event: React.SyntheticEvent, targetRef: React.RefObject<HTMLDivElement>) => void,
  categoriesRef: React.RefObject<HTMLDivElement>,
  popularRef: React.RefObject<HTMLDivElement>,
  aboutRef: React.RefObject<HTMLDivElement>
}

export const Header: React.FC<HeaderProps> = ({ link, categoriesRef, popularRef, aboutRef }) => {
  return (
    <header className={styles.Header}>
      <div className={styles.headerContent}>
        <button onClick={(event) => link(event, categoriesRef)}>
          Категории
        </button>
        <button onClick={(event) => link(event, popularRef)}>
          Популярное
        </button>
        <button onClick={(event) => link(event, aboutRef)}>
          О нас
        </button>
      </div>
    </header>
  );
};
