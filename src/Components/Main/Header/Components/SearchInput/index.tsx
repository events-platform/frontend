import { FC, useEffect, useState } from "react";
import { SearchLogo } from "../SVGs/";
import styles from "./SearchInput.module.sass";
interface ISearchInput {
  state: string,
  setState: (value: string) => void
}
export const SearchInput: FC<ISearchInput> = ({ state, setState }) => {
  const [query, setQuery] = useState<string>(state);
  const [init, setinit] = useState(false);
  useEffect(() => {
    const timeOutId = setTimeout(() => { if (init) setState(query); else setinit(true); }, 1000);
    return () => clearTimeout(timeOutId);
  }, [query]);
  useEffect(() => {
    setQuery(state);
  }, [state]);
  return (
    <div className={styles.SearchInput}>
      <input type="text" value={query} placeholder="Поиск" onChange={e => {
        setQuery(e.target.value);
      }} />
      <div>
        <SearchLogo scale="0.8" />
      </div>
    </div>
  );
};
