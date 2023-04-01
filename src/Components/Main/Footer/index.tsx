import { Link } from "react-router-dom";
import styles from "./Footer.module.sass";

export const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <p>
        © 2023, EventMasters
      </p>
      <Link to="/404">
        Оставить обратную связь
      </Link>
    </footer>
  );
};
