import { Link, useNavigate } from "react-router-dom";
import { Heading, Input, User, Lock, Mail, Button, Arrow } from "../../Components/Auth";
import { Description } from "../../Components/Auth/Description";
import styles from "./Register.module.sass";
import { useState } from "react";
import { create } from "../../API/login";
import { useAppDispatch } from "../../store/store";
import { setToken, setUserName, setSignIn } from "../../store/reducers/userReducer";

export const Register = () => {
  const [nameState, setNameState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [confirmPasswordState, setConfirmPassowrdState] = useState("");
  const [errorState, setErrorState] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onCreateAccountClicked = (): boolean => {
    if (passwordState !== confirmPasswordState) {
      setErrorState("Пароли не совпадают");
      return false;
    }
    if (nameState === "" || emailState === "" || passwordState === "") {
      setErrorState("Не заполненны все обязательные поля");
      return false;
    }
    create(nameState, emailState, passwordState)
      .then((res) => {
        if (res.status === 201) {
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
