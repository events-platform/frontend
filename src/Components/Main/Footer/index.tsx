import styles from "./Footer.module.sass";
import { LinkButton } from "../../LinkButton";

export const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.footerContent}>
        <p>
          © 2023, EventMasters
        </p>
        <LinkButton to="mailto:event.masters@yandex.ru">
          Оставить обратную связь
        </LinkButton>
      </div>
    </footer>
  );
};
