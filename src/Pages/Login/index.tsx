import { Link } from "react-router-dom";
import { Heading, Input, Lock, Mail, Button, Arrow } from "../../Components/Auth";
import styles from "./Login.module.sass";

export const Login = () => {
  return (
    <div className={styles.Login}>
      <div className={styles.LoginContent}>
        <Heading text={"Вход"} />
        <Input type={"email"} text={"Почта"}>
          <Mail />
        </Input>
        <Input type={"password"} text={"Пароль"}>
          <Lock />
        </Input>
        <Button text={"Вход"}/>
        <Link className={styles.forgot} to="/reset">
          Забыли пароль?
        </Link>
      </div>
      <div className={styles.reg}>
        <Link to="/reg">
          Зарегистрировать аккаунт
        </Link>
        <Arrow />
      </div>
    </div>
  );
};
