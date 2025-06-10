import React, { useEffect } from "react";
import styles from "./PoolsModalSuccessful.module.scss";
import { PUBLIC_IMAGE } from "../../../constants";
import MyButton from "../../UI/MyButton/MyButton";
import poolsStore from "../../../stores/poolsStore";
import { observer } from "mobx-react-lite";

const PoolsModalSuccessful = () => {

  const handleButtonBack = () => {
    poolsStore.setIsConfirm(2);
  }

  const handleButtonHoldings = () => {
    poolsStore.setIsConfirm(0);
  }

  const handleButtonClose = () => {
    poolsStore.setIsSubscribe(undefined);
  };
  
  useEffect(() => {
    const handlePopState = () => {
      handleButtonClose();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);


  return (
    <div className={styles.window__wrapper}>
      <img className={styles.modal__widowClose} src={PUBLIC_IMAGE+"closeForm.svg"} onClick={handleButtonClose}></img>
      <div className={styles.window__img}>
        <img src={PUBLIC_IMAGE + "windowSuccessImg.svg"} alt="" />
      </div>
      <div className={styles.window__body}>
        <div className={styles.body__subscription}>Subscription Successful</div>
        <div className={styles.body__value}>{poolsStore.formDataPools.predictAmount} {poolsStore.formDataPools.coin}</div>
      </div>
      <div className={styles.widnow__bodyDates}>
        <div className={styles.dates__text}>
          <div>
            <img src={PUBLIC_IMAGE + "sliderWindow.svg"} alt="" />
          </div>
          <div className={styles.dates__wrapper}>
            <div className={styles.dates__sub}>Subscription Date</div>
            <div className={styles.dates__red}>Redemption Date</div>
          </div>
        </div>
        <div className={styles.dates_dates}>
          <div>{poolsStore.formDataPools.dateTime}</div>
          <div>{poolsStore.formDataPools.predictDateTime}</div>
        </div>
      </div>
      <div className={styles.window__buttonWrapper}>
            <MyButton onClick={handleButtonBack} className={styles.window__buttonBack}>Back</MyButton>
            <MyButton onClick={handleButtonHoldings} className={styles.window__buttonView}>View holdings</MyButton>
        </div>
    </div>
  );
};

export default observer(PoolsModalSuccessful);
