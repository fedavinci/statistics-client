import React from "react";
import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { MANAGE_INDEX_PATHNAME } from "@/router";

// import axios from "axios";

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const nav = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷星</Title>
        <Paragraph>
          已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份
        </Paragraph>
        <div>
          <Button
            onClick={() => nav(MANAGE_INDEX_PATHNAME)}
            type="primary"
            size="large"
          >
            开始使用
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
