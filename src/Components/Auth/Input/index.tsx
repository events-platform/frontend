import React, { RefObject, ReactNode } from "react";
import styles from "./Input.module.sass";

interface InputProps {
  text?: string;
  type?: string;
  color?: string;
  children?: ReactNode;
  setState: Function;
  ref?: RefObject<HTMLInputElement>;
}

export const Input: React.FC<InputProps> = ({ text, children, type, color, setState, ref }) => {
  const handleChange = (event: { target: { value: any; }; }) => {
    setState(event.target.value);
  };

  return (
    <div className={styles.InputWrapper}>
      <input type={type} className={`${styles.Input} media`} required placeholder={text} style={{ borderColor: color }} onChange={handleChange} ref={ref} />
      {children}
    </div>
  );
};

Input.defaultProps = {
  color: "#D9D9D9"
};
