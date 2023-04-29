import React from "react";
import styles from "./Input.module.sass";

interface InputProps {
  name?: string,
  placeholder?: string,
  width?: string,
  require?: boolean
}

export const Input: React.FC<InputProps> = ({ name, placeholder, require, width }) => {
  return (
    <div className={styles.Input}>
      <p>
        <span>
          {require ? "* " : null}
        </span>
        {name}
      </p>
      <input placeholder={placeholder} required={require} style={{ width }} />
    </div>
  );
};
