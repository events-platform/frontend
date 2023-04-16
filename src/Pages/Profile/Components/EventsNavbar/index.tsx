import { NavBarButton } from "../navbarButton";
import styles from "../../AccountInfo/AccountInfo.module.sass";
import { SelectedTab } from "../../AccountInfo";
import React from "react";
interface EventsNavbarInterface {
  selected: SelectedTab,
  setSelected: React.Dispatch<React.SetStateAction<SelectedTab>>
}
export const EventsNavbar: React.FC<EventsNavbarInterface> = ({ selected, setSelected }) => {
  return (
    <div className={styles.Navbar}>
      <NavBarButton text="Мои мероприятия" active={selected === SelectedTab.MyEvents} count={0} onClick={() => { setSelected(SelectedTab.MyEvents); }}/>
      <NavBarButton text="Избранные" active={selected === SelectedTab.MyFavoriteEvents} count={4} onClick={() => { setSelected(SelectedTab.MyFavoriteEvents); }}/>
    </div>
  );
};
