import React, { ReactNode } from "react";
import { Footer, Header } from "../../Components/Main";
import { store } from "../../store/store";
import styles from "./Main.module.sass";

interface ButtonProps {
  children: ReactNode;
}

export const Main: React.FC<ButtonProps> = ({ children }) => {
  const name = store.getState().user.username;
  return (
    <div className={styles.Main}>
      <Header name={name}/>
      {children}
      <Footer />
    </div>
  );
};
