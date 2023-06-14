import React from "react";
import { NavBarButton } from "../";
import { SelectedTab } from "../../../Pages/Profile";
import styles from "./EventsNavbar.module.sass";

interface EventsNavbarInterface {
  selected: SelectedTab,
  setSelected: React.Dispatch<React.SetStateAction<SelectedTab>>,
  profileEvents: number,
  profileFavoriteEvents: number,
  profileActiveEvents: number
}

export const EventsNavbar: React.FC<EventsNavbarInterface> = ({ selected, setSelected, profileEvents, profileActiveEvents, profileFavoriteEvents }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Navbar}>
        <NavBarButton
          text="Организатор"
          active={selected === SelectedTab.MyEvents}
          count={profileEvents}
          onClick={() => { setSelected(SelectedTab.MyEvents); }}
        />
        <NavBarButton
          text="Избранные"
          active={selected === SelectedTab.MyFavoriteEvents}
          count={profileFavoriteEvents}
          onClick={() => { setSelected(SelectedTab.MyFavoriteEvents); }}
        />
        <NavBarButton
          text="Участие"
          active={selected === SelectedTab.MyParticipation}
          count={profileActiveEvents}
          onClick={() => { setSelected(SelectedTab.MyParticipation); }}
        />
      </div>
    </div>
  );
};
