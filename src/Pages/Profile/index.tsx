import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
import { editUser, getUserData } from "../../API/profile";

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
  const [description, setdescription] = useState("");
  const [profileUsername, setprofileUsername] = useState(username);
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [avatar, setAvatar] = useState("");
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
  const updateProfileInfo = (username: string) => {
    getUserData(username)
      .then(res => {
        setdescription(res.data.about);
        setprofileUsername(res.data.username);
        setphone(res.data.phone);
        setemail(res.data.email);
        setAvatar(res.data.avatar);
      });
    return () => {
    };
  };
  const sendProfileInfo = (username: string, about: string, phone: string, email: string) => {
    editUser(username, about, email, phone)
      .then(res => {
        setModalHidden(true);
        updateProfileInfo(username);
        navigate(`/profile/${username}`);
      })
      .catch(err => {
        if (err.code === 422) {
          // eslint-disable-next-line no-console
          console.log("validathion error");
        }
      });
  };
  useEffect(() => {
    updateProfileInfo(username);
  }, []);
  return (
    <>
      <div className={styles.AccountInfo}>
        <div className={styles.ProfileInfo}>
          <ProfileImage username={username} avtarUrl={avatar} />
          <div className={styles.Description}>
            <h1 className={styles.ProfileName}>{username}</h1>
            <p className={styles.ProfileDescription}>{description}</p>
            <About onClick={openModal} />
          </div>
          <div className={styles.ProfileTools}>
            <ToolButton
              text={"Создать мероприятие"}
              onClick={() => {
                navigate("/events/create");
              }}
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
        <EventsNavbar selected={selectedTab} setSelected={setselectedTab} />
      </div>
      <Events selected={selectedTab} />
      <Modal isHidden={modalHidden} closeModal={() => setModalHidden(true)}>
        <ModalProfileEdit sendProfileInfo={sendProfileInfo} username={profileUsername} about={description} phone={phone} email={email} inputMode={inputMode} setInputMode={setinputMode} isHidden={modalHidden} closeModal={() => setModalHidden(true)}/>
      </Modal>
    </>
  );
};
