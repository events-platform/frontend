import React from "react";
import styles from "./NavBarButton.module.sass";

interface navbarProps {
  active: boolean,
  text: string,
  count: number,
  onClick?: () => void
}

export const NavBarButton: React.FC<navbarProps> = ({ active, text, count, onClick }) => {
  const color = active ? "#5AAE81" : "black";
  return (
    <>
      <div
        className={styles.NavbarButton}
        style={{ color, borderBottom: active ? "2px solid green" : "" }}
        onClick={onClick}
      >
        {text}&nbsp;
        <div className={styles.count} style={{ background: active ? "#E7FFE6" : "" }}>
          {count}
        </div>
      </div>
    </>
  );
};
