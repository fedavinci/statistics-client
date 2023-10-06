import React from "react";
import styles from "./Common.module.scss";
import QuestionCard from "@/components/QuestionCard";
import { Typography, Empty, Spin } from "antd";
import { useTitle } from "ahooks";
import ListSearch from "@/components/ListSearch";
import useLoadQuestionListData from "@/hooks/useLoadQuestionListData";
import ListPage from "@/components/ListPage";

const { Title } = Typography;

const Star: React.FC = () => {
  useTitle("问卷星 - 星标问卷");

  const { data: { list: questionList = [], total = 0 } = {}, loading } =
    useLoadQuestionListData({ isStar: true });

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3} style={{ margin: 0 }}>
            星标问卷
          </Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading && questionList.length === 0 && (
          <Empty description="暂无数据" />
        )}

        {questionList.length > 0 &&
          questionList.map((q) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Star;
