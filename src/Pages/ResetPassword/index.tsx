import { Link } from "react-router-dom";
import { Heading, Input, Mail, Arrow } from "../../Components/Auth";
import { Description } from "../../Components/Auth/Description";
import styles from "./ResetPassword.module.sass";
import { useState } from "react";
import { SaveButton } from "../../Components/SaveButton";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const ResetPassword = () => {
  const viewportWidth = useSelector((state: RootState) => state.viewport.viewportWidth);

  const [emailState, setEmailState] = useState("");
  const [emailColor, setEmailColor] = useState("#D9D9D9");
  const [errorState] = useState("");

  const onCreateAccountClicked = (): boolean => {
    if (emailState) {
      setEmailColor("#D9D9D9");
    } else {
      setEmailColor("rgba(255, 77, 77, 0.9)");
      return false;
    }
    return true;
  };

  return (
    <div className={styles.ResetPassword}>
      <div className={styles.ResetPasswordContent}>
        <Heading text={"Восстановление пароля"} />
        <div className={styles.field}>
          <Input
            type={"email"}
            text={"Введите почту"}
            setState={setEmailState}
            color={emailColor}
            width={viewportWidth > 400 ? 352 : 280}
            onEnter={onCreateAccountClicked}
          >
            <Mail />
          </Input>
        </div>
        <div className={styles.text}>
          <Description text={"Введите свою почту, на которую мы отправим вам инструкцию для восстановления пароля."} color={"rgba(0, 0, 0, 0.5)"} />
        </div>
        <div className={styles.error}>
          <Description text={errorState} color={"rgba(255, 77, 77, 0.9)"} />
        </div>
        <SaveButton text="Отправить" onClick={onCreateAccountClicked} width={viewportWidth > 400 ? 352 : 280} height={40} />
      </div>
      <Link to="/login" className={styles.login}>
          Войти в аккаунт
        <Arrow />
      </Link>
    </div>
  );
};
