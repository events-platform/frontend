import axios from "./api";
import { getJWT } from "./cookies";

export interface postObject {
  name: string;
  format: string;
  city: string;
  registrationLimit: number;
  beginDate: string;
  endDate: string;
  location: string;
  description: string;
  file: File
}

export interface Ipost {
  name: string;
  format: string;
  city: string;
  registrationLimit: number;
  beginDate: string;
  endDate: string;
  location: string;
  description: string;
  image: string
}

export const createPost = (obj: postObject) => {
  const JWT = getJWT();
  const formData:any = new FormData();

  const beginDate = new Date(obj.beginDate);
  const endDate = new Date(obj.endDate);
  formData.append("name", obj.name);
  formData.append("format", obj.format === "Онлайн" ? "ONLINE" : "OFFLINE");
  formData.append("city", obj.city);
  formData.append("registrationLimit", obj.registrationLimit);
  formData.append("beginDate", parseDate(beginDate));
  formData.append("endDate", parseDate(endDate));
  formData.append("location", obj.location);
  formData.append("description", obj.description);
  formData.append("file", obj.file, obj.file?.name);

  return axios.post<string>(
    "/post",
    formData,
    {
      headers: {
        Authorization: JWT
      }
    }
  );
};

const parseDate = (date: Date) => {
  return date.toISOString();
};

export const getSelfPosts = () => {
  const JWT = getJWT();
  return axios.get<Ipost[]>("/post/created",
    {
      headers: {
        Authorization: JWT
      }
    }
  );
};

export const getEventFormats = (): string[] => {
  return [
    "Акселератор",
    "Воркшоп",
    "Встреча",
    "Выставка",
    "Демо-день",
    "День открытых дверей",
    "Конференция",
    "Круглый стол",
    "Лекция",
    "Мастер-класс",
    "Митап",
    "Опрос",
    "Панельная дискуссия",
    "Питч",
    "Семинар",
    "Спортивное мероприятие",
    "Форум",
    "Хакатон",
    "Концерт"
  ];
};

export const formatDate = (date: Date): string => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
