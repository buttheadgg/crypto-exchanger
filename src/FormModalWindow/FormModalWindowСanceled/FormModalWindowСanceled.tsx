import React from "react";
import styles from "./FormModalWindowСanceled.module.scss";
import formStore from "../../../stores/formStore";

const FormModalWindowСanceled = () => {

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.modal__window}>
      <div className={styles.modal__windowWrapper}>
        <div className={styles.modal__howToPlay}>Application ID 0134453</div>
        <div className={styles.modal__canceled}>
          You have canceled the request
        </div>
        <div className={styles.modal__application}>
          The application has been canceled by you.<br></br> If there is a transfer,
          contact the operator.<br></br> We are waiting for you again for an exchange at
          favorable rates
        </div>
        <div className={styles.modal__amount}>
          <div className={styles.amount__text}>
            <div className={styles.amount__textWeaving}>
              Sent
            </div>
            <div className={styles.amount__textReceived}>
              Received
            </div>
            <div className={styles.amount__textReceipt}>Transaction ID</div>
          </div>
          <div className={styles.amount__value}>
            <div className={styles.amount__valueWeaving}>
            {formStore.formData.paySelect} {formStore.formData.pay}
            </div>
            <div className={styles.amount__valueReceived}>
            {formStore.formData.receiveSelect} {formStore.formData.receive}
            </div>
            <div className={styles.amount__valueReceipt}>987654567893456</div>
          </div>
        </div>
      </div>
      <div className={styles.modal__timeStatus}>
        <div className={styles.timestatus__wrapper}>
          <div className={styles.timestatus__timeText}>Creation time</div>
          <div className={styles.timestatus__dateTime}>
          {formStore.finalData.datetime}
          </div>
        </div>
        <div className={styles.timestatus__line}></div>
        <div className={styles.timestatus__wrapper}>
          <div className={styles.timestatus__statusText}>
            Application status
          </div>
          <div className={styles.timestatus__dateTimeCanceled}>Canceled</div>
        </div>
      </div>
      {/* <div className={styles.modal__attention}>
        Attention! Click on the "Refresh page" button if you want to activate
        the automatic page update. The page will be updated every 30 seconds
      </div>
      <button className={styles.modal__buttonRefresh} onClick={handleReload}>Refresh page</button> */}
      <div className={styles.modal__bottomLine}></div>
    </div>
  );
};

export default FormModalWindowСanceled;
