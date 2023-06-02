import { FC, useEffect, useState } from "react";
import { SearchLogo } from "../SVGs/";
import styles from "./SearchInput.module.sass";
interface ISearchInput {
  state: string,
  setState: (value: string) => void
}
export const SearchInput: FC<ISearchInput> = ({ state, setState }) => {
  const [query, setQuery] = useState("");
  useEffect(() => {
    const timeOutId = setTimeout(() => setState(query), 1000);
    return () => clearTimeout(timeOutId);
  }, [query]);
  return (
    <div className={styles.SearchInput}>
      <input type="text" value={query} placeholder="Поиск" onChange={e => setQuery(e.target.value)} />
      <div>
        <SearchLogo />
      </div>
    </div>
  );
};
