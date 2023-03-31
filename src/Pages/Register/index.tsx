import { Link } from "react-router-dom";
import { Heading, Input, User, Lock, Mail, Button, Arrow } from "../../Components/Auth";
import { Description } from "../../Components/Auth/Description";
import styles from "./Register.module.sass";

export const Register = () => {
  return (
    <div className={styles.Register}>
      <div className={styles.RegisterContent}>
        <Heading text={"Регистрация"} />
        <Input type={"email"} text={"Введите имя или никнейм"}>
          <User />
        </Input>
        <Input type={"email"} text={"Введите почту"}>
          <Mail />
        </Input>
        <Input type={"password"} text={"Введите пароль"}>
          <Lock />
        </Input>
        <Input type={"password"} text={"Повторите пароль"}>
          <Lock />
        </Input>
        <Description text={"Пароль должен содержать не менее 8 знаков, включая буквы и цифры."} color={"rgba(0, 0, 0, 0.5)"} />
        <Button text={"Зарегистрироваться"}/>
      </div>
      <div className={styles.login}>
        <Link to="/login">
          Войти в аккаунт
        </Link>
        <Arrow />
      </div>
    </div>
  );
};
