import React, { ReactNode, useEffect } from "react";
import styles from "./Auth.module.sass";

interface AuthProps {
  children: ReactNode;
}

export const Auth: React.FC<AuthProps> = ({ children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={styles.Auth}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};
