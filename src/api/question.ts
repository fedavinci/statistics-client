import axios from "./base";
import { ComponentInfoType } from "@/store/componentsReducer";

export interface IQuestion {
  _id: string;
  title: string;
  isPublished: boolean;
  createdAt: string;
  answerCount: number;
  isStar: boolean;
  isDeleted: number;
  componentList: ComponentInfoType[];
  desc: string;
  js: string;
  css: string;
}

export const createQuestion = () => {
  return axios.post<IQuestion, IQuestion>(`/api/question`);
};

export const getQuestionById = (id: string) => {
  return axios.get<IQuestion, IQuestion>(`/api/question/${id}`);
};

export interface IPage {
  page: number;
  pageSize: number;
  keyword: string;
  isStar: boolean;
  isDeleted: number;
}

export interface IList<T> {
  list: T[];
  total: number;
}

export const getQuestionList = (params: Partial<IPage>) => {
  return axios.get<IList<IQuestion>, IList<IQuestion>>(`/api/question`, {
    params,
  });
};

export const updateQuestion = (id: string, params: Partial<IQuestion>) => {
  return axios.patch(`/api/question/${id}`, { params });
};

export const duplicateQuestion = (id: string) => {
  return axios.post<IQuestion, IQuestion>(`/api/question/duplicate/${id}`);
};

export const deleteQuestions = (ids: string[]) => {
  return axios.delete("/api/question", { data: { ids } });
};
