import { store } from "../store/store";
import axios from "./api";
export interface profileInfo {
  username: string,
  description: string
}

export const getProfileInfo = (username: string): profileInfo | null => {
  return {
    username: "Дядя богдан",
    description: "Простой человек с ключом на 9"
  };
};

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
