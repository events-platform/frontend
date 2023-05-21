import { Link } from "react-router-dom";
import { Burger, Logo, SearchLogo } from "../Components/SVGs";
import styles from "./MobileHeader.module.sass";

export const MobileHeader = () => {
  return (
    <header className={styles.Header}>
      <div className={styles.headerContent}>
        <Burger />
        <Link to="/">
          <Logo />
        </Link>
        <SearchLogo scale={styles.scale} />
      </div>
    </header>
  );
};
