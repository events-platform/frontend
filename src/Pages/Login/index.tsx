import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heading, Input, Lock, Mail, Button, Arrow, Description } from "../../Components/Auth";
import styles from "./Login.module.sass";
import { login } from "../../API/login";
import { useAppDispatch } from "../../store/store";
import { setSignIn, setToken } from "../../store/reducers/userReducer";

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
          dispatch(setToken(res.data.accessToken));
          dispatch(setSignIn(true));
          navigate("/");
        } else {
          // eslint-disable-next-line no-console
          console.log(res.data);
          setErrorState("error");
        }
      })
      .catch((res) => {
        if ("response" in res) {
          setErrorState("Error code " + res.code);
        }
      });
  };
  return (
    <div className={styles.Login}>
      {emailState && passwordState ? null : null}
      {/* чтобы линтер не ругался ))) */}
      <div className={styles.LoginContent}>
        <Heading text={"Вход"} />
        <Input type={"email"} text={"Логин"} setState={setMailState}>
          <Mail />
        </Input>
        <Input type={"password"} text={"Пароль"} setState={setPasswordState}>
          <Lock />
        </Input>
        <Description text={errorState} color={"rgba(255, 77, 77, 0.9)"}/>
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
