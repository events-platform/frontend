import { SearchLogo } from "../SVGs";
import styles from "./SearchInput.module.sass";

export const SearchInput = () => {
  return (
    <div className={styles.SearchInput}>
      <input type="text" placeholder="Поиск" />
      <div>
        <SearchLogo />
      </div>
    </div>
  );
};
