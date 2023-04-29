import React from "react";
import { SearchInput } from "./SearchInput";
import { Avatar, Logo, MapPoint } from "./SVGs";
import styles from "./Header.module.sass";
import { Link } from "react-router-dom";

interface HeaderProps {
  name?: string;
  avatar?: string;
  city?: string;
  isSignedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ name, avatar, city, isSignedIn }) => {
  const profileUrl = "/profile/" + name;
  return (
    <header className={styles.Header}>
      <div className={styles.leftSide}>
        <Link to={"/"}>
          <Logo />
        </Link>
        <SearchInput />
      </div>
      {isSignedIn
        ? <div className={styles.rigthSide}>
          <Link to={profileUrl}>
            <MapPoint />
            <span>
              Мои мероприятия
            </span>
          </Link>
          <Link to={"/404"}>
            <MapPoint />
            <span>
              {city}
            </span>
          </Link>
          <Link to={profileUrl}>
            <Avatar />
            <span>
              {name}
            </span>
          </Link>
        </div>
        : <div className={styles.rigthSide}>
          <Link to="/404">
            <MapPoint />
          </Link>
          <Link to={"/login/"}>
            <span>
            Вход
            </span>
          </Link>
          <Link to={"/reg/"}>
            <span>
            Регистрация
            </span>
          </Link>
        </div>
      }
    </header>
  );
};

Header.defaultProps = {
  name: "Дядя Богдан",
  city: "Екатеринбург"
};
