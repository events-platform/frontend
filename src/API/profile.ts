import { store } from "../store/store";
import axios from "./api";
export interface profileInfo {
  username: string,
  description: string
}

export const sendProfileImage = (profileImage: File | null) => {
  const formData:any = new FormData();
  formData.append("file", profileImage, profileImage?.name);
  const state = store.getState();
  const JWT = "Bearer " + state.user.token;
  return axios.post("user/avatar", formData, {
    headers: {
      Authorization: JWT
    }
  });
};
export const editUser = (username: string, about: string, email: string, phone: string) => {
  const state = store.getState();
  const JWT = "Bearer " + state.user.token;
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

type userDataReponse = {
  username: string,
  about: string,
  email: string,
  phone: string,
  avatar: string
}
export const getUserData = (username: string) => {
  const state = store.getState();
  const JWT = "Bearer " + state.user.token;
  return axios.get<userDataReponse>(`user/${username}`, {
    headers: {
      Authorization: JWT
    }
  });
};
