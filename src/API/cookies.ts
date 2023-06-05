import { NavigateFunction } from "react-router-dom";
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

export const guardIsSigned = (navigate: NavigateFunction, callback: () => void) => {
  const isSignedIn = store.getState().user.isSignedIn;
  if (!isSignedIn) {
    navigate("/login");
  } else {
    callback();
  }
};
