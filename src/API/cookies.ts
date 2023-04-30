import { store } from "../store/store";

export const getJWT = () => {
  const state = store.getState();
  const JWT = "Bearer " + state.user.token;
  return JWT;
};
