import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProfileInfo } from "../../API/profile";

import {
  About,
  AddSVG,
  ToolButton,
  EditSVG,
  EventsNavbar,
  Events,
  ProfileImage,
  Modal,
  ModalProfileEdit
} from "../../Components/Profile";

import styles from "./Profile.module.sass";

export enum SelectedTab {
  // eslint-disable-next-line no-unused-vars
  MyEvents,
  // eslint-disable-next-line no-unused-vars
  MyFavoriteEvents
}

export const Profile = () => {
  const params = useParams();
  const username: string = params.profileId || "";
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
          <ProfileImage username={username} />
          <div className={styles.Description}>
            <h1 className={styles.ProfileName}>{user.username}</h1>
            <p className={styles.ProfileDescription}>{user.description}</p>
            <About onClick={openModal}/>
          </div>
          <div className={styles.ProfileTools}>
            <ToolButton
              text={"Создать мероприятие"}
              onClick={() => { navigate("/posts/create"); }}
              bgColor={"#5AAE81"}
              color={"white"}
              border={"1px solid"}
            >
              <AddSVG />
            </ToolButton>
            <ToolButton
              text={"Редактировать профиль"}
              onClick={openModalChangeMode}
              bgColor={"white"}
              color={"black"}
              border={"1px solid #D9D9D9"}
            >
              <EditSVG />
            </ToolButton>
          </div>
        </div>
        <EventsNavbar selected={selectedTab} setSelected={setselectedTab}/>
      </div>
      <Events selected={selectedTab}/>
      {!modalHidden
        ? <Modal isHidden={modalHidden} closeModal={() => setModalHidden(true)}>
          <ModalProfileEdit
            inputMode={inputMode}
            setInputMode={setinputMode}
            isHidden={modalHidden}
            closeModal={() => setModalHidden(true)}
          />
        </Modal>
        : null }
    </>
  );
};
