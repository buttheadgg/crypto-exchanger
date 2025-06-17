import React, { FC, useContext, useEffect, useRef, useState } from "react";
import styles from "./Exchanger.module.scss";
import { LOGIN_ROUTE, PUBLIC_IMAGE } from "../../constants";
import FormExchanger from "../../components/FormExchanger/FormExchanger";
import { observer } from "mobx-react-lite";
import FormModalWindow from "../../components/FormModalWindow/FormModalWindow";
import formStore from "../../stores/formStore";
import recentExchangesStore from "../../stores/recentExchagesStore";
import { Helmet } from "react-helmet";
import RunningLine from "../../components/RunningLine/RunningLine";
import MetaMaskButton from "../../components/MetaMaskButton/MetaMaskButton";
import MyButton from "../../components/UI/MyButton/MyButton";
import { Context } from "../../..";
import { useNavigate } from "react-router";
import Header from "../../components/Header/Header";

const Exchanger: FC = observer(() => {
  const navigate = useNavigate();

  const formRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    userStore.logout();
    navigate(LOGIN_ROUTE, { replace: true });
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { userStore } = useContext(Context);

  return (
    <>
      <Helmet>
        <title>Exchanger</title>
      </Helmet>
      <Header />
      <RunningLine />
      {/* <MetaMaskButton /> */}
      <div className={styles.main}>
        <div className={styles.main__wrapper}>
          <div className={styles.from__wrapper}>
            <div ref={formRef}>
              <div className={styles.from__buttonGroup}></div>
              <FormExchanger />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
export default Exchanger;
