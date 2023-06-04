import React, { useState, useEffect } from "react";
import { SaveButton } from "../../SaveButton";
import styles from "./ModalEditProfile.module.sass";
import { EditSVG } from "../SVGs";
import { SecondaryButton } from "../../SecondaryButton";

interface modalFieldInterface {
  titleText: string,
  valueText: string,
  setValueText: Function,
  inputMode?: boolean,
  limit?: number
}
const ModalField: React.FC<modalFieldInterface> = ({ titleText, valueText, inputMode, setValueText, limit }) => {
  const valueChange = (event: { target: { value: any; }; }) => {
    setValueText(event.target.value);
  };
  return (
    <div className={styles.ModalField}>
      <p className={styles.fieldTitle}>{titleText}</p>
      {inputMode
        ? <input className={styles.fieldValue} value={valueText || ""} onChange={valueChange} maxLength={limit}/>
        : <input className={`${styles.fieldValue} ${styles.fieldValueNoInput}`} value={valueText || ""} maxLength={limit}/>}
    </div>
  );
};
ModalField.defaultProps = {
  inputMode: false
};

interface ModalHeaderInterface {
  setInputMode: React.Dispatch<React.SetStateAction<boolean>>,
  inputMode: boolean,
  myOwnProfile: boolean
}
const ModalHeader: React.FC<ModalHeaderInterface> = ({ setInputMode, inputMode, myOwnProfile }) => {
  return (
    <div className={styles.ModalHeader}>
      {inputMode ? "Редактирование информации" : "Сведения о пользователе"}
      <div style={{ marginLeft: "auto" }} onClick={() => { setInputMode(!inputMode); }}>
        { myOwnProfile ? (<EditSVG fill={inputMode ? "#D9D9D9" : "#5AAE81"} />) : null }
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
  myOwnProfile: boolean,
  sendProfileInfo: (
    username: string,
    about: string,
    phone: string,
    email: string) => void
}

export const ModalProfileEdit: React.FC<ModalProfileEditInterface> = ({ isHidden, closeModal, inputMode, setInputMode, username, about, email, phone, sendProfileInfo, myOwnProfile }) => {
  if (!myOwnProfile) {
    inputMode = false;
  }
  const [profileName, setprofileName] = useState<string>("");
  const [profileNumber, setprofileNumber] = useState<string>("");
  const [profileMail, setprofileMail] = useState<string>("");
  const [profileAbout, setprofileAbout] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => { setprofileName(username); }, [username]);
  useEffect(() => { setprofileNumber(phone); }, [phone]);
  useEffect(() => { setprofileMail(email); }, [email]);
  useEffect(() => { setprofileAbout(about); }, [about]);

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setprofileAbout(event.target.value);
  };

  const save = () => {
    if (profileName.length > 36) {
      setError("Имя пользователя не может быть длинее 36 символов");
      return;
    }
    if (profileAbout.length > 100) {
      setError("Описание не может быть длинее 100 символов");
      return;
    }
    setError("");
    sendProfileInfo(profileName, profileAbout, profileNumber, profileMail);
  };

  return (
    <div className={styles.ModalContainer}>
      <ModalHeader setInputMode={setInputMode} inputMode={inputMode} myOwnProfile={myOwnProfile}/>
      <p className={styles.ModalBlockTitle}>Контактная информация</p>
      <ModalField titleText="Имя" valueText={profileName} setValueText={setprofileName} inputMode={inputMode} limit={36} />
      <ModalField titleText="Телефон" valueText={profileNumber} setValueText={setprofileNumber} inputMode={inputMode} />
      <ModalField titleText="Адрес эл. почты" valueText={profileMail} setValueText={setprofileMail} inputMode={inputMode} />
      <div className={styles.underline}></div>
      <p className={styles.ModalBlockTitle}>Описание</p>
      <textarea maxLength={100} readOnly={!inputMode} className={styles.ModalHug} value={profileAbout || ""} onChange={handleChange} name="" id="" cols={30} rows={10}></textarea>
      <p className={styles.error}>
        {error}
      </p>
      <div className={styles.underline}></div>
      <div style={{ display: "flex", gap: "15px" }}>
        {inputMode ? <SaveButton onClick={save} /> : null }
        <SecondaryButton onClick={closeModal} width={102} height={32} text="Закрыть" />
      </div>
    </div>
  );
};
