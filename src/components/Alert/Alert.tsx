import React, { useEffect } from "react";
import styles from "./Alert.module.scss";

interface AlertModalProps {
  message: string;
  isOpen: boolean;
  closeAlert: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  message,
  isOpen,
  closeAlert,
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        closeAlert();
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen, closeAlert]);

  return (
    <div className={styles.alertModal}>
      <div className={styles.box}>
        <p className={styles.textAlert}>Добавлена</p>
      </div>
    </div>
  );
};
