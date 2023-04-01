import React, { ReactNode } from "react";
import styles from "./Input.module.sass";

interface InputProps {
  text?: string;
  type?: string;
  color?: string;
  children?: ReactNode;
  setState: Function;
}

export const Input: React.FC<InputProps> = ({ text, children, type, color, setState }) => {
  const handleChange = (event: { target: { value: any; }; }) => {
    setState(event.target.value);
  };

  return (
    <div className={styles.InputWrapper}>
      <input type={type} className={`${styles.Input} media`} required placeholder={text} style={{ borderColor: color }} onChange={handleChange} />
      {children}
    </div>
  );
};

Input.defaultProps = {
  color: "#D9D9D9"
};
