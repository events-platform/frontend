import { Link } from "react-router-dom";
import { SearchLogo } from "../SVGs";
import styles from "./SearchInput.module.sass";

export const SearchInput = () => {
  return (
    <div className={styles.SearchInput}>
      <input type="text" placeholder="Поиск" />
      <Link to="404">
        <SearchLogo />
      </Link>
    </div>
  );
};
