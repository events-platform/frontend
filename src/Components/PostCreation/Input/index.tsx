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
  const onInputChange = (e: any) => {
    setState(e.target.value);
  };
  return (
    <div className={styles.Input}>
      <p>
        <span>{require ? "* " : null}</span>
        {name}
      </p>
      {selectMode
        ? <Select
          width={width}
          placeholder={placeholder}
          state={state}
          setState={setState}
          selectValues={selectValues}
        />
        : <div className={styles.inputContainer} style={{ width }}>
          <input value={state} onChange={onInputChange} placeholder={placeholder} />
        </div>
      }
    </div>
  );
};
Input.defaultProps = {
  selectMode: false,
  selectValues: []
};

interface SelectProps {
  placeholder?: string;
  width?: string;
  state: string;
  setState: (val: string) => void;
  selectValues?: string[];
}
export const Select: React.FC<SelectProps> = ({
  placeholder,
  width,
  state,
  setState,
  selectValues
}) => {
  const [showSelect, setShowSelect] = useState(false);
  const onShowClicked = () => {
    setShowSelect(!showSelect);
  };
  return (
    <div className={styles.inputContainer} style={{ width }} onClick={() => setShowSelect(!showSelect)}>
      {showSelect
        ? (
          <div className={styles.dropdownMenu}>
            {selectValues?.map((el, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setState(el);
                    setShowSelect(false);
                  }}
                  className={styles.dropDownElement}
                >
                  {el}
                </div>
              );
            })}
          </div>
        )
        : null}
      <input readOnly value={state} placeholder={placeholder} />
      <div className={styles.select} onClick={onShowClicked}>
        <div
          className={`${styles.centered} ${
            showSelect ? styles.selectOpened : ""
          }`}
        >
          <SelectArrow />
        </div>
      </div>
    </div>
  );
};
