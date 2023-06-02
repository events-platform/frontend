import React, { ReactNode } from "react";
import { connect } from "react-redux";
import { Footer, Header } from "../../Components/Main";
import { RootState, store } from "../../store/store";
import styles from "./Main.module.sass";

interface ButtonProps {
  children: ReactNode;
}

const HeaderConn = () => {
  const name = store.getState().user.username;
  const avatarUrl = store.getState().user.avatarUrl;
  const isSignedIn = store.getState().user.isSignedIn;
  return (
    <>
      <Header name={name} city={"Екатеринбург"} isSignedIn={isSignedIn} avatarUrl={avatarUrl} />
    </>
  );
};

const HeaderConnectedComponent = connect((state: RootState) => state.user)(HeaderConn);

export const Main: React.FC<ButtonProps> = ({ children }) => {
  return (
    <div className={styles.Main}>
      <HeaderConnectedComponent />
      {children}
      <Footer />
    </div>
  );
};
