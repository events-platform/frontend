import { FC, useState } from "react";
import { SearchInput } from "../Components/SearchInput";
import { Logo, LogoutSVG, MapPoint } from "../Components/SVGs";
import styles from "./DesktopHeader.module.sass";
import { Link, createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAppDispatch } from "../../../../store/store";
import { logoutUser } from "../../../../store/reducers/userReducer";
import { logout } from "../../../../API/cookies";
import { paths } from "../../../../API/paths";

interface DesktopHeaderProps {
  name?: string,
  city?: string,
  isSignedIn?: boolean,
  avatarUrl?: string
}

export const DesktopHeader: FC<DesktopHeaderProps> = ({ name, city, isSignedIn, avatarUrl }) => {
  const profileUrl = "/profile/" + name;
  const [, setCookie] = useCookies(["access_token", "refresh_token"]);
  const dispatch = useAppDispatch();
  const [search, setsearch] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const logOutClicked = () => {
    logout(setCookie);
    dispatch(logoutUser());
  };
  const onInputChange = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(location.search);
    if (location.pathname.replaceAll("/", "") !== paths.events.replaceAll("/", "")) {
      navigate({
        pathname: paths.events,
        search: createSearchParams({
          search: value
        }).toString()
      });
    } else {
      // eslint-disable-next-line no-console
      console.log("params");
      navigate({
        pathname: "/events",
        search: createSearchParams({
          search: value
        }).toString()
      });
    }
    setsearch(value);
  };
  return (
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
              <span>
              Все мероприятия
              </span>
            </Link>
            <div className={styles.mapPoint}>
              <Link to={`http://maps.google.com/?q=${city}`} >
                <MapPoint />
              </Link>
              <span>
                {city}
              </span>
            </div>
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
              <span>
              Все мероприятия
              </span>
            </Link>
            <div className={styles.mapPoint}>
            </div>
            <Link to={"/login/"}>
              <span>
            Вход
              </span>
            </Link>
            <Link to={"/reg/"}>
              <span>
            Регистрация
              </span>
            </Link>
          </div>
        }
      </div>
    </header>
  );
};
