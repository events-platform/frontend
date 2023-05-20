import axios from "./api";
import { getJWT } from "./cookies";

export interface postObject {
  name: string;
  location: string;
  beginDate: string;
  endDate: string;
  format: string;
  type: string;
  registrationLimit: number;
  email: string;
  externalLink: string;
  description: string;
  file: File
}

export interface Ipost {
  id: number;
  name: string;
  format: string;
  type: string;
  registrationLimit: number;
  beginDate: string;
  endDate: string;
  location: string;
  description: string;
  email: string;
  externalLink: string;
  image: string;
  ownerName: string;
}

export const createPost = (obj: postObject) => {
  const JWT = getJWT();
  const formData:any = new FormData();

  const beginDate = new Date(obj.beginDate);
  const endDate = new Date(obj.endDate);
  formData.append("name", obj.name);
  formData.append("location", obj.location);
  formData.append("beginDate", parseDate(beginDate));
  formData.append("endDate", parseDate(endDate));
  formData.append("format", obj.format === "Онлайн" ? "ONLINE" : "OFFLINE");
  formData.append("type", convertFormat(obj.type));
  formData.append("registrationLimit", obj.registrationLimit);
  formData.append("email", obj.email);
  formData.append("externalLink", obj.externalLink);
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

export const getUserPosts = (username: string) => {
  return axios.get<Ipost[]>("/user/post/created",
    {
      params: { username }
    }
  );
};

export const getUserFavoritePosts = (username: string) => {
  return axios.get<Ipost[]>("user/post/favorite", {
    params: { username }
  });
};

export const getPostById = (id: number) => {
  return axios.get<Ipost>(`/post/${id}`);
};

export const getAllPosts = () => {
  return axios.get<Ipost[]>("/post/all");
};

export const addPostToFavorite = (postId: number) => {
  const JWT = getJWT();
  return axios.post("user/post/favorite", {
    postId
  },
  {
    headers: {
      Authorization: JWT
    }
  });
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

const eventsFormatsEng = [
  "ACCELERATOR",
  "WORKSHOP",
  "MEETING",
  "EXHIBITION",
  "DEMO_DAY",
  "OPEN_DAY",
  "CONFERENCE",
  "ROUND_TABLE",
  "LECTURE",
  "MASTER_CLASS",
  "MEETUP",
  "SURVEY",
  "PANEL_DISCUSSION",
  "PITCH",
  "SEMINAR",
  "SPORTS_EVENT",
  "FORUM",
  "HACKATHON",
  "CONCERT"
];

export const convertFormat = (eventFormat: string): string => {
  const id = getEventFormats().findIndex((el) => el === eventFormat);
  return eventsFormatsEng[id];
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
