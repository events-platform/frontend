import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heading, Input, Lock, Mail, Arrow, Description } from "../../Components/Auth";
import { getUserSelf, login } from "../../API/login";
import { RootState, useAppDispatch } from "../../store/store";
import { setAvatarUrl, setSignIn, setToken, setUserName } from "../../store/reducers/userReducer";
import { useCookies } from "react-cookie";
import { SaveButton } from "../../Components/SaveButton";
import styles from "./Login.module.sass";
import { useSelector } from "react-redux";

export const Login = () => {
  const viewportWidth = useSelector((state: RootState) => state.viewport.viewportWidth);

  const [emailState, setMailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [errorState, setErrorState] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["access_token", "refresh_token"]);
  const onLoginClicked = () => {
    login(emailState, passwordState)
      .then((resp) => {
        dispatch(setToken(resp.data.accessToken));
        getUserSelf()
          .then((res) => {
            setCookie("access_token", resp.data.accessToken);
            setCookie("refresh_token", resp.data.refreshToken);
            dispatch(setSignIn(true));
            dispatch(setUserName(res.data.username));
            dispatch(setAvatarUrl(res.data.avatar));
            navigate("/", { replace: true });
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
          <Input type={"email"} text={"Почта"} setState={setMailState} onEnter={onLoginClicked} width={viewportWidth > 400 ? 352 : viewportWidth >= 320 ? 280 : 220}>
            <Mail />
          </Input>
        </div>
        <div className={styles.field}>
          <Input type={"password"} text={"Пароль"} setState={setPasswordState} onEnter={onLoginClicked} width={viewportWidth > 400 ? 352 : viewportWidth >= 320 ? 280 : 220}>
            <Lock />
          </Input>
        </div>
        <div className={styles.error}>
          <Description text={errorState} color={"rgba(255, 77, 77, 0.9)"} />
        </div>
        <div className={styles.button}>
          <SaveButton width={viewportWidth > 400 ? 352 : viewportWidth >= 320 ? 280 : 220} height={40} text="Вход" onClick={onLoginClicked}/>
        </div>
        <Link className={styles.forgot} to="/login/reset">
          Забыли пароль?
        </Link>
      </div>
      <Link to="/reg" className={styles.reg}>
          Зарегистрировать аккаунт
        <Arrow />
      </Link>
    </div>
  );
};
