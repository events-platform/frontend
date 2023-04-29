import React from "react";
import styles from "./ToolButton.module.sass";

interface ToolButtonIntarface {
  children: React.ReactNode,
  text: string,
  bgColor: string,
  color: string,
  border: string,
  onClick?: () => void
}

export const ToolButton: React.FC<ToolButtonIntarface> = ({ children, text, bgColor, color, border, onClick }) => {
  return (
    <div>
      <div style={{ backgroundColor: bgColor, color, border }} className={styles.ToolButton} onClick={onClick}>
        {children}
        {text}
      </div>
    </div>
  );
};
