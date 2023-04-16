import React, { useState } from "react";
import styles from "../AccountInfo/AccountInfo.module.sass";
import { sendProfileImage } from "../../../API/profile";
interface profileProps {
  username: string
}

export const ProfileIamge: React.FC<profileProps> = ({ username }) => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const onProfileImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setProfileImage(e.target.files[0]);
    }
  };
  const updateProfileImg = (e: any) => {
    e.preventDefault();
    sendProfileImage(profileImage)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };
  return (
    <div>
      <img src={profileImage ? URL.createObjectURL(profileImage) : `http://localhost:7999/user/${username}/avatar`} width="200" className={styles.ProfileImg} />
      <form onSubmit={updateProfileImg}>
        <input type="file" name="file" onChange={onProfileImageChange} />
        <input type="submit" />
      </form>
    </div>
  );
};
