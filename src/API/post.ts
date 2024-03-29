import axios from "./api";
import { getJWT } from "./cookies";

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
  formLink: string;
}

export interface editObject {
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
  formLink: string;
  postId: number;
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
  formLink: string;
  favorite: boolean;
}

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

export const createPost = (obj: postObject, file: File) => {
  // eslint-disable-next-line no-console
  console.log(obj);
  const JWT = getJWT();
  const formData:any = new FormData();

  obj.beginDate = parseDate(obj.beginDate as Date);
  obj.endDate = parseDate(obj.endDate as Date);

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

export const editPost = (obj: editObject, file: File) => {
  // eslint-disable-next-line no-console
  console.log(obj);
  const JWT = getJWT();
  const formData:any = new FormData();

  obj.beginDate = parseDate(obj.beginDate as Date);
  obj.endDate = parseDate(obj.endDate as Date);

  formData.append("file", file, file?.name);
  formData.append("data", new Blob([JSON.stringify(obj)], { type: "application/json" }));
  return axios.post<string>(
    "/post/edit",
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
  return axios.get<IgetPostsParams>("/user/post/created",
    {
      params: { username }
    }
  );
};

export const getUserFavoritePosts = (username: string) => {
  return axios.get<IgetPostsParams>("user/post/favorite", {
    params: { username }
  });
};

export const getUserSubscribePosts = (username: string) => {
  return axios.get<IgetPostsParams>("user/post/subscriptions", {
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

export const deletePostFromFavorite = (postId: number) => {
  const JWT = getJWT();
  return axios.delete("/user/post/favorite", {
    headers: {
      Authorization: JWT
    },
    data: {
      postId
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
  const JWT = getJWT();
  return axios.post("/user/post/subscriptions", { postId }, {
    headers: {
      Authorization: JWT
    }
  });
};

export interface IPostsParamsOptions {
  beginDate?: Date, endDate?: Date, organizer?: string[], type?: string[], format?: string[], showEnded?: boolean, searchQuery?: string, page?: number, size?: number, sort?: string[]
}
export const getPostsParams = (options: IPostsParamsOptions) => {
  return axios.get<IgetPostsParams>("/post/search", {
    params: {
      ...options,
      size: 50
    },
    paramsSerializer: {
      indexes: null
    }
  });
};

export const deletePost = (postId: number) => {
  const JWT = getJWT();
  return axios.delete("/post", {
    headers: {
      Authorization: JWT
    },
    data: {
      postId
    }
  });
};

export const processFavorites = (source: Ipost[], favorites: Ipost[]) => {
  // for (const favorite of favorites) {
  //   const post = source.find(el => el.id === favorite.id);
  //   if (post) { post.favorite = true; }
  // }
};
