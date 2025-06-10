import React, { useEffect, useRef } from "react";
import styles from "./App.module.scss";
import "./application/styles/global.scss";
import RunningLine from "./application/components/RunningLine/RunningLine";
import { observer } from "mobx-react-lite";
import FormModalWindow from "./application/components/FormModalWindow/FormModalWindow";
import ModalWindow from "./application/components/ModalWindow/ModalWindow";
import formStore from "./application/stores/formStore";
import FormModalWindowDone from "./application/components/FormModalWindow/FormModalWindowDone/FormModalWindowDone";
import FormModalWindowСanceled from "./application/components/FormModalWindow/FormModalWindowСanceled/FormModalWindowСanceled";
import poolsStore from "./application/stores/poolsStore";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./application/routes/AppRoutes";

const App = () => {
  let modalContent;

  switch (formStore.isPaid) {
    case 1:
      modalContent = <FormModalWindowDone />;
      break;
    case 2:
      modalContent = <FormModalWindowСanceled />;
      break;
    case 0:
      modalContent = <FormModalWindow />;
      break;
  }

  return (
    <BrowserRouter>
      <RunningLine />
      <div className={styles.page__wrapper}>
        <ModalWindow>{modalContent}</ModalWindow>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
};

export default observer(App);
