import React from "react";
import styles from "./ManageLayout.module.scss";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Space, message } from "antd";
import { createQuestion } from "@/api/question";
import { useRequest } from "ahooks";

const ManageLayout: React.FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  // const [loading, setLoading] = useState(false);

  // const onClick = async () => {
  //   setLoading(true);
  //   const data = await createQuestion();
  //   const { _id } = data || {};
  //   if (_id) {
  //     nav(`/question/edit/${id}`);
  //     message.success("创建成功");
  //   }
  //   setLoading(false);
  // };

  const { loading, run: onClick } = useRequest(
    async () => await createQuestion(),
    {
      manual: true,
      onSuccess(result) {
        nav(`/question/edit/${result._id}`);
        message.success("创建成功");
      },
    },
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <Space direction="vertical">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={onClick}
              disabled={loading}
            >
              创建问卷
            </Button>
            <Button
              type={pathname.startsWith("/manage/list") ? "default" : "text"}
              icon={<BarsOutlined />}
              onClick={() => nav("/manage/list")}
            >
              我的问卷
            </Button>
            <Button
              type={pathname.startsWith("/manage/star") ? "default" : "text"}
              icon={<StarOutlined />}
              onClick={() => nav("/manage/star")}
            >
              星标问卷
            </Button>
            <Button
              type={pathname.startsWith("/manage/trash") ? "default" : "text"}
              icon={<DeleteOutlined />}
              onClick={() => nav("/manage/trash")}
              style={{ width: "110px", textAlign: "left" }}
            >
              回收站
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ManageLayout;
