import axios from "./api";
import { getJWT } from "./cookies";
import Qs from "qs";

export interface postObject {
  name: string;
  location: string;
  beginDate: Date | string;
  endDate: Date | string;
  format: string;
  type: string;
  registrationLimit: number;
  email: string;
  externalLink: string;
  description: string;
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
  ownerAvatar: string;
}

export const createPost = (obj: postObject, file: File) => {
  const JWT = getJWT();
  const formData:any = new FormData();

  obj.beginDate = parseDate(obj.beginDate as Date);
  obj.endDate = parseDate(obj.endDate as Date);

  obj.format = obj.format.toUpperCase();
  obj.type = obj.type.toUpperCase();

  formData.append("file", file, file?.name);
  formData.append("data", new Blob([JSON.stringify(obj)], { type: "application/json" }));
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

export const getUserSubscribePosts = (username: string) => {
  return axios.get<Ipost[]>("user/post/subscriptions", {
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

export const reConvertFormat = (eventFormat: string): string => {
  const id = eventsFormatsEng.findIndex((el) => el === eventFormat);
  return getEventFormats()[id];
};
const convertTimeToFormat = (time: number): string => {
  return ("00" + time).substring(time.toString().length);
};

const mouths = [
  "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
  "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
];
export const convertDateToString = (beginDate: string, endDate: string) => {
  if (beginDate && endDate) {
    if (beginDate.substring(0, 10) === endDate.substring(0, 10)) {
      return (`${+beginDate.substring(8, 10)} ${mouths[+beginDate.substring(5, 7) - 1]} ${beginDate.substring(11, 16)} - ${endDate.substring(11, 16)}`);
    } else {
      return (`${+beginDate.substring(8, 10)} ${mouths[+beginDate.substring(5, 7) - 1]} ${beginDate.substring(11, 16)} - ${+endDate.substring(8, 10)} ${mouths[+endDate.substring(5, 7) - 1]} ${endDate.substring(11, 16)}`);
    }
  } else {
    return beginDate ? (`${beginDate.substring(8, 10)} ${mouths[+beginDate.substring(5, 7) - 1]} ${beginDate.substring(11, 16)}`) : (`${endDate.substring(8, 10)} ${mouths[+endDate.substring(5, 7) - 1]} ${endDate.substring(11, 16)}`);
  }
};

export const formatDate = (date: Date): string => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-") + ` ${convertTimeToFormat(date.getHours())}:${convertTimeToFormat(date.getMinutes())}`;
};

export const subscribeToEvent = (postId: number) => {
  return axios.post("/user/post/subscriptions", { postId });
};

interface IgetPostsParams {
  totalPages: number,
  totalElements: number,
  size: number,
  content: Ipost[],
  number: number,
  sort: {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
  },
  pageable: {
    offset: 0,
    sort: {
      empty: boolean,
      sorted: boolean,
      unsorted: boolean
    },
    pageNumber: number,
    pageSize: number,
    paged: boolean,
    unpaged: boolean
  },
  first: boolean,
  numberOfElements: number,
  last: boolean,
  empty: boolean
}
interface getPostsParamsOptions {
  beginDate?: Date, endDate?: Date, organizer?: string[], type?: string[], page?: number, size?: number, sort?: string[]
}
export const getPostsParams = (options: getPostsParamsOptions) => {
  // eslint-disable-next-line no-console
  console.log(options);
  return axios.get<IgetPostsParams>("/post/search", {
    params: {
      ...options
    },
    paramsSerializer: {
      encode: params => {
      // eslint-disable-next-line no-console
        console.log("kek", params, Qs.stringify(params, { arrayFormat: "comma" }));
        return Qs.stringify(params, { arrayFormat: "comma" });
      }
    }
  });
};
