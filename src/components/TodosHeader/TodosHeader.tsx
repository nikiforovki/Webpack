import React from "react";
import styles from "./TodosHeader.module.scss";
import SearchInput from "../SearchInput/SearchInput";

export const TodosHeader: React.FC = () => {
  return (
    <div className={styles.headerContainer}>
      <h1>TODO LIST</h1>
      <SearchInput />
    </div>
  );
};
