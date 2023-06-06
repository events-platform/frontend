/* eslint-disable no-console */
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { Burger, Logo, SearchLogo } from "../Components/SVGs";
import styles from "./MobileHeader.module.sass";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { Close } from "../Components/SVGs/Close";
import { paths } from "../../../../API/paths";

interface IBurgerHeader {
  showInput: boolean,
  setshowInput: (value: boolean) => void
}
const BurgerHeader: FC<IBurgerHeader> = ({ showInput, setshowInput }) => {
  const [showBurger, setshowBurger] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const profileUrl = "/profile/" + user.username;
  const naviagte = useNavigate();
  return (
    <>
      <div className={styles.headerContent}>
        <div style={{ height: 28, width: 35 }} onClick={() => setshowBurger(!showBurger)}>
          {!showBurger
            ? <Burger />
            : <Close /> }
        </div>
        <div className={styles.logo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div onClick={() => setshowInput(true)}>
          <SearchLogo scale={styles.scale} />
        </div>
      </div>
      <div style={{ display: showBurger ? "block" : "none" }} className={styles.burger} >
        <div>
          <div>
            {user.isSignedIn
              ? <div className={styles.user} onClick={() => { naviagte(profileUrl); setshowBurger(false); } }>
                <img src={user.avatarUrl} className={styles.avatarUrl} />
                <p>{user.username}</p>
              </div>
              : <div className={styles.user} onClick={() => { naviagte("/login"); setshowBurger(false); } }>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.4151 10.9323C12.1203 10.2342 11.6926 9.60001 11.1557 9.06516C10.6204 8.52877 9.98637 8.10111 9.28852 7.80579C9.28227 7.80266 9.27602 7.8011 9.26977 7.79797C10.2432 7.09485 10.876 5.94954 10.876 4.65735C10.876 2.51672 9.14164 0.782349 7.00102 0.782349C4.86039 0.782349 3.12602 2.51672 3.12602 4.65735C3.12602 5.94954 3.75883 7.09485 4.73227 7.79954C4.72602 7.80266 4.71977 7.80422 4.71352 7.80735C4.01352 8.10266 3.38539 8.5261 2.84633 9.06672C2.30994 9.60199 1.88227 10.2361 1.58695 10.9339C1.29683 11.6171 1.14036 12.3496 1.12602 13.0917C1.1256 13.1084 1.12852 13.125 1.13462 13.1405C1.14071 13.156 1.14985 13.1702 1.1615 13.1821C1.17315 13.1941 1.18707 13.2036 1.20245 13.21C1.21782 13.2165 1.23433 13.2199 1.25102 13.2199H2.18852C2.25727 13.2199 2.31195 13.1652 2.31352 13.098C2.34477 11.8917 2.82914 10.762 3.68539 9.90579C4.57133 9.01985 5.74789 8.53235 7.00102 8.53235C8.25414 8.53235 9.4307 9.01985 10.3166 9.90579C11.1729 10.762 11.6573 11.8917 11.6885 13.098C11.6901 13.1667 11.7448 13.2199 11.8135 13.2199H12.751C12.7677 13.2199 12.7842 13.2165 12.7996 13.21C12.815 13.2036 12.8289 13.1941 12.8405 13.1821C12.8522 13.1702 12.8613 13.156 12.8674 13.1405C12.8735 13.125 12.8764 13.1084 12.876 13.0917C12.8604 12.3448 12.7057 11.6183 12.4151 10.9323ZM7.00102 7.34485C6.28383 7.34485 5.60883 7.06516 5.10102 6.55735C4.5932 6.04954 4.31352 5.37454 4.31352 4.65735C4.31352 3.94016 4.5932 3.26516 5.10102 2.75735C5.60883 2.24954 6.28383 1.96985 7.00102 1.96985C7.7182 1.96985 8.3932 2.24954 8.90102 2.75735C9.40883 3.26516 9.68852 3.94016 9.68852 4.65735C9.68852 5.37454 9.40883 6.04954 8.90102 6.55735C8.3932 7.06516 7.7182 7.34485 7.00102 7.34485Z" fill="white"/>
                </svg>
                <p>Вход</p>
              </div>}
          </div>
        </div>
        <div onClick={() => { naviagte("/events"); setshowBurger(false); } }>
          <p>Все мероприятия</p>
        </div>
      </div>
    </>
  );
};
interface IinputHeader {
  input: string,
  setinput: (value: string) => void,
  showInput: boolean,
  setshowInput: (value: boolean) => void
}
const InputHeader: FC<IinputHeader> = ({ setshowInput, setinput, input }) => {
  const navigate = useNavigate();
  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    const type = params.get("type") || "";
    // если не находимся на events
    if (location.pathname.replaceAll("/", "") !== paths.events.replaceAll("/", "")) {
      navigate({
        pathname: paths.events,
        search: createSearchParams({
          searchQuery: input,
          type
        }).toString()
      });
    } else {
      navigate({
        pathname: "/events",
        search: createSearchParams({
          searchQuery: input,
          type
        }).toString()
      });
    }
  };
  return (
    <div className={styles.InputHeader}>
      <form action="search" onSubmit={onFormSubmit}>
        <input value={input} onChange={(e) => setinput(e.target.value)} type="text" />
      </form>
      <div style={{ width: 22, height: 22 }}>
        <SearchLogo scale={styles.scale} />
      </div>
      <div onClick={() => setshowInput(false)}>
        <Close />
      </div>
    </div>
  );
};

export const MobileHeader = () => {
  const [showInput, setshowInput] = useState(false);
  const [input, setinput] = useState("");

  return (
    <header className={styles.Header}>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"></meta>
      {!showInput ? <BurgerHeader showInput={showInput} setshowInput={setshowInput} /> : <InputHeader showInput={showInput} setshowInput={setshowInput} input={input} setinput={setinput} />}
    </header>
  );
};
