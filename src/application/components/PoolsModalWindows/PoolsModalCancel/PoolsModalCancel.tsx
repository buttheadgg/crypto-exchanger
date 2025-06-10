import React, { useEffect } from "react";
import styles from "./PoolsModalCancel.module.scss";
import { PUBLIC_IMAGE } from "../../../constants";
import MyButton from "../../UI/MyButton/MyButton";
import poolsStore from "../../../stores/poolsStore";
import { observer } from "mobx-react-lite";

const PoolsModalCancel = () => {

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
    <div className={styles.cancel__wrapper}>
      <img className={styles.modal__widowClose} src={PUBLIC_IMAGE+"closeForm.svg"} onClick={handleButtonClose}></img>
      <div className={styles.cancel__headText}>Cancellation Successful</div>
      <div className={styles.cancel__warningWrapper}>
        <div className={styles.cancel__warningImg}>
          {" "}
          <img src={PUBLIC_IMAGE + "warningImg.svg"} alt="" />{" "}
        </div>
        <div className={styles.cancel__warningText}>
          Send only USDT to this deposit address. Ensure the network is Tron
          (TRC20).{" "}
        </div>
      </div>
      <div className={styles.cancel__informationText}>
        Your cancellation is successful. Your assets will be <br></br>
        returned to your Spot Wallet immediately
      </div>
      <div className={styles.cancel__dataWrapper}>
        <div className={styles.cancel__dataText}>Est. Arrival Date</div>
        <div className={styles.cancel__dataValue}>2024 - 10 - 01 19:21</div>
      </div>
      <MyButton className={styles.cancel__button}>confirm</MyButton>
    </div>
  );
};

export default observer(PoolsModalCancel);
