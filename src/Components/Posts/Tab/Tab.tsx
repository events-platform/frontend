import styles from "./Tab.module.sass";
import React from "react";

interface ITab {
  text: string
}

export const Tab: React.FC<ITab> = ({ text }) => {
  return (
    <div className={styles.Tab}>
      <div>
        {text}
      </div>
    </div>
  );
};
