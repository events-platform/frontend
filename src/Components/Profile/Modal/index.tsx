import styles from "./Modal.module.sass";
import React, { useState } from "react";
import { EditSVG } from "../../../Pages/Profile/SVGs/edit";
interface ModalInterface {
  isHidden?: boolean,
  closeModal?: () => void,
  inputMode: boolean,
  setInputMode: React.Dispatch<React.SetStateAction<boolean>>
}
interface modalFieldInterface {
  titleText: string,
  valueText: string,
  setValueText: Function,
  inputMode?: boolean,
}
const ModalField: React.FC<modalFieldInterface> = ({ titleText, valueText, inputMode, setValueText }) => {
  const valueChange = (event: { target: { value: any; }; }) => {
    setValueText(event.target.value);
  };
  return (
    <div className={styles.ModalField}>
      <p className={styles.fieldTitle}>{titleText}</p>
      {inputMode
        ? <input className={styles.fieldValue} value={valueText} onChange={valueChange}/>
        : <p className={styles.fieldValue}>{valueText}</p>}
    </div>
  );
};
ModalField.defaultProps = {
  inputMode: false
};

interface ModalHeaderInterface {
  setInputMode: React.Dispatch<React.SetStateAction<boolean>>,
  inputMode: boolean
}
const ModalHeader: React.FC<ModalHeaderInterface> = ({ setInputMode, inputMode }) => {
  return (
    <div className={styles.ModalHeader}>
      {inputMode ? "Редактирование информации" : "Сведения о пользователе"}
      <div style={{ marginLeft: "auto" }} onClick={() => { setInputMode(!inputMode); }}>
        <EditSVG />
      </div>
    </div>
  );
};

export const Modal: React.FC<ModalInterface> = ({ isHidden, closeModal, inputMode, setInputMode }) => {
  const [profileName, setprofileName] = useState("Дядя Богдан");
  const [profileNumber, setprofileNumber] = useState("7 (924) 552-81-61");
  const [profileMail, setprofileMail] = useState("bogdan@gmail.com");
  return (
    <div className={`${styles.Modal} ${isHidden ? "" : styles.show}`}>
      <div className={styles.ModalDialog}>
        <ModalHeader setInputMode={setInputMode} inputMode={inputMode}/>
        <p className={styles.ModalBlockTitle}>Контактная информация</p>
        <ModalField titleText="Имя" valueText={profileName} setValueText={setprofileName} inputMode={inputMode}/>
        <ModalField titleText="Телефон" valueText={profileNumber} setValueText={setprofileNumber} inputMode={inputMode}/>
        <ModalField titleText="адрес эл. почты" valueText={profileMail} setValueText={setprofileMail} inputMode={inputMode}/>
        <div className={styles.underline}></div>
        <p className={styles.ModalBlockTitle}>Описание</p>
        <textarea readOnly={!inputMode} className={styles.ModalHug} defaultValue={"Простой человек с ключом на 9"} name="" id="" cols={30} rows={10}></textarea>
        <div className={styles.underline}></div>
        <div style={{ display: "flex" }}>
          {inputMode ? <button className={styles.ModalSaveButton}>Сохранить</button> : null }
          <button className={styles.ModalCloseButton} onClick={closeModal}>Закрыть</button>
        </div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  isHidden: true,
  closeModal: () => {}
};
