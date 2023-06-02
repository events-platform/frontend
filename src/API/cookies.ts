import { store } from "../store/store";

export const getJWT = () => {
  const state = store.getState();
  const JWT = "Bearer " + state.user.token;
  return JWT;
};

export const logout = (setCookie: (name: "access_token" | "refresh_token", value: any) => void) => {
  setCookie("access_token", "");
  setCookie("refresh_token", "");
};
