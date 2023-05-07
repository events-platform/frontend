import React, { useState } from "react";
import styles from "./Input.module.sass";
import { SelectArrow } from "../SelectArrow";

interface InputProps {
  name?: string;
  placeholder?: string;
  width?: string;
  require?: boolean;
  state: string;
  setState: (val: string) => void;
  selectMode?: boolean;
  selectValues?: string[];
}

export const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  require,
  width,
  state,
  setState,
  selectMode,
  selectValues
}) => {
  const [showSelect, setShowSelect] = useState(false);
  const handleChange = (event: { target: { value: any } }) => {
    if (!selectMode) {
      setState(event.target.value);
    } else {
      setShowSelect(true);
    }
  };
  const onShowClicked = () => {
    setShowSelect(!showSelect);
  };
  return (
    <div className={styles.Input}>
      <p>
        <span>{require ? "* " : null}</span>
        {name}
      </p>
      <div className={styles.inputContainer} style={{ width }}>
        <input
          value={state}
          onChange={handleChange}
          placeholder={placeholder}
          required={require}
        />
        {selectMode
          ? (
            <div className={styles.select} onClick={onShowClicked}>
              <div className={`${styles.centered} ${showSelect ? styles.selectOpened : ""}`}>
                <SelectArrow />
              </div>
              {showSelect
                ? (
                  <div className={styles.dropdownMenu}>
                    {selectValues?.map((el, index) => {
                      return (<div key={index} onClick={() => { setState(el); }} className={styles.dropDownElement} >{el}</div>);
                    })}
                  </div>
                )
                : null}
            </div>
          )
          : null}
      </div>
    </div>
  );
};
Input.defaultProps = {
  selectMode: false,
  selectValues: []
};
