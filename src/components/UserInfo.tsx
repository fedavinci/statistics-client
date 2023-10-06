import React from "react";
import { Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
// import { getUserInfo } from "@/api/user";
// import { useRequest } from "ahooks";
import { getToken, removeToken } from "@/utils/user";
import { LOGIN_PATHNAME } from "@/router";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import { logoutReducer } from "@/store/userReducer";

const UserInfo: React.FC = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  // const { data } = useRequest(getUserInfo); // ajax
  // const { nickname } = data || {};
  const { nickname } = useGetUserInfo(); // 从 redux 中获取用户信息

  function logout() {
    dispatch(logoutReducer()); // 清空了 redux user 数据
    removeToken(); // 清除 token 的存储
    message.success("退出成功");
    nav(LOGIN_PATHNAME);
  }

  const UserInfo = (
    <>
      <span style={{ color: "black" }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  );

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>;

  return <div>{getToken() ? UserInfo : Login}</div>;
};

export default UserInfo;
