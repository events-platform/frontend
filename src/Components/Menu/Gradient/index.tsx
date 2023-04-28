import React from "react";
import styles from "./Gradient.module.sass";

interface GradientProps {
  children: React.ReactNode
}

export const Gradient: React.FC<GradientProps> = ({ children }) => {
  return (
    <div className={styles.Gradient}>
      {children}
    </div>
  );
};
