import { FC, ReactNode } from "react";
import styles from "./Button.module.sass";

interface PostProps {
  children: ReactNode;
  borderRadius?: string;
}

export const Button: FC<PostProps> = ({ children, borderRadius }) => {
  return (
    <button className={styles.Button} style={{ borderRadius }}>
      {children}
    </button>
  );
};
