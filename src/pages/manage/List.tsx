import React, { useState, useRef, useEffect, useMemo } from "react";
import styles from "./Common.module.scss";
import QuestionCard from "@/components/QuestionCard";
import ListSearch from "@/components/ListSearch";
import { useTitle, useRequest, useDebounceFn } from "ahooks";
import { Typography, Spin, Empty } from "antd";
import { getQuestionList, IQuestion } from "@/api/question";
import { useSearchParams } from "react-router-dom";

const { Title } = Typography;

const List: React.FC = () => {
  useTitle("问卷星 - 我的问卷");

  const [questionList, setQuestionList] = useState<IQuestion[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const haveMoreData = total > questionList.length;

  const keyword = searchParams.get("keyword") || "";
  useEffect(() => {
    setPage(1);
    setQuestionList([]);
    setTotal(0);
    setLoading(false);
  }, [keyword]);

  const { run: load } = useRequest(
    async () =>
      await getQuestionList({
        page,
        pageSize: 20,
        keyword,
      }),
    {
      manual: true,
      onSuccess(result) {
        const { list = [], total = 0 } = result;
        setQuestionList(questionList.concat(list));
        setTotal(total);
        setPage(page + 1);
      },
    },
  );

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = loadMoreRef.current;
      if (elem == null) return;
      const domRect = elem.getBoundingClientRect();
      if (domRect == null) return;
      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        load();
        setLoading(true);
      }
    },
    { wait: 800 },
  );

  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);

  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore);
    }
    return () => {
      window.removeEventListener("scroll", tryLoadMore);
    };
  }, [searchParams, haveMoreData]);

  const loadMoreContent = useMemo(() => {
    if (loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (!haveMoreData) return <span>已经到底了</span>;
    return <span>加载更多</span>;
  }, [loading, haveMoreData]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3} style={{ margin: 0 }}>
            我的问卷
          </Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length > 0 &&
          questionList.map((q) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <div ref={loadMoreRef}>{loadMoreContent}</div>
      </div>
    </>
  );
};

export default List;
