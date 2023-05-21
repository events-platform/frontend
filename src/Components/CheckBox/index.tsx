import React from "react";
import styles from "./CheckBox.module.sass";
import { Check } from "../Posts/Check/Check";
interface ICheckbox {
  label?: string,
  checked: boolean,
  onChange: (val: boolean) => void
}
export const Checkbox: React.FC<ICheckbox> = ({ label, checked, onChange }) => {
  return (
    <div className={styles.checkboxWrapper}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onChange(!checked)}
          className={checked ? `${styles.checked}` : ""}
        />
        <div className={styles.check}>
          <Check />
        </div>
        <span className={styles.label}>{label}</span>
      </label>
    </div>
  );
};
