import React from "react";
import styles from "./Button.module.sass";

interface PostProps {
  children: React.ReactNode;
  borderRadius?: string;
}

export const Button: React.FC<PostProps> = ({ children, borderRadius }) => {
  return (
    <button className={styles.Button} style={{ borderRadius }}>
      {children}
    </button>
  );
};
