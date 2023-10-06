import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

import ManageLayout from "@/layouts/ManageLayout";
import List from "@/pages/manage/List";
import Trash from "@/pages/manage/Trash";
import Star from "@/pages/manage/Star";

import NotFound from "@/pages/NotFound";

import QuestionLayout from "@/layouts/QuestionLayout";
// import Edit from "@/pages/question/Edit";
// import Stat from "@/pages/question/Stat";

// 路由懒加载，拆分 bundle ，优化首页体积
const Edit = lazy(
  () => import(/* webpackChunkName: "editPage" */ "../pages/question/Edit"),
);
const Stat = lazy(
  () => import(/* webpackChunkName: "statPage" */ "../pages/question/Stat"),
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "manage",
        element: <ManageLayout />,
        children: [
          {
            path: "list",
            element: <List />,
          },
          {
            path: "star",
            element: <Star />,
          },
          {
            path: "trash",
            element: <Trash />,
          },
        ],
      },
    ],
  },
  {
    path: "question",
    element: <QuestionLayout />,
    children: [
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "stat/:id",
        element: <Stat />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

export const HOME_PATHNAME = "/";
export const LOGIN_PATHNAME = "/login";
export const REGISTER_PATHNAME = "/register";
export const MANAGE_INDEX_PATHNAME = "/manage/list";

export function isLoginOrRegister(pathname: string) {
  return [LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname);
}

export function isNoNeedUserInfo(pathname: string) {
  return [HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname);
}
