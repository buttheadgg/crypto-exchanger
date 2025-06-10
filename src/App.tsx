import React, { useEffect, useRef } from "react";
import styles from "./App.module.scss";
import "./application/styles/global.scss";
import Header from "./application/components/Header/Header";
import Footer from "./application/components/Footer/Footer";
import RunningLine from "./application/components/RunningLine/RunningLine";
import { observer } from "mobx-react-lite";
import FormModalWindow from "./application/components/FormModalWindow/FormModalWindow";
import ModalWindow from "./application/components/ModalWindow/ModalWindow";
import formStore from "./application/stores/formStore";
import FormModalWindowDone from "./application/components/FormModalWindow/FormModalWindowDone/FormModalWindowDone";
import FormModalWindowСanceled from "./application/components/FormModalWindow/FormModalWindowСanceled/FormModalWindowСanceled";
import ModalWindowPools from "./application/components/ModalWindowPools/ModalWindowPools";
import poolsStore from "./application/stores/poolsStore";
import PoolsModalSubscribe from "./application/components/PoolsModalWindows/PoolsModalSubscribe/PoolsModalSubscribe";
import PoolsModalSuccessful from "./application/components/PoolsModalWindows/PoolsModalSuccessful/PoolsModalSuccessful";
import PoolsModalHoldings from "./application/components/PoolsModalWindows/PoolsModalHoldings/PoolsModalHoldings";
import PoolsModalSuccessfulFinal from "./application/components/PoolsModalWindows/PoolsModalSuccessfulFinal/PoolsModalSuccessfulFinal";
import PoolsModalCancel from "./application/components/PoolsModalWindows/PoolsModalCancel/PoolsModalCancel";
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

  switch (poolsStore.isConfirm) {
    case 1:
      modalContent =  <PoolsModalSuccessful /> ;
      break;
    case 2:
      modalContent =  <PoolsModalHoldings /> ;
      break;
    case 3:
      modalContent = <PoolsModalSuccessfulFinal /> ;
      break;
    case 4:
      modalContent =  <PoolsModalCancel />;
      break;
    case 0:
      modalContent =  <PoolsModalSubscribe />  ;
      break;
  }

  return (
    <BrowserRouter>
      <Header />
      <RunningLine />
      <div className={styles.page__wrapper}>
        <ModalWindow>{modalContent}</ModalWindow>
        <ModalWindowPools>{modalContent}</ModalWindowPools>
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default observer(App);
