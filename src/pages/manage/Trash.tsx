import React, { useState } from "react";
import styles from "./Common.module.scss";
import { useTitle } from "ahooks";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Table,
  Typography,
  Empty,
  Tag,
  Button,
  Space,
  Modal,
  message,
  Spin,
} from "antd";
import ListSearch from "@/components/ListSearch";
import useLoadQuestionListData from "@/hooks/useLoadQuestionListData";
import ListPage from "@/components/ListPage";
import { updateQuestion, deleteQuestions } from "@/api/question";
import { useRequest } from "ahooks";

const { Title } = Typography;
const { confirm } = Modal;

const Trash: React.FC = () => {
  useTitle("问卷星 - 回收站");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const {
    data: { list: questionList = [], total = 0 } = {},
    loading,
    refresh,
  } = useLoadQuestionListData({ isDeleted: 1 });

  // const sleep = (ms: number): Promise<void> =>
  //   new Promise((resolve) => setTimeout(resolve, ms));

  // const onRecover = () => {
  //   confirm({
  //     title: "确定恢复问卷？",
  //     icon: <ExclamationCircleOutlined />,
  //     onOk: async () => {
  //       await sleep(1000);
  //       message.success(`${selectedIds} 恢复成功`);
  //     },
  //   });
  // };

  // 恢复
  const { run: onRecover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestion(id, { isDeleted: 0 });
      }
    },
    {
      manual: true,
      debounceWait: 500, // 防抖
      onSuccess() {
        message.success("恢复成功");
        refresh(); // 手动刷新列表
        setSelectedIds([]);
      },
    },
  );

  // 删除
  const { run: deleteQuestion } = useRequest(
    async () => await deleteQuestions(selectedIds),
    {
      manual: true,
      onSuccess() {
        message.success("删除成功");
        refresh();
        setSelectedIds([]);
      },
    },
  );

  const onDelete = () => {
    confirm({
      title: "确定彻底删除问卷？",
      icon: <ExclamationCircleOutlined />,
      content: "删除后不可找回",
      onOk: deleteQuestion,
    });
  };

  const tableColumns = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="processing">已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        );
      },
    },
    {
      title: "答卷数量",
      dataIndex: "answerCount",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
    },
  ];
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3} style={{ margin: 0 }}>
            回收站
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
        {questionList.length > 0 && (
          <>
            <Space style={{ marginBottom: "20px" }}>
              <Button
                onClick={onRecover}
                type="primary"
                disabled={selectedIds.length === 0}
              >
                恢复
              </Button>
              <Button
                onClick={onDelete}
                danger
                disabled={selectedIds.length === 0}
              >
                彻底删除
              </Button>
            </Space>
            <Table
              dataSource={questionList}
              columns={tableColumns}
              pagination={false}
              rowKey={(q) => q._id}
              rowSelection={{
                type: "checkbox",
                onChange: (selectedRowKeys) => {
                  setSelectedIds(selectedRowKeys.map(String));
                },
              }}
            />
          </>
        )}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Trash;
