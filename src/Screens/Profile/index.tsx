
import { useParams } from "react-router-dom";
import { AccountInfo } from "../../Pages/Profile";
import styles from "./Profile.module.sass";

export const Profile = () => {
  const params = useParams();
  const profileId: string = params.profileId || "";
  return (
    <div className={styles.Profile}>
      <AccountInfo username={profileId}/>
    </div>
  );
};
