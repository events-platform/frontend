import React from "react";
import styles from "../AccountInfo/AccountInfo.module.sass";
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
      <div className={styles.NavbarButton} style={{ color, borderBottom: active ? "2px solid green" : "" }} onClick={onClick}>
        {text} {count}
      </div>
    </>
  );
};
