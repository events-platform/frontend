import { Link } from "react-router-dom";
import styles from "../../Profile/Events/Events.module.sass";

export const EventsEmpty = () => {
  return (
    <div className={styles.EventsEmpty}>
      <img src={require("../../../assets/profile/Yn6hmt4S69A.jpg")} alt="здесь пусто" width={328}/>
      <p className={styles.EmptyEventsText}>
        Ой, тут пусто.<br />
        Может быть пора
        <Link to="/events/create" className={styles.link}>
          &nbsp;создать собственное мероприятие
        </Link>
        ?
      </p>
    </div>
  );
};
