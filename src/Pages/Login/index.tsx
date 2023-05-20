import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heading, Input, Lock, Mail, Arrow, Description } from "../../Components/Auth";
import styles from "./Login.module.sass";
import { getUserSelf, login } from "../../API/login";
import { useAppDispatch } from "../../store/store";
import { setAvatarUrl, setSignIn, setToken, setUserName } from "../../store/reducers/userReducer";
import { useCookies } from "react-cookie";
import { SaveButton } from "../../Components/SaveButton";

export const Login = () => {
  const [emailState, setMailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [errorState, setErrorState] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["access_token", "refresh_token"]);
  const onLoginClicked = () => {
    login(emailState, passwordState)
      .then((resp) => {
        getUserSelf()
          .then((res) => {
            setCookie("access_token", resp.data.accessToken);
            setCookie("refresh_token", resp.data.refreshToken);
            dispatch(setToken(resp.data.accessToken));
            dispatch(setSignIn(true));
            dispatch(setUserName(res.data.username));
            dispatch(setAvatarUrl(res.data.avatar));
            navigate("/");
          });
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
        <div className={styles.field}>
          <Input type={"email"} text={"Логин"} setState={setMailState} onEnter={onLoginClicked}>
            <Mail />
          </Input>
        </div>
        <div className={styles.field}>
          <Input type={"password"} text={"Пароль"} setState={setPasswordState} onEnter={onLoginClicked}>
            <Lock />
          </Input>
        </div>
        <div className={styles.error}>
          <Description text={errorState} color={"rgba(255, 77, 77, 0.9)"} />
        </div>
        <div>
          <SaveButton width={352} height={40} text="Вход" onClick={onLoginClicked}/>
        </div>
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
