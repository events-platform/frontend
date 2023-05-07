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
import { store, useAppDispatch } from "../../store/store";
import { setUserName } from "../../store/reducers/userReducer";
import { Ipost, getSelfPosts } from "../../API/post";

export enum SelectedTab {
  // eslint-disable-next-line no-unused-vars
  MyEvents,
  // eslint-disable-next-line no-unused-vars
  MyFavoriteEvents,
}

export const Profile = () => {
  const params = useParams();
  const username: string = params.profileId || "";
  const dispatch = useAppDispatch();
  const isOwnProfile = username === store.getState().user.username;
  const navigate = useNavigate();
  const [description, setdescription] = useState("");
  const [profileUsername, setprofileUsername] = useState(username);
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [selectedTab, setselectedTab] = useState<SelectedTab>(
    SelectedTab.MyEvents
  );
  const [modalHidden, setModalHidden] = useState(true);
  const [inputMode, setinputMode] = useState(true);
  const [profileEvents, setprofileEvents] = useState<Ipost[]>([]);
  const openModal = () => {
    setinputMode(false);
    setModalHidden(false);
  };
  const openModalChangeMode = () => {
    setinputMode(true);
    setModalHidden(false);
  };
  const updateProfileInfo = (username: string) => {
    getUserData(username).then((res) => {
      setdescription(res.data.about);
      setprofileUsername(res.data.username);
      setphone(res.data.phone);
      setemail(res.data.email);
      setAvatar(res.data.avatar);
    });
    return () => {};
  };
  const sendProfileInfo = (
    username: string,
    about: string,
    phone: string,
    email: string
  ) => {
    editUser(username, about, email, phone)
      .then((res) => {
        setModalHidden(true);
        updateProfileInfo(username);
        dispatch(setUserName(username));
        navigate(`/profile/${username}`);
      })
      .catch((err) => {
        if (err.code === 422) {
          // eslint-disable-next-line no-console
          console.log("validathion error");
        }
      });
  };
  updateProfileInfo(username);
  useEffect(() => {
    getSelfPosts()
      .then((res) => {
        setprofileEvents(res.data);
      });
  }, []);
  return (
    <>
      <div className={styles.AccountInfo}>
        <div className={styles.ProfileInfo}>
          <ProfileImage username={username} avtarUrl={avatar} setAvatar={setAvatar} />
          <div className={styles.Description}>
            <h1 className={styles.ProfileName}>{username}</h1>
            <p className={styles.ProfileDescription}>{description}</p>
            <About onClick={openModal} />
          </div>
          {isOwnProfile
            ? <div className={styles.ProfileTools}>
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
            : null }
        </div>
        <EventsNavbar selected={selectedTab} setSelected={setselectedTab} />
      </div>
      <Events selected={selectedTab} profileOwnEvents={profileEvents} profileFavoriteEvents={[]} />
      <Modal isHidden={modalHidden} closeModal={() => setModalHidden(true)}>
        <ModalProfileEdit
          myOwnProfile={isOwnProfile}
          sendProfileInfo={sendProfileInfo}
          username={profileUsername}
          about={description}
          phone={phone}
          email={email}
          inputMode={inputMode}
          setInputMode={setinputMode}
          isHidden={modalHidden}
          closeModal={() => setModalHidden(true)}
        />
      </Modal>
    </>
  );
};
