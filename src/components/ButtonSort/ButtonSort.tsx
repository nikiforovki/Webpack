import React from "react";
import styles from "./ButtonSort.module.scss";

interface ButtonSortProps {
  onSortChange: (
    order: "asc" | "desc",
    filter?: "all" | "complete" | "incomplete"
  ) => void;
}

const ButtonSort: React.FC<ButtonSortProps> = ({ onSortChange }) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [order, filter] = event.target.value.split("-");
    if (typeof onSortChange === "function") {
      onSortChange(
        order as "asc" | "desc",
        filter as "all" | "complete" | "incomplete"
      );
    }
  };

  return (
    <button className={styles.button}>
      <select className={styles.select} onChange={handleSortChange}>
        <option value="asc-all">Все</option>
        <option value="asc-complete">Завершенные</option>
        <option value="desc-incomplete">Не завершенные</option>
      </select>
    </button>
  );
};

export default ButtonSort;
