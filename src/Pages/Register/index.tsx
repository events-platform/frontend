import { Link } from "react-router-dom";
import { Heading, Input, User, Lock, Mail, Button, Arrow } from "../../Components/Auth";
import { Description } from "../../Components/Auth/Description";
import styles from "./Register.module.sass";
import { useState } from "react";

export const Register = () => {
  const [nameState, setNameState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [confirmPasswordState, setConfirmPassowrdState] = useState("");
  return (
    <div className={styles.Register}>
      {nameState && emailState && passwordState && confirmPasswordState ? null : null}
      {/* чтобы линтер не ругался ))) */}
      <div className={styles.RegisterContent}>
        <Heading text={"Регистрация"} />
        <Input type={"text"} text={"Введите имя или никнейм"} setState={setNameState}>
          <User />
        </Input>
        <Input type={"email"} text={"Введите почту"} setState={setEmailState}>
          <Mail />
        </Input>
        <Input type={"password"} text={"Введите пароль"} setState={setPasswordState}>
          <Lock />
        </Input>
        <Input type={"password"} text={"Повторите пароль"} setState={setConfirmPassowrdState}>
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
