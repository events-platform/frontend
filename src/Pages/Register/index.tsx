import { Link, useNavigate } from "react-router-dom";
import { Heading, Input, User, Lock, Mail, Button, Arrow } from "../../Components/Auth";
import { Description } from "../../Components/Auth/Description";
import styles from "./Register.module.sass";
import { useState } from "react";
import { create } from "../../API/login";
import { useAppDispatch } from "../../store/store";
import { setToken, setUserName, setSignIn } from "../../store/reducers/userReducer";
import { useCookies } from "react-cookie";

export const Register = () => {
  const [nameState, setNameState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [confirmPasswordState, setConfirmPassowrdState] = useState("");
  const [nameColor, setNameColor] = useState("#D9D9D9");
  const [emailColor, setEmailColor] = useState("#D9D9D9");
  const [passwordColor, setPasswordColor] = useState("#D9D9D9");
  const [confirmPasswordColor, setConfirmPassowrdColor] = useState("#D9D9D9");
  const [errorState, setErrorState] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["access_token", "refresh_token"]);

  const onCreateAccountClicked = (): boolean => {
    if (nameState) {
      setNameColor("#D9D9D9");
    } else {
      setNameColor("rgba(255, 77, 77, 0.9)");
    }
    if (emailState) {
      setEmailColor("#D9D9D9");
    } else {
      setEmailColor("rgba(255, 77, 77, 0.9)");
    }
    if (passwordState) {
      setPasswordColor("#D9D9D9");
    } else {
      setPasswordColor("rgba(255, 77, 77, 0.9)");
    }
    if (passwordState !== confirmPasswordState) {
      setConfirmPassowrdColor("#D9D9D9");
    } else {
      setConfirmPassowrdColor("rgba(255, 77, 77, 0.9)");
    }

    if (nameState === "" || emailState === "" || passwordState === "") {
      setErrorState("Не заполненны все обязательные поля");
      return false;
    }
    if (passwordState !== confirmPasswordState) {
      setErrorState("Пароли не совпадают");
      return false;
    }
    create(nameState, emailState, passwordState)
      .then((res) => {
        if (res.status === 201) {
          setCookie("access_token", res.data.accessToken);
          setCookie("refresh_token", res.data.refreshToken);
          dispatch(setToken(res.data.accessToken));
          dispatch(setUserName(nameState));
          dispatch(setSignIn(true));
          navigate("/");
        }
      })
      .catch((res) => {
        if ("response" in res) {
          setErrorState(res.response.data);
        }
      });
    return true;
  };

  return (
    <div className={styles.Register}>
      <div className={styles.RegisterContent}>
        <Heading text={"Регистрация"} />
        <Input type={"text"} text={"Введите имя или никнейм"} setState={setNameState} color={nameColor}>
          <User />
        </Input>
        <Input type={"email"} text={"Введите почту"} setState={setEmailState} color={emailColor}>
          <Mail />
        </Input>
        <Input type={"password"} text={"Введите пароль"} setState={setPasswordState} color={passwordColor}>
          <Lock />
        </Input>
        <Input type={"password"} text={"Повторите пароль"} setState={setConfirmPassowrdState} color={confirmPasswordColor}>
          <Lock />
        </Input>
        <Description text={errorState} color={"rgba(255, 77, 77, 0.9)"} />
        <Description text={"Пароль должен содержать не менее 8 знаков, включая буквы и цифры."} color={"rgba(0, 0, 0, 0.5)"} />
        <Button text={"Зарегистрироваться"} onClick={onCreateAccountClicked}/>
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
