import axios from "./api";
import { getJWT } from "./cookies";

export const login = (email: string, password: string) => {
  return axios.post("/auth/login", {
    email,
    password
  });
};
export const create = (username: string, email: string, password: string) => {
  return axios.post("/auth/signup", {
    username,
    email,
    password
  });
};

export const getUserSelf = () => {
  const JWT = getJWT();
  return axios.get("/user/self", {
    headers: {
      Authorization: JWT
    }
  });
};
