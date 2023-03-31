import React, { ReactNode } from "react";
import styles from "./Input.module.sass";

interface InputProps {
  text: string;
  type: string;
  children: ReactNode;
}

export const Input: React.FC<InputProps> = ({ text, children, type }) => {
  return (
    <div className={styles.InputWrapper}>
      <input type={type} className={styles.Input} required placeholder={text} />
      {children}
    </div>
  );
};
