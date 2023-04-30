import axios from "./api";

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
