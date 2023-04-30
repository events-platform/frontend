import React, { useState, useEffect } from "react";
import { CloseButton } from "../../../Components/Profile/CloseButton";
import { SaveButton } from "../../../Components/Profile/SaveButton";
import { EditSVG } from "../SVGs/edit";
import styles from "./ModalEditProfile.module.sass";

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
        : <input className={`${styles.fieldValue} ${styles.fieldValueNoInput}`} value={valueText} />}
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

interface ModalProfileEditInterface {
  isHidden: boolean,
  closeModal: () => void,
  inputMode: boolean,
  setInputMode: React.Dispatch<React.SetStateAction<boolean>>,
  username: string,
  about: string,
  phone: string,
  email: string,
  sendProfileInfo: (
    username: string,
    about: string,
    phone: string,
    email: string) => void
}

export const ModalProfileEdit: React.FC<ModalProfileEditInterface> = ({ isHidden, closeModal, inputMode, setInputMode, username, about, email, phone, sendProfileInfo }) => {
  const [profileName, setprofileName] = useState(username);
  const [profileNumber, setprofileNumber] = useState(phone);
  const [profileMail, setprofileMail] = useState(email);
  const [profileAbout, setprofileAbout] = useState(about);
  // eslint-disable-next-line no-console
  useEffect(() => { setprofileName(username); }, [username]);
  useEffect(() => { setprofileNumber(phone); }, [phone]);
  useEffect(() => { setprofileMail(email); }, [email]);
  useEffect(() => { setprofileAbout(about); }, [about]);

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setprofileAbout(event.target.value);
  };
  return (
    <div className={styles.ModalContainer}>
      <ModalHeader setInputMode={setInputMode} inputMode={inputMode}/>
      <p className={styles.ModalBlockTitle}>Контактная информация</p>
      <ModalField titleText="Имя" valueText={profileName} setValueText={setprofileName} inputMode={inputMode}/>
      <ModalField titleText="Телефон" valueText={profileNumber} setValueText={setprofileNumber} inputMode={inputMode}/>
      <ModalField titleText="адрес эл. почты" valueText={profileMail} setValueText={setprofileMail} inputMode={inputMode}/>
      <div className={styles.underline}></div>
      <p className={styles.ModalBlockTitle}>Описание</p>
      <textarea readOnly={!inputMode} className={styles.ModalHug} value={profileAbout} onChange={handleChange} name="" id="" cols={30} rows={10}></textarea>
      <div className={styles.underline}></div>
      <div style={{ display: "flex" }}>
        {inputMode ? <SaveButton onClick={() => { sendProfileInfo(profileName, profileAbout, profileNumber, profileMail); }} /> : null }
        <CloseButton onClick={closeModal} />
      </div>
    </div>
  );
};
