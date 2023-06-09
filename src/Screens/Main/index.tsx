import { FC, ReactNode } from "react";
import { Footer, Header } from "../../Components/Main";
import styles from "./Main.module.sass";

interface ButtonProps {
  children: ReactNode;
}

export const Main: FC<ButtonProps> = ({ children }) => {
  return (
    <div className={styles.Main}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
