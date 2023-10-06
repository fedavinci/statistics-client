import axios from "./base";

interface IUser {
  username: string;
  nickname: string;
}
// 获取用户信息
export function getUserInfo() {
  return axios.get<IUser, IUser>("/api/user/info");
}

// 注册用户
export function register(
  username: string,
  password: string,
  nickname?: string,
) {
  const body = { username, password, nickname: nickname || username };
  return axios.post("/api/user/register", body);
}

interface ILogin {
  token: string;
}
// 登录
export function login(username: string, password: string) {
  const body = { username, password };
  return axios.post<ILogin, ILogin>("/api/user/login", body);
}
