import React from "react";
import { NavBarButton } from "../";
import { SelectedTab } from "../../../Pages/Profile";
import styles from "../../../Pages/Profile/Profile.module.sass";

interface EventsNavbarInterface {
  selected: SelectedTab,
  setSelected: React.Dispatch<React.SetStateAction<SelectedTab>>
}

export const EventsNavbar: React.FC<EventsNavbarInterface> = ({ selected, setSelected }) => {
  return (
    <div className={styles.Navbar}>
      <NavBarButton
        text="Мои мероприятия"
        active={selected === SelectedTab.MyEvents}
        count={0}
        onClick={() => { setSelected(SelectedTab.MyEvents); }}
      />
      <NavBarButton
        text="Избранные"
        active={selected === SelectedTab.MyFavoriteEvents}
        count={4}
        onClick={() => { setSelected(SelectedTab.MyFavoriteEvents); }}
      />
    </div>
  );
};
