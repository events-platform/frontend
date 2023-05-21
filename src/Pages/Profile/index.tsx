import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  About,
  EditSVG,
  EventsNavbar,
  Events,
  ProfileImage,
  Modal,
  ModalProfileEdit,
  SaveButton,
  AddSVG
} from "../../Components/Profile";

import styles from "./Profile.module.sass";
import { editUser, getUserData } from "../../API/profile";
import { store, useAppDispatch } from "../../store/store";
import { setUserName } from "../../store/reducers/userReducer";
import { Ipost, addPostToFavorite, getUserFavoritePosts, getUserPosts } from "../../API/post";
import { SecondaryButton } from "../../Components/SecondaryButton";

export enum SelectedTab {
  // eslint-disable-next-line no-unused-vars
  MyEvents,
  // eslint-disable-next-line no-unused-vars
  MyFavoriteEvents,
  // eslint-disable-next-line no-unused-vars
  MyParticipation
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
  const [isProfileEventsLoaded, setProfileEventsLoaded] = useState(false);
  const [profileFavoriteEvents, setProfileFavoriteEvents] = useState<Ipost[]>([]);
  const [isProfileFavoriteEventsLoaded, setProfileFavoriteEventsLoaded] = useState(false);

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
    getUserPosts(username)
      .then((res) => {
        setprofileEvents(res.data);
      })
      .then(() => setProfileEventsLoaded(true));
    getUserFavoritePosts(username)
      .then((res) => {
        setProfileFavoriteEvents(res.data);
      })
      .then(() => setProfileFavoriteEventsLoaded(true));
  }, []);
  const onFavoriteClick = (id: number) => {
    addPostToFavorite(id).then((res) =>
      getUserFavoritePosts(username).then((res) => {
        setProfileFavoriteEvents(res.data);
      })
    )
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  return (
    <>
      <div className={styles.AccountInfo}>
        <div className={styles.accContent}>
          <div className={styles.ProfileInfo}>
            <ProfileImage username={username} avtarUrl={avatar} setAvatar={setAvatar} />
            <div className={styles.Description}>
              <h1 className={styles.ProfileName}>{username}</h1>
              <p className={styles.ProfileDescription}>{description}</p>
              <About onClick={openModal} />
            </div>
            {isOwnProfile
              ? <div className={styles.ProfileTools}>
                <SaveButton onClick={() => navigate("/events/create")} text="Создать мероприятие" width={232} height={38}>
                  <AddSVG />
                </SaveButton>
                <SecondaryButton onClick={openModalChangeMode} text="Редактировать профиль" width={241} height={38} >
                  <EditSVG />
                </SecondaryButton>
              </div>
              : null }
          </div>
          <EventsNavbar
            profileEvents={profileEvents.length}
            profileFavoriteEvents={profileFavoriteEvents.length}
            profileActiveEvents={profileEvents.length}
            selected={selectedTab}
            setSelected={setselectedTab}
          />
        </div>
      </div>
      <Events
        addPostToFavorite={onFavoriteClick}
        selected={selectedTab}
        profileOwnEvents={profileEvents}
        profileFavoriteEvents={profileFavoriteEvents}
        isProfileEventsLoaded={isProfileEventsLoaded}
        isProfileFavoriteEventsLoaded={isProfileFavoriteEventsLoaded}
      />
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
