import React, { useState } from "react";
import styles from "./ToggleDeleteAllTask.module.scss";
import DeleteTaskImage from "../../../public/Img/DeleteTaskImage";
import EndStrel1 from "../../../public/Img/BackArrow";

interface ToggleDeleteProps {
  onDelete: () => void;
  className?: string;
}

const ToggleDelete: React.FC<ToggleDeleteProps> = ({ onDelete, className }) => {
  const [isToggled, setIsToggled] = useState(false);

  const toggle = () => setIsToggled(!isToggled);
  const confirmDelete = () => {
    if (isToggled) {
      onDelete();
      toggle();
    }
  };

  return (
    <div className={`${styles.toggleContainer} ${className}`}>
      <button className={styles.toggler} onClick={toggle}>
        {isToggled ? <EndStrel1 /> : <DeleteTaskImage />}
      </button>
      {isToggled && (
        <button className={styles.confirmDeleteButton} onClick={confirmDelete}>
          Удалить
        </button>
      )}
    </div>
  );
};

export default ToggleDelete;
