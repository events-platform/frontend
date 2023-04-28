import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heading, Input, Lock, Mail, Button, Arrow, Description } from "../../Components/Auth";
import styles from "./Login.module.sass";
import { login } from "../../API/login";
import { useAppDispatch } from "../../store/store";
import { setSignIn, setToken, setUserName } from "../../store/reducers/userReducer";

export const Login = () => {
  const [emailState, setMailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [errorState, setErrorState] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLoginClicked = () => {
    login(emailState, passwordState)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setToken(res.data));
          dispatch(setUserName(emailState));
          dispatch(setSignIn(true));
          navigate("/");
        }
      })
      .catch((err) => {
        if ("response" in err) {
          setErrorState("Неправильный логин или пароль");
        } else {
          setErrorState("Ошибка соединения");
        }
      });
  };

  return (
    <div className={styles.Login}>
      <div className={styles.LoginContent}>
        <Heading text={"Вход"} />
        <Input type={"email"} text={"Логин"} setState={setMailState}>
          <Mail />
        </Input>
        <Input type={"password"} text={"Пароль"} setState={setPasswordState}>
          <Lock />
        </Input>
        <div className={styles.error}>
          <Description text={errorState} color={"rgba(255, 77, 77, 0.9)"} />
        </div>
        <Button text={"Вход"} onClick={onLoginClicked}/>
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
