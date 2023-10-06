import axios from "./base";

export interface IList<T> {
  list: T[];
  total: number;
}

export interface IQuestionStat {
  _id: string;
}
export interface IComponentStat {
  name: string;
  count: number;
}

export interface IQuestionComponentStat {
  stat: IComponentStat[];
}
// 获取问卷的统计列表
export function getQuestionStatListService(
  questionId: string,
  opt: { page: number; pageSize: number },
) {
  const url = `/api/stat/${questionId}`;
  return axios.get<IList<IQuestionStat>, IList<IQuestionStat>>(url, {
    params: opt,
  });
}

// 获取组件统计数据汇总
export async function getComponentStatService(
  questionId: string,
  componentId: string,
) {
  const url = `/api/stat/${questionId}/${componentId}`;
  return axios.get<IQuestionComponentStat, IQuestionComponentStat>(url);
}
