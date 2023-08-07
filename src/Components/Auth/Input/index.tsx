import React, { RefObject, ReactNode, useState } from "react";
import { EyeSleep } from "./EyeSleep";
import { EyeWake } from "./EyeWake";
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

  const [isShow, setShow] = useState(false);

  return (
    <div className={styles.InputWrapper}>
      <input
        type={type === "password" ? !isShow ? type : "text" : type}
        className={`${styles.Input} media`}
        required
        placeholder={text}
        style={{ borderColor: color, width, paddingRight: type === "password" ? "42px" : "12px" }}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={ref}
        maxLength={limit}
      />
      {children}
      {type === "password"
        ? <button className={styles.show} onClick={() => setShow(!isShow)}>
          {isShow ? <EyeWake /> : <EyeSleep />}
        </button>
        : null}
    </div>
  );
};

Input.defaultProps = {
  color: "#D9D9D9"
};
