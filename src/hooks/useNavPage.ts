import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGetUserInfo from "./useGetUserInfo";
import {
  isNoNeedUserInfo,
  LOGIN_PATHNAME,
  // isLoginOrRegister,
  // MANAGE_INDEX_PATHNAME,
} from "@/router/index";
import { getToken } from "@/utils/user";

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (waitingUserData) return;

    // 已经登录了
    if (getToken()) {
      // if (isLoginOrRegister(pathname)) {
      //   nav(MANAGE_INDEX_PATHNAME);
      // }
      return;
    }

    // 未登录
    if (isNoNeedUserInfo(pathname)) {
      return;
    } else {
      nav(LOGIN_PATHNAME);
    }
  }, [waitingUserData, username, pathname]);
}

export default useNavPage;
