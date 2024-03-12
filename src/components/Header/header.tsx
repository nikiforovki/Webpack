import React from "react";
import styles from "./header.module.scss";
import SearchInput from "../SearchInput/SearchInput";

export const Header: React.FC = () => {
  return (
    <div className={styles.headerContainer}>
      <h1>TODO LIST</h1>
      <SearchInput />
    </div>
  );
};
