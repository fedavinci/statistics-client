import React, { ChangeEvent, useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import styles from "./ListSearch.module.scss";
import { Input } from "antd";

const { Search } = Input;

const ListSearch: React.FC = () => {
  const [value, setValue] = useState("");
  const nav = useNavigate();
  const { pathname } = useLocation();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const newVal = searchParams.get("keyword") || "";
    setValue(newVal);
  }, [searchParams]);

  const handleSearch = (value: string) => {
    nav({
      pathname,
      search: `keyword=${value}`,
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Search
        value={value}
        size="large"
        allowClear
        placeholder="输入关键字"
        onChange={handleChange}
        onSearch={handleSearch}
        style={{ width: "260px" }}
      />
    </div>
  );
};

export default ListSearch;
