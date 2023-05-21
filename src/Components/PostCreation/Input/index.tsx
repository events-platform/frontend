import React, { useEffect, useState } from "react";
import styles from "./Input.module.sass";
import { SelectArrow } from "../SelectArrow";
import { OutsideAlerter } from "../../OutsideAlerter/OutsideAlerter";

interface InputProps {
  name?: string;
  placeholder?: string;
  width?: string;
  require?: boolean;
  state: string;
  setState: (val: string) => void;
  selectMode?: boolean;
  selectValues?: string[];
  focus?: boolean;
  border?: string ;
}

export const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  require,
  width,
  state,
  setState,
  selectMode,
  selectValues,
  focus,
  border
}) => {
  const [focused, setfocused] = useState(focus);
  const onInputChange = (e: any) => {
    if (e.target.value !== "") {
      setfocused(false);
    }
    setState(e.target.value);
  };
  useEffect(() => setfocused(focus), [focus]);
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
          border={require && focused && state === "" ? "1px solid red" : border}
        />
        : <div className={styles.inputContainer} style={{ width, border: require && focused && state === "" ? "1px solid red" : border }}>
          <input onBlur={() => setfocused(require ? state === "" : false)} value={state} onChange={onInputChange} placeholder={placeholder} />
        </div>
      }
    </div>
  );
};
Input.defaultProps = {
  selectMode: false,
  selectValues: [],
  focus: false,
  border: "1px solid #D9D9D9"
};

interface SelectProps {
  placeholder?: string;
  width?: string;
  height?: string;
  state: string;
  setState: (val: string) => void;
  selectValues?: string[];
  selectBackGroundColor?: string;
  border?: string
}
export const Select: React.FC<SelectProps> = ({
  placeholder,
  width,
  height,
  state,
  setState,
  selectValues,
  selectBackGroundColor,
  border
}) => {
  const [showSelect, setShowSelect] = useState(false);
  const onShowClicked = () => {
    setShowSelect(!showSelect);
  };
  return (
    <div className={styles.inputContainer} style={{ width, height, border }} onClick={() => setShowSelect(!showSelect)}>
      {showSelect
        ? (
          <OutsideAlerter onBlur={() => setShowSelect(false)}>
            <div className={styles.dropdownMenu} style={{ width }}>
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
          </OutsideAlerter>
        )
        : null}
      <input readOnly value={state} placeholder={placeholder} />
      <div className={styles.select} style={{ backgroundColor: selectBackGroundColor }} onClick={onShowClicked}>
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

Select.defaultProps = {
  border: "1px solid #D9D9D9"
};
