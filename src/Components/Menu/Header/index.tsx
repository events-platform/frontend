import { Link } from "react-router-dom";
import styles from "./Header.module.sass";

export const Header = () => {
  return (
    <header className={styles.Header}>
      <Link to="/404">
        Категории
      </Link>
      <Link to="/404">
        Популярное
      </Link>
      <Link to="/404">
        О нас
      </Link>
    </header>
  );
};
