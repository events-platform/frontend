/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { SearchInput } from "../Components/SearchInput";
import { Logo, LogoutSVG } from "../Components/SVGs";
import { Link, createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { RootState, useAppDispatch } from "../../../../store/store";
import { logoutUser } from "../../../../store/reducers/userReducer";
import { logout } from "../../../../API/cookies";
import { paths } from "../../../../API/paths";
import styles from "./DesktopHeader.module.sass";
import { useSelector } from "react-redux";
import { Notifications } from "../Components/SVGs/Notifications";
import { Calendar } from "../Components/SVGs/Calendar";
import { NotificationsMenu } from "../Components/NotificationsMenu";
import { setCalendarHide, setNotificationsHide } from "../../../../store/reducers/dropDownReducer";
import { CalendarMenu } from "../Components/CalendarMenu";

export const DesktopHeader = () => {
  const name = useSelector((state: RootState) => state.user.username);
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const avatarUrl = useSelector((state: RootState) => state.user.avatarUrl);
  const isNotificationsHide = useSelector((state: RootState) => state.notifications);
  const isCalendarHide = useSelector((state: RootState) => state.calendar);
  const [activeNotifications, setNotifications] = useState(1);

  useEffect(() => {
    if (localStorage.getItem("notifications") === "0") {
      setNotifications(0);
    }
  }, []);

  const setActiveNotifications = (number: Number) => {
    setNotifications(0);
    localStorage.setItem("notifications", "0");
  };

  const profileUrl = "/profile/" + name;
  const [, setCookie] = useCookies(["access_token", "refresh_token"]);
  const [search, setsearch] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logOutClicked = () => {
    logout(setCookie);
    dispatch(logoutUser());
  };
  const onInputChange = (value: string) => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type") || "";
    // если не находимся на events
    if (location.pathname.replaceAll("/", "") !== paths.events.replaceAll("/", "")) {
      navigate({
        pathname: paths.events,
        search: createSearchParams({
          searchQuery: value,
          type
        }).toString()
      });
    } else {
      navigate({
        pathname: "/events",
        search: createSearchParams({
          searchQuery: value,
          type
        }).toString()
      });
    }
    setsearch(value);
  };
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("searchQuery") || "";
    setsearch(search);
  }, []);

  const hide = () => {
    if (!isCalendarHide) {
      dispatch(setCalendarHide());
    } else {
      dispatch(setNotificationsHide());
    }
  };

  return (
    <>
      {!isNotificationsHide || !isCalendarHide ? <div onClick={() => hide()} className={styles.blank} /> : null }
      <header className={styles.Header}>
        <div className={styles.headerContent}>
          <div className={styles.leftSide}>
            <Link to={"/"}>
              <Logo />
            </Link>
            <SearchInput state={search} setState={onInputChange}/>
          </div>
          {isSignedIn
            ? <div className={styles.rigthSide}>
              <Link to={"/events"}>
                <span className={styles.all}>
                Все мероприятия
                </span>
              </Link>
              <div className={styles.line} />
              <div className={styles.wrap}>
                <button onClick={() => dispatch(setCalendarHide())} className={styles.drop}>
                  <Calendar />
                </button>
                {isCalendarHide ? null : <CalendarMenu />}
              </div>
              <div className={styles.line} />
              <div className={styles.wrap}>
                <button onClick={() => dispatch(setNotificationsHide())} className={styles.drop}>
                  <Notifications number={activeNotifications} />
                </button>
                {isNotificationsHide ? null : <NotificationsMenu setActiveNotifications={setActiveNotifications} activeNotifications={activeNotifications} />}
              </div>
              <div className={styles.line} />
              <Link to={profileUrl}>
                <img className={styles.Avatar} src={avatarUrl} alt="avatar" />
                <span>
                  {name}
                </span>
              </Link>
              <div className={styles.logoutBtn} onClick={logOutClicked}>
                <LogoutSVG />
              </div>
            </div>
            : <div className={styles.rigthSide}>
              <Link to={"/events"}>
                <span className={styles.all}>
              Все мероприятия
                </span>
              </Link>
              <div className={styles.auth}>
                <Link to={"/login/"}>
                  <span>
                  Вход
                  </span>
                </Link>
                <span>
                |
                </span>
                <Link to={"/reg/"}>
                  <span>
                  Регистрация
                  </span>
                </Link>
              </div>
            </div>
          }
        </div>
      </header>
    </>
  );
};
