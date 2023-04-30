import axios from "axios";
export const baseUrl = "http://venchass.ru:7999/";
export default axios.create({
  baseURL: baseUrl
});
