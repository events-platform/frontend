import { Header } from "../../Components/Main";
import { AccountInfo } from "../../Components/Profile";
import styles from "./Profile.module.sass";

export const Profile = () => {
  return (
    <div className={styles.Profile}>
      <Header />
      <AccountInfo />
      1
    </div>
  );
};
