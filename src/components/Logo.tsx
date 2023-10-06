import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";
import { RadarChartOutlined } from "@ant-design/icons";
import { Typography, Space } from "antd";
import useGetUserInfo from "../hooks/useGetUserInfo";
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from "../router/index";

const { Title } = Typography;

const Logo: React.FC = () => {
  const { username } = useGetUserInfo();

  const [pathname, setPathname] = useState(HOME_PATHNAME);
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME);
    }
  }, [username]);

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <RadarChartOutlined />
          </Title>
          <Title>问卷星</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
