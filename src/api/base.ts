import axios from "axios";
import { message } from "antd";
import { getToken } from "@/utils/user";

export type ResDataType = {
  [key: string]: unknown;
};

export type ResType<T> = {
  code: number;
  data: T;
  msg: string;
};

const instance = axios.create({
  timeout: 10 * 1000,
});

instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getToken()}`;
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => {
    const { data: _data } = response;
    const { data, code } = _data;
    if (!code || code !== 10024) {
      message.error("bussiness error");
      return Promise.reject("bussiness error");
    }
    // message.success(msg);
    return data;
  },
  (err: Error) => {
    message.error(err.message);
  },
);

// instance.interceptors.request.use((config) => {
//   const { value: token } = useLocalStorage("token", "");
//   if (config.headers && token.value) {
//     config.headers["x-token"] = token.value;
//   }
//   return config;
// });

// instance.interceptors.response.use(
//   (response) => {
//     const { data: _data } = response
//     const { data, code, msg } = _data
//     if (code !== 0) {
//       showDialog({
//         message: msg,
//       }).then(() => {
//         // 关闭弹窗的逻辑
//       })
//       return Promise.reject(msg)
//     }
//     return data
//   },
//   (err) => {
//     if (err.response && err.response.status === 401) {
//       showDialog({
//         message: '请登录',
//       }).then(() => {
//         // 关闭弹窗的逻辑
//       })
//     }
//   }
// )

export default instance;
