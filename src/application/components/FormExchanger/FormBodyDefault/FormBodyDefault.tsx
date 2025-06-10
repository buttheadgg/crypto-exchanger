import React from "react";
import styles from "./FormBodyCashStep1.module.scss";
import MyInput from "../../UI/MyInput/MyInput";

const FormBodyCash = () => {
  return (
    <div className={styles.form__body}>
      <div className={styles.form__bodyWrapper}>
        <div className={styles.form__pay}>
          <div className={styles.form__payInput}>
            <p className={styles.form__payInputLable}>Telegram</p>
            <MyInput
              className={styles.form__payInputTelegram}
              placeHolder="Telegram"
            />
          </div>
        </div>
        <div className={styles.form__receive}>
          <div className={styles.form__receiveInputWrapper}>
            <div className={styles.form__receiveInput}>
              <p className={styles.form__receiveInputLable}>Country*</p>
              <MyInput className={styles.form__inputCountry} />
            </div>
            <div className={styles.form__receiveInput}>
              <p className={styles.form__receiveInputLable}>City*</p>
              <MyInput className={styles.form__inputCity} />
            </div>
          </div>
          <div className={styles.form__receiveCheckbox}>
            <div className={styles.remember__data}>
              <input
                type="checkbox"
                className={styles.form__checkbox}
                id="checkbox1"
              />
              <div className={styles.form__checkboxText}>
                Do not remember data
              </div>
            </div>
            <div className={styles.agree__rules}>
              <input type="checkbox" className={styles.form__checkbox} />
              <div className={styles.form__checkboxText}>
                By clicking the Exchange button,<br></br>I agree to the{" "}
                <a href="#" className={styles.rulesLink}>
                  rules
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.form__warning}>
        <div className={styles.form__warningText}>
          Sending cryptocurrency is only done to personal wallets!!!<br></br>
          (Trust wallet, exodus, SafePal and others)
        </div>
      </div>
    </div>
  );
};

export default FormBodyCash;
