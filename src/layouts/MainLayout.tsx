import React from "react";
import styles from "./MainLayout.module.scss";
import { Outlet } from "react-router-dom";
import { Layout, Spin } from "antd";
import Logo from "@/components/Logo";
import UserInfo from "@/components/UserInfo";
import useLoadUserData from "@/hooks/useLoadUserData";
import useNavPage from "@/hooks/useNavPage";
import { useLocation } from "react-router-dom";
import { isLoginOrRegister } from "@/router/index";

const { Header, Footer, Content } = Layout;

const Login: React.FC = () => {
  const { pathname } = useLocation();

  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);

  return (
    <Layout>
      <Header className={styles.header}>
        <Logo />
        {!isLoginOrRegister(pathname) && <UserInfo />}
      </Header>
      <Content className={styles.main}>
        {waitingUserData ? (
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </Content>
      <Footer className={styles.footer}>
        问卷星 2023 - present. Created by 前端达芬奇
      </Footer>
    </Layout>
  );
};

export default Login;
