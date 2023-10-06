import React, { useState } from "react";
import styles from "./QuestionCard.module.scss";
import { Popconfirm, Button, Divider, Space, Tag, Modal, message } from "antd";
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import { updateQuestion, duplicateQuestion } from "@/api/question";

export type PropsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  createdAt: string;
  answerCount: number;
  isStar: boolean;
};

const List: React.FC<PropsType> = (props: PropsType) => {
  const { _id, title, createdAt, isPublished, answerCount, isStar } = props;
  const nav = useNavigate();
  const { confirm } = Modal;

  const [isStarState, setIsStarState] = useState(isStar);
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestion(_id, { isStar: !isStarState });
    },
    {
      manual: true,
      onSuccess() {
        message.success("更新成功");
        setIsStarState(!isStarState); // 更新 state
      },
    },
  );

  // 复制
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => await duplicateQuestion(_id),
    {
      manual: true,
      onSuccess(result) {
        message.success("复制成功");
        nav(`/question/edit/${result._id}`); // 跳转到问卷编辑页
      },
    },
  );

  // 删除
  const [isDeletedState, setIsDeletedState] = useState(false);
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestion(_id, { isDeleted: 1 }),
    {
      manual: true,
      onSuccess() {
        message.success("删除成功");
        setIsDeletedState(true);
      },
    },
  );

  const onDelete = () => {
    confirm({
      title: "确定删除该问卷？",
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
    });
  };

  // 已经删除的问卷，不要再渲染卡片了
  if (isDeletedState) return null;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link
              to={
                isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`
              }
            >
              <Space>
                {isStarState && <StarOutlined style={{ color: "red" }} />}
                {title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            {isPublished ? (
              <Tag color="processing">已发布</Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>答卷：{answerCount}</span>
            <span>{createdAt}</span>
          </div>
        </div>
        <Divider style={{ margin: "12px 0" }} />
        <div className={styles["button-container"]}>
          <div className={styles.left}>
            <Space>
              <Button
                icon={<EditOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/edit/${_id}`)}
              >
                编辑问卷
              </Button>
              <Button
                icon={<LineChartOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/stat/${_id}`)}
                disabled={!isPublished}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button
                type="text"
                icon={<StarOutlined />}
                size="small"
                onClick={changeStar}
                disabled={changeStarLoading}
              >
                {isStarState ? "取消标星" : "标星"}
              </Button>

              <Popconfirm
                title="确定复制该问卷？"
                okText="确定"
                cancelText="取消"
                onConfirm={duplicate}
              >
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  size="small"
                  disabled={duplicateLoading}
                >
                  复制
                </Button>
              </Popconfirm>

              <Button
                onClick={onDelete}
                type="text"
                icon={<DeleteOutlined />}
                size="small"
                disabled={deleteLoading}
              >
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
