import styles from "./AccountInfo.module.sass";
import { About } from "../Components/AboutButton";
import React, { useState } from "react";
import { AddSVG } from "../SVGs/add";
import { ToolButton } from "../Components/ToolButton";
import { EditSVG } from "../SVGs/edit";
import { getProfileInfo } from "../../../API/profile";
import { EventsNavbar } from "../Components/EventsNavbar";
import { Events } from "../Components/Events/EventsList";
import { ProfileIamge } from "../Components/ProfileAvatar";
import { Modal } from "../../../Components/Profile/Modal";
import { ModalProfileEdit } from "../ModalEditProfile";
import { useNavigate } from "react-router-dom";

interface profileProps {
  username: string
}
export enum SelectedTab {
  // eslint-disable-next-line no-unused-vars
  MyEvents,
  // eslint-disable-next-line no-unused-vars
  MyFavoriteEvents
}

export const AccountInfo: React.FC<profileProps> = ({ username }) => {
  const navigate = useNavigate();
  const user = getProfileInfo(username) || { username: "-", description: "-" };
  const [selectedTab, setselectedTab] = useState<SelectedTab>(SelectedTab.MyEvents);
  const [modalHidden, setModalHidden] = useState(true);
  const [inputMode, setinputMode] = useState(true);
  const openModal = () => {
    setinputMode(false);
    setModalHidden(false);
  };
  const openModalChangeMode = () => {
    setinputMode(true);
    setModalHidden(false);
  };
  return (
    <>
      <div className={styles.AccountInfo}>
        <div className={styles.ProfileInfo}>
          <ProfileIamge username={username} />
          <div className={styles.Description}>
            <h1 className={styles.ProfileName}>{user.username}</h1>
            <p className={styles.ProfileDescription}>{user.description}</p>
            <About onClick={openModal}/>
          </div>
          <div className={styles.ProfileTools}>
            <ToolButton text={"Создать мероприятие"} onClick={() => { navigate("/createpost"); }} bgColor={"#5AAE81"} color={"white"} border={"1px solid"}><AddSVG /></ToolButton>
            <ToolButton text={"Редактировать профиль"} onClick={openModalChangeMode} bgColor={"white"} color={"black"} border={"1px solid #D9D9D9"}><EditSVG /></ToolButton>
          </div>
        </div>
        <EventsNavbar selected={selectedTab} setSelected={setselectedTab}/>
      </div>
      <Events selected={selectedTab}/>
      <Modal isHidden={modalHidden} closeModal={() => setModalHidden(true)}>
        <ModalProfileEdit inputMode={inputMode} setInputMode={setinputMode} isHidden={modalHidden} closeModal={() => setModalHidden(true)}/>
      </Modal>
    </>
  );
};
