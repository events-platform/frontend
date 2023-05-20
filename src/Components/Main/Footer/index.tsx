import { Link } from "react-router-dom";
import styles from "./Footer.module.sass";

export const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.footerContent}>
        <p>
          © 2023, EventMasters
        </p>
        <Link to="mailto:event.masters@yandex.ru">
          Оставить обратную связь
        </Link>
      </div>
    </footer>
  );
};
