import React, { RefObject, ReactNode } from "react";
import styles from "./Input.module.sass";

interface InputProps {
  text?: string;
  type?: string;
  color?: string;
  children?: ReactNode;
  setState: Function;
  ref?: RefObject<HTMLInputElement>;
  onEnter: Function;
  width?: number;
  limit?: number;
}

export const Input: React.FC<InputProps> = ({ text, children, type, color, setState, ref, onEnter, width, limit }) => {
  const handleChange = (event: { target: { value: any; }}) => {
    setState(event.target.value);
  };

  const handleKeyDown = (event: { key: any;}) => {
    if (event.key === "Enter") {
      onEnter();
    }
  };

  return (
    <div className={styles.InputWrapper}>
      <input
        type={type}
        className={`${styles.Input} media`}
        required
        placeholder={text}
        style={{ borderColor: color, width }}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={ref}
        maxLength={limit}
      />
      {children}
    </div>
  );
};

Input.defaultProps = {
  color: "#D9D9D9"
};
