import React from "react";
import { SearchInput } from "./SearchInput";
import { Avatar, Logo, MapPoint } from "./SVGs";
import styles from "./Header.module.sass";
import { Link } from "react-router-dom";

interface HeaderProps {
  name?: string;
  avatar?: string;
  city?: string;
}

export const Header: React.FC<HeaderProps> = ({ name, avatar, city }) => {
  return (
    <header className={styles.Header}>
      <div className={styles.leftSide}>
        <Logo />
        <SearchInput />
      </div>
      <div className={styles.rigthSide}>
        <Link to="/404">
          <MapPoint />
          <span>
            Мои мероприятия
          </span>
        </Link>
        <Link to="/404">
          <MapPoint />
          <span>
            {city}
          </span>
        </Link>
        <Link to="/login">
          <Avatar />
          <span>
            {name}
          </span>
        </Link>
      </div>
    </header>
  );
};

Header.defaultProps = {
  name: "Дядя Богдан",
  city: "Екатеринбург"
};
