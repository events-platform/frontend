import axios from "./api";
import { getJWT } from "./cookies";
export interface profileInfo {
  username: string,
  description: string
}

export const sendProfileImage = (profileImage: File | null) => {
  const formData:any = new FormData();
  formData.append("file", profileImage, profileImage?.name);
  const JWT = getJWT();
  return axios.post("user/files/avatar", formData, {
    headers: {
      Authorization: JWT
    }
  });
};
export const editUser = (username: string, about: string, email: string, phone: string) => {
  const JWT = getJWT();
  return axios.post("user/edit", {
    username,
    about,
    email,
    phone
  }, {
    headers: {
      Authorization: JWT
    }
  });
};

export type userDataReponse = {
  username: string,
  about: string,
  email: string,
  phone: string,
  avatar: string
}
export const getUserData = (username: string) => {
  const JWT = getJWT();
  return axios.get<userDataReponse>(`user/${username}`, {
    headers: {
      Authorization: JWT
    }
  });
};
