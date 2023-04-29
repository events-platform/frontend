import axios from "./api";
export const login = (email: string, password: string) => {
  return axios.post("/auth/login", {
    username: email,
    password
  });
};
export const create = (username: string, email: string, password: string) => {
  username.at(0); // не компилируется без этого, при компиляции убирается неиспользуемая переменная но я передаю в функцию 3 аргумента => приложение падает с ошибкой
  return axios.post("/user/create", {
    email,
    username,
    password
  });
};
