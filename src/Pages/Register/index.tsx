import { Link, useNavigate } from "react-router-dom";
import { Heading, Input, User, Lock, Mail, Arrow } from "../../Components/Auth";
import { Description } from "../../Components/Auth/Description";
import { useState } from "react";
import { create } from "../../API/login";
import { RootState, useAppDispatch } from "../../store/store";
import { setToken, setUserName, setSignIn } from "../../store/reducers/userReducer";
import { useCookies } from "react-cookie";
import { SaveButton } from "../../Components/SaveButton";
import { useSelector } from "react-redux";
import styles from "./Register.module.sass";

export const Register = () => {
  const viewportWidth = useSelector((state: RootState) => state.viewport.viewportWidth);

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
    if (nameState || nameState.length <= 36) {
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
    if (passwordState === confirmPasswordState) {
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
    if (nameState.length > 36) {
      setErrorState("Имя не может быть длинее 36 символов");
    }

    create(nameState, emailState, passwordState)
      .then((res) => {
        setCookie("access_token", res.data.accessToken);
        setCookie("refresh_token", res.data.refreshToken);
        dispatch(setToken(res.data.accessToken));
        dispatch(setUserName(nameState));
        dispatch(setSignIn(true));
        navigate("/");
      })
      .catch((res) => {
        setErrorState(res.response);
      });
    return true;
  };

  return (
    <div className={styles.Register}>
      <div className={styles.RegisterContent}>
        <Heading text={"Регистрация"} />
        <div className={styles.field}>
          <Input
            type={"text"}
            text={"Введите имя или никнейм"}
            setState={setNameState}
            color={nameColor}
            onEnter={onCreateAccountClicked}
            width={viewportWidth > 400 ? 352 : viewportWidth >= 320 ? 280 : 220}
            limit={36}
          >
            <User />
          </Input>
        </div>
        <div className={styles.field}>
          <Input
            type={"email"}
            text={"Введите почту"}
            setState={setEmailState}
            color={emailColor}
            onEnter={onCreateAccountClicked}
            width={viewportWidth > 400 ? 352 : viewportWidth >= 320 ? 280 : 220}
          >
            <Mail />
          </Input>
        </div>
        <div className={styles.field}>
          <Input
            type={"password"}
            text={"Введите пароль"}
            setState={setPasswordState}
            color={passwordColor}
            onEnter={onCreateAccountClicked}
            width={viewportWidth > 400 ? 352 : viewportWidth >= 320 ? 280 : 220}
          >
            <Lock />
          </Input>
        </div>
        <div className={styles.field}>
          <Input
            type={"password"}
            text={"Повторите пароль"}
            setState={setConfirmPassowrdState}
            color={confirmPasswordColor}
            onEnter={onCreateAccountClicked}
            width={viewportWidth > 400 ? 352 : viewportWidth >= 320 ? 280 : 220}
          >
            <Lock />
          </Input>
        </div>
        <div className={styles.text}>
          <Description text={"Пароль должен содержать не менее 8 знаков, включая буквы и цифры."} color={"rgba(0, 0, 0, 0.5)"} />
        </div>
        <div className={styles.error}>
          <Description text={errorState} color={"rgba(255, 77, 77, 0.9)"} />
        </div>
        <SaveButton
          text="Зарегистрироваться"
          onClick={onCreateAccountClicked}
          width={viewportWidth > 400 ? 352 : viewportWidth >= 320 ? 280 : 220}
          height={40}
        />
      </div>
      <Link to="/login" className={styles.login}>
          Войти в аккаунт
        <Arrow />
      </Link>
    </div>
  );
};
