import React, { useContext, useState } from "react";
import styles from "./Auth.module.scss";
import { EXCHANGER_ROUTE, PUBLIC_IMAGE } from "../../constants";
import { Helmet } from "react-helmet";
import MyInput from "../../components/UI/MyInput/MyInput";
import MyButton from "../../components/UI/MyButton/MyButton";
import { useNavigate } from "react-router";
import { Context } from "../../..";

const Auth = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { userStore } = useContext(Context);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

    const handleLogin = async () => {
    const success = await userStore.fetchAuth(login, password);
    if (success) {
      navigate(EXCHANGER_ROUTE);
    } else {
      alert("Invalid login or password");
    }
  };

  return (
    <>
      <Helmet>
        <title>Auth</title>
      </Helmet>
      <div className={styles.page__container}>
        <div className={styles.from__wrapper}>
          <div className={styles.form__header}> Log in </div>
          <div className={styles.form__footer}>
            <div className={styles.form__text}>
              {" "}
              Please provide your login and password to log in.{" "}
            </div>
            <div className={styles.form__inputWrapper}>
              <div className={styles.form__loginWrapper}>
                <div className={styles.form__loginHead}>Login</div>
                <MyInput placeHolder="Enter login" value={login} onChange={(e) => setLogin(e.target.value)} ></MyInput>
              </div>
              <div className={styles.form__passwordWrapper}>
                <div className={styles.form__passwordHead}>Password</div>
                <div
                  className={styles.form__eyeImg}
                  onClick={togglePasswordVisibility}
                >
                  <img src={PUBLIC_IMAGE + "EyeLog.svg"}></img>
                </div>
                <MyInput
                  placeHolder="Enter password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></MyInput>
              </div>
            </div>
            <div>
              <MyButton className={styles.form__button} onClick={handleLogin}>Log in</MyButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
