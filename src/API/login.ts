import axios from "./api";
export const login = (login: string, password: string) => {
  return axios.post("/user/login", {
    username: login,
    password
  });
};
export const create = (username: string, login: string, password: string) => {
  username.at(0); // не компилируется без этого, при компиляции убирается неиспользуемая переменная но я передаю в функцию 3 аргумента => приложение падает с ошибкой
  return axios.post("/user/create", {
    username: login,
    password
  });
};
