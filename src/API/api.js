import axios from "axios";
import { getJWT } from "./cookies";
export const baseUrl = "http://venchass.ru:7999/";
export default axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: getJWT()
  }
});
