import React, { useState, useEffect } from "react";
import { Pagination } from "antd";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

type PropsType = {
  total: number;
};

const ListPage: React.FC<PropsType> = (props: PropsType) => {
  const { total } = props;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "") || 1;
    setCurrent(page);
    const pageSize = parseInt(searchParams.get("pageSize") || "") || 20;
    setPageSize(pageSize);
  }, [searchParams]);

  const nav = useNavigate();
  const { pathname } = useLocation();
  function handlePageChange(page: number, pageSize: number) {
    searchParams.set("page", page.toString());
    searchParams.set("pageSize", pageSize.toString());
    nav({
      pathname,
      search: searchParams.toString(),
    });
  }

  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={handlePageChange}
    />
  );
};

export default ListPage;
