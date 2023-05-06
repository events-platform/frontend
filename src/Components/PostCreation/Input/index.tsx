import React from "react";
import styles from "./Input.module.sass";

interface InputProps {
  name?: string,
  placeholder?: string,
  width?: string,
  require?: boolean,
  state: string,
  setState: (val: string) => void
}

export const Input: React.FC<InputProps> = ({ name, placeholder, require, width, state, setState }) => {
  const handleChange = (event: { target: { value: any; }; }) => {
    setState(event.target.value);
  };
  return (
    <div className={styles.Input}>
      <p>
        <span>
          {require ? "* " : null}
        </span>
        {name}
      </p>
      <input value={state} onChange={handleChange} placeholder={placeholder} required={require} style={{ width }} />
    </div>
  );
};
